import $, { exe, random, shuffle, stringify, ME } from 'actions'
import { data, src, DEFAULT, LINKS } from 'stores'

var num = 0, max = Math.pow(2, 13)
export function ver(action, state) {
	const { code, update } = state, base = data.child(code.concat('/versions'))
	switch(action) {
		case 'CREATE': {
			const { fns, limit, selected, variables } = state
			let matrix = getmtx(fns, variables), total = matrix.length
			matrix = shuffle(matrix).slice(0, limit)
		
			let gen = matrix.slice(0, selected), box = [], bup = matrix.slice(selected)
			for (let i = 0; i < selected; i++) {
				box[i] = []
				for (let j = 0; j < selected; j++) {
					let sum = 0
					for (let k = 0; k < gen[i].length; k++) {
						let a = gen[i][k].val, b = gen[j][k].val, c = gen[i][k].rank
						if (i != j && c != 0)		
							if (c > 0) sum += Math.abs((a - b)/c)
							else sum += 1
					}
					box[i][j] = Number(sum.toFixed(5))
				}
			}
			base.set({ box, bup, gen, total, limit:Math.min(limit, total), selected:Math.min(limit, selected) })

			function getmtx(fns, variables) {
				let aux = variables.slice(0), vars = [], matrix = []; num = 1

				while (aux.length) {
					let m = aux.shift()	
					switch (m.type) {
						case 'numero': {
							if (m.val.includes(',')) {
								let x = m.val.split(','), y = []
								if (m.val.includes('..')) {
									x.forEach(n => { 
										let z = n.split('..')
										for (let i = Number(z[0]); i <= Number(z[1]); i++) {
											y.push(Number(i))
										}
									})
								}
								else
									x.forEach(n => { y.push(Number(n)) })
								vars.push({ var:m.var, val:y, rank:Number(y.length) })						
							}
							else if (m.val.includes('..')) {
								let x = m.val.split('..'), y = []	
								for (let i = Number(x[0]); i <= Number(x[1]); i++) {
									y.push(Number(i))
								}
								vars.push({ var:m.var, val:y, rank:Number(y.length) })
							}
							else
							{
								vars.push({ var:m.var, val:[Number(m.val)], rank:0 })
							}
							break
						}
						case 'texto': {
							if (m.val.includes(',')) {
								let x = m.val.split(','), y = []
								x.forEach(m => { y.push(m.trim()) })
								vars.push({ var:m.var, val:y, rank:-1 })
							}
							else
							{
								vars.push({ var:m.var, val:[m.val], rank:-1 })
							}
						}
					}
				}

				vars.forEach((m, i) => {
					vars[i].val = shuffle(m.val)
					if (m.rank > 0) num *= m.rank
				})

				if (num < max)
					concat(vars, matrix, fns, [])				
				else {
					for (let i = 0; i < max; i++) {
						let arr = []
						for (let j = 0; j < vars.length; j++) {
							let k = vars[j].val[random(0, vars[j].rank)]
							arr.push({ var:vars[j].var, val:k, rank:vars[j].rank })
						}
						matrix.push(evalfn( arr, fns ))
					}
				}
				matrix.forEach((m, i) => { m.id = i })
				return matrix
			}
			function concat(vars, matrix, fns, arr) {
				let values = vars[0].val, size = vars.length
				for (let i = 0; i < values.length; i++) {
					let item = { var:vars[0].var, val:values[i], rank:vars[0].rank }
					if (size > 1)
						concat(vars.slice(1, size), matrix, fns, [...arr, item])
					else if (size == 1) 
						matrix.push(evalfn( [...arr, item], fns ))
				}
			}
			function evalfn(elem, fns) {
				let aux = fns.slice(0), stop = Math.pow(aux.length, 3), copy = elem.slice(0)

				while (aux.length && stop) 
				{
					stop--
					let m = aux.shift(), xy = m.val
					copy.forEach(n => {
						xy = xy.replace(`$${n.var}`, n.val)
					})
					if (!xy.match(/[$]/)) {
						if (!xy.includes('ME.'))
							copy.push({ var:m.var, val:Number(eval(xy)), rank:0 })
						else {
							let f = xy.substring(3, xy.length), g = f.split('('), h = g[1].split(')')
							copy.push({ var:m.var, val:ME[g[0]](Number(eval(h[0]))), rank:0 })
						}
					}
					else {
						m.val = xy
						aux.push(m)
					}
				}
				return copy
			}
			break
		}
		case 'READ': {
			base.child('gen').once('value').then(snap => {
				let versions = []
				snap.forEach(g => {
					let vars = []
					base.child(`gen/${g.key}`).orderByChild('var').once('value').then(h => {	
						h.forEach(v => { if (v.key != 'id') vars.push( v.val() ) })
						versions.push({ id:h.val().id, vars })
						update({ versions })
					})					
				})
			})
			break
		}
		case 'DELETE': {
			const { id } = state
			base.child('gen').once('value').then(snap => {
				snap.forEach(g => {
					if (g.val().id == id) {
						base.child(`gen/${g.key}`).remove().then(() => {
							base.child('bup').orderByKey().limitToFirst(1).once('value').then(h => {	
								h.forEach(v => { 
									base.child('gen').push(v.val())
									base.child(`bup/${v.key}`).remove()
								})
							})	
						})
					}					
				})
			})
			break
		}
		case 'PRINT': {
			DEFAULT.FNS.forEach(path => exe(action, { ...state, path }))
			break
		}
		case 'CHECK': {
			base.once('value').then(v => {
				if (v.hasChild('total')) {
					const { total, limit, selected } = v.val(); update({ total, limit, selected })
					$('total').value = total; $('limit').value = limit; $('selected').value = selected
				}
			})
			data.child(`${code}/variables`).on('value', snap => {
				let vars = []
				snap.forEach(v => {
					vars.push({ var:v.val().var, val:v.val().vt }); update({ vars, vt:{ id:'vt', vars } })
				})
			})
			break
		}
		case 'DOWNLOAD': {
			const { answers, feedback, functions, versions, vt } = state, v = [...versions, vt]
			answers.forEach(m => { delete m.json }); feedback.forEach(m => { delete m.json }); functions.forEach(m => { delete m.json })
			let e = stringify(functions), r = stringify(answers), g = stringify(feedback), s = code.substring(10, 15)

			v.forEach(m => {
				let doc = '<!doctype html>', name=`${s}_${m.id}`, file=`${code}_${m.id}`
				doc += `<html lang="es"><head><meta charset="utf-8"><title>${name}</title>`
				LINKS.forEach(l => {
					switch (l.type) {
						case 'script': { doc += `<script type="text/javascript" src="${l.url}"></script>`; break }
						case 'link': { doc += `<link rel="stylesheet" type="text/css" href="${l.url}">`; break }
					}
				})
				doc += `<body id="${code}" data-content="{'e':${e}, 'r':${r}, 'g':${g}}" data-version="${stringify(m)}">`
				doc += '<header><h2 id="title"></h2></header><section id="content" class="container-fluid design"></section>'
				doc += '<footer><div id="help" class="help"><span>Consulta</span></div><button id="submit">Enviar</button></footer></body></html>'

				let a = document.createElement('a'), url = URL.createObjectURL(new Blob([doc], {type:'text/html'}))
				a.href = url; a.download = `${file}.html`; document.body.appendChild(a); a.click()
				setTimeout(() => { document.body.removeChild(a); window.URL.revokeObjectURL(url) }, 0)
			})
			break
		}
		case 'UPLOAD': {
			const { files, form, len } = state
			if (len) 
				Array.from(files).forEach(m => {
					src.child(m.name).put(m).then(() => { 
						alert('¡Archivos actualizados!')
						update({ len:0, files:[], name:'' })
						form.reset()
					})
				})
			else alert('No hay archivos seleccionados')
			break
		}
	}
}