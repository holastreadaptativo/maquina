import { shuffle, random } from 'actions'

var num = 0, max = Math.pow(2, 13)
export function versiones(action, state) {
	switch(action) {
		case 'GEN': {
			const { fns, variables } = state
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
	}
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
	let aux = fns.slice(0), stop = Math.pow(aux.length, 2), copy = elem.slice(0)

	while (aux.length && stop) 
	{
		stop--
		let m = aux.shift(), xy = m.val
		copy.forEach(n => {
			xy = xy.replace(new RegExp(n.var, 'g'), n.val)
		})
		if (!xy.match(/[a-zA-Z]/))
			copy.push({ var:m.var, val:Number(eval(xy)), rank:0 })
		else {
			m.val = xy
			aux.push(m)
		}
	}
	return copy
}

/*
while (aux.length && stop) 
{
	stop--
	let m = aux.shift(), fn = m.val, xy = []
	for (let i = 0, k = 0; i < fn.length; i++) {
		if (fn[i].match(/[*+(),]/)) {
			xy.push(fn.substring(k, i))
			xy.push(fn[i])
			k = i + 1
		} else if (i + 1 == fn.length) {
			xy.push(fn.substring(k, fn.length))
		}
	}
	for (let i = 0; i < xy.length; i++) {
		for (let j = 0; j < copy.length; j++) {
			if (xy[i].toString().trim() == copy[j].var) {
				xy[i] = copy[j].val
			}
		}
	}
	let value = false
	try
	{
		console.log(xy.join(''))
		console.log(eval(xy.join('')))
		console.log(Number(eval(xy.join(''))))
		value = Number(eval(xy.join('')))
		if (Number.isInteger(value)) {
			copy.push({ var:m.var, val:value, rank:0 })
			console.log(JSON.stringify(copy))
		}			
	}
	finally
	{
		if (!value) {
			m.val = xy.join('')
			aux.push(m)
		}
	}		
}
*/