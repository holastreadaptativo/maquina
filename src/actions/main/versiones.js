import $, { exe, random, shuffle, stringify, ME } from 'actions'
import { data, src, DEFAULT, LINKS } from 'stores'

var num = 0, max = Math.pow(2, 13)
// le pasa la action => {CREATE, READ, ... } y el state => {contiene las variables necesarias para las versiones} a las versiones
export function ver(action, state) {
	const { code, update, esProduccion } = state, base = data.child(code.concat('/versions'))
	switch(action) {
		case 'CREATE': {
			const { fns, limit, selected, variables } = state
			let matrix = getmtx(fns, variables), total = matrix.length
			matrix = filter(variables, shuffle(matrix).slice(0, 10*limit)).slice(0, limit)
		
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
			
			base.set({ box, bup, gen, limit, selected, total })

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
			function filter(vars, matrix) {
				let versions = []
				matrix.forEach(m => {
					let check = true, r = ''
					for (let i = 0; i < vars.length; i++) { 
						r = vars[i].res
						if (r != '') {
							m.forEach(n => { r = r.replace(`$${n.var}`, n.val) })
							if (!eval(r)) { check = false; break }
						}
					}
					if (check) versions.push(m)
				})
				return versions
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
			DEFAULT.FNS.forEach(path => exe(action, { ...state, path })) //FNS:['functions', 'answers', 'feedback']
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
		case 'DOWNLOAD': { //genera el html de los ejercicioas creados
			const { answers, feedback, functions, versions, vt } = state, v = [...versions, vt]
			answers.forEach(m => { delete m.json }); 
			feedback.forEach(m => { delete m.json }); 
			functions.forEach(m => { delete m.json })
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
				a.href = url; //crea link, asigna propiedades 
				console.log(url)
				a.download = `${file}.html`; 
				document.body.appendChild(a);
				a.click() //simula evento para descargar el documento html
				setTimeout(() => { 
					document.body.removeChild(a); 
					window.URL.revokeObjectURL(url) 
				}, 0)
			})
			break
		}
		case 'DOWNLOAD2': {
			const { answers, feedback, functions, versions, vt } = state, v = [...versions, vt]
			answers.forEach(m => { delete m.json }); 
			feedback.forEach(m => { delete m.json }); 
			functions.forEach(m => { delete m.json })
			let e = stringify(functions), 
			r = stringify(answers), 
			g = stringify(feedback), 
			s = code.substring(10, 15),
			OAIE = code.substring(4,8);

			console.log(esProduccion);
			const bootstrapCss = esProduccion ?
			 	'../../../../css/bootstrap.min.css' : 
			 	'https://desarrolloadaptatin.blob.core.windows.net:443/sistemaejercicios/ejercicios/Nivel-4/css/bootstrap.min.css';
			const appCss = esProduccion ?
				`../../../../css/${OAIE}/app.css` :
				`https://desarrolloadaptatin.blob.core.windows.net:443/sistemaejercicios/ejercicios/Nivel-4/css/${OAIE}/app.css`;
			const appJs = esProduccion ?
				`../../../../js/${OAIE}/app.js` :
				`https://desarrolloadaptatin.blob.core.windows.net:443/sistemaejercicios/ejercicios/Nivel-4/js/${OAIE}/app.js`;
			const interfazJs = esProduccion ?
				`../../../../js/${OAIE}/interfaz.js` :
				`https://desarrolloadaptatin.blob.core.windows.net:443/sistemaejercicios/ejercicios/Nivel-4/js/${OAIE}/interfaz.js`;
			const jsEjerciciosJs = esProduccion ?
				`../../../../js/${OAIE}/jsEjercicios.js` :
				`https://desarrolloadaptatin.blob.core.windows.net:443/sistemaejercicios/ejercicios/Nivel-4/js/${OAIE}/jsEjercicios.js`;
			const bootstrapJs = esProduccion ?
				'../../../../js/bootstrap.min.js' :
				'https://desarrolloadaptatin.blob.core.windows.net:443/sistemaejercicios/ejercicios/Nivel-4/js/bootstrap.min.js';
			const jquery = esProduccion ?
				'../../../../js/jquery-3.3.1.slim.min.js' :
				'https://desarrolloadaptatin.blob.core.windows.net:443/sistemaejercicios/ejercicios/Nivel-4/js/jquery-3.3.1.slim.min.js';
			const popper = esProduccion ? 
				'../../../../js/popper.min.js' :
				'https://desarrolloadaptatin.blob.core.windows.net:443/sistemaejercicios/ejercicios/Nivel-4/js/popper.min.js';
			const srcImgPatoGlosa = esProduccion ?
				'../../../../imagenes_front/patos/togaSuki.svg' :
				'https://desarrolloadaptatin.blob.core.windows.net:443/sistemaejercicios/ejercicios/Nivel-4/imagenes_front/patos/togaSuki.svg';
			v.forEach(m => {
				let name=`${s}_${m.id}`, file=`${code}_${m.id}`;
				let documento = `<!doctype html>
<html lang="en">
<head>
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
	<link rel="stylesheet" href="${bootstrapCss}">
	<link rel="stylesheet" href="${appCss}">
	<title>${name}</title>
	<script>document.domain = "adaptativamente.cl";</script>
</head>
<body id="${code}" data-content="{'e':${e}, 'r':${r}, 'g':${g}}" data-version="${stringify(m)}">
	<header class="barraprogreso">
			<div class="container-fluid">
				<div class="row justify-content-center no-gutters align-items-center">
					<div class="col-11 col-sm-10 pr-4 pr-sm-0">
						<div id="progressbar" class="barra-progreso"></div>
					</div>
					<div class="col-1">
						<!--<svg id="botonSalir" class="float-right" xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" data-toggle="tooltip" data-placement="bottom" title="Salir de la misión">
							<path d="M0 0h24v24H0z" fill="none"/><path d="M10.09 15.59L11.5 17l5-5-5-5-1.41 1.41L12.67 11H3v2h9.67l-2.58 2.59zM19 3H5c-1.11 0-2 .9-2 2v4h2V5h14v14H5v-4H3v4c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z"/>
						</svg>-->
					</div>
				</div>
			</div>
	</header>
	<section class="contenido">
			<div class="container-fluid">
				<div id="enunciado" class="row"></div>
				<div id="respuesta" class="row justify-content-center"></div>
			</div>
	</section>
	<footer class="fixed-bottom pie">
			<div class="container-fluid">
				<div class="row align-items-center">
						<div class="col-4 col-md-3">
							<button type="button" id="btnConsulta" class="btn btn-block bton bton-5 bton-5a icon-consulta" onclick="pressConsulta()">
								<span>CONSULTA</span>
							</button>
							<img id="imgfeedback" class="img-fluid d-none" alt="IMG" />
						</div>
						<div class="col-4 col-md-6"></div>
						<div class="col-4 col-md-3">
							<button type="button" id="btnResponder" class="btn btn-block bton bton-5 bton-5a icon-responder float-right" disabled>
								<span>RESPONDER</span>
							</button> 
						</div>
				</div>
			</div>
	</footer>
	<div class="modal fade" id="modalFeedback" tabindex="-1" role="dialog" aria-labelledby="modal" aria-hidden="true">
			<div class="modal-dialog modal-dialog-centered" role="document">
				<div class="modal-content" style="border-radius: 10px!important">
						<div id="feedback" class="modal-body" style="padding: 10px 0;">
							<div class="container-fluid">
									<div class="row no-gutters">
										<div class="col-12">
												
										</div>
										<div class="col-4 offset-8">
											<button id="btnCloseModal" type="button" class="btnCerrarFeed">
												<div></div>
											</button>
										</div>
									</div>
							</div>
						</div>
				</div>
			</div>
	</div>
	<div class="modal fade" id="modalGlosa" tabindex="-1" role="dialog" aria-labelledby="modal" aria-hidden="true">
			<div class="modal-dialog modal-dialog-centered dimensionGlosa" role="document">
				<div id="contenidoGlosa" class="modal-content glosaEjercicio">
						<div class="modal-body modalBody">
								<div class="container-fluid">
									<div class="row no-gutters">
										<div class="offset-2 col-10 tituloGlosa">
											<span>Solución</span>
										</div>
										<div class="col-2 d-none d-sm-block">
											<img class="img-fluid" src="${srcImgPatoGlosa}">
										</div>
										<div class="col-12 col-sm-10" id="glosa">
										</div>
									</div>
									<div class="row no-gutters">
										<div class="offset-8 col-4 offset-sm-9 col-sm-3 offset-md-10 col-md-2">
											<button id="btnCloseGlosa" type="button" class="btn btn-primary" onclick="cerrarFeedGlosa()">Aceptar</button>
										</div>
									</div>
								</div>
						</div>
				</div>
			</div>
	</div>
	<input id="hiddenIntento" type="hidden" value="hiddenIntento"/>
	<script src="${jquery}"></script>
	<script src="${bootstrapJs}"></script>
	<script src="${appJs}"></script>
	<script src="${interfazJs}"></script>
	<script src="${jsEjerciciosJs}"></script>
</body>
</html>`;
				let a = document.createElement('a'), 
				url = URL.createObjectURL(new Blob([documento], {type:'text/html'}))
				a.href = url; //crea link, asigna propiedades 
				console.log(url)
				a.download = `${file}.html`; 
				document.body.appendChild(a); 
				a.click() //simula evento para descargar el documento html
				setTimeout(() => { 
					document.body.removeChild(a); 
					window.URL.revokeObjectURL(url) 
				}, 0)
			})
			break;
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