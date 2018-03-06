export function versiones(action, state) {
	switch(action) {
		case 'GEN': {
			const { fns, variables } = state
			let aux = variables.slice(0), vars = [], matrix = []

			while (aux.length) {
				let m = aux.shift()	
				switch (m.type) {
					case 'numero': {
						if (m.val.includes(',')) {
							let x = m.val.split(','), y = []
							x.forEach(m => { y.push(Number(m)) })
							vars.push({ var:m.var, val:y })
						}
						else if (m.val.includes('..')) {
							let x = m.val.split('..'), y = []	
							for (let i = Number(x[0]); i <= Number(x[1]); i++) {
								y.push(Number(i))
							}
							vars.push({ var:m.var, val:y })
						}
						else
						{
							vars.push({ var:m.var, val:[Number(m.val)] })
						}
						break
					}
					case 'texto': {
						if (m.val.includes(',')) {
							let x = m.val.split(','), y = []
							x.forEach(m => { y.push(m.trim()) })
							vars.push({ var:m.var, val:y })
						}
						else
						{
							vars.push({ var:m.var, val:[m.val] })
						}
					}
				}
			}
			concat(vars, matrix, fns, [])
			return matrix
		}
	}
}

function concat(vars, matrix, fns, arr) {
	let values = vars[0].val, size = vars.length
	for (let i = 0; i < values.length; i++) {
		let item = { var:vars[0].var, val:values[i] }
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
			xy = xy.replace(n.var, n.val)
		})
		if (!xy.match(/[a-zA-Z]/))
			copy.push({ var:m.var, val:Number(eval(xy)) })
		else {
			m.val = xy
			aux.push(m)
		}
	}
	return copy
}