export function replace(input, vars, vt) {
	vars.forEach(m => { input = input.toString().replace(new RegExp(`$${m.var}`, 'g'), `${vt ? m.vt : m.val}`) })
	return input
}

export function checkAll(variables) {
	let aux = [variables.length > 0 && variables[0].var != '' && variables[0].val != '', true, true, true, true, true, true], vars = []

	if (variables.length > 0 && (variables[0].var == '' || variables[0].var == 'undefined'))
		return [[false, false, false, false, false, false, false], []]

	for (let i = 0; i < variables.length; i++) {
		let val = variables[i].val, res = variables[i].res, type = variables[i].type; vars[i] = true
		if (val.length == 1) {
			let a = val.charCodeAt(0) >= 97 && val.charCodeAt(0) <= 122 && type == 'funcion', 
				b = Number.isInteger(parseInt(val)) && type == 'numero'
			if (!a && !b) aux[1] = vars[i] = false
		} else {
			if (val == '' || val.length == 0) {
				aux[1] = vars[i] = false
			} else if (val.includes('+') || val.includes('-') || val.includes('*') || val.includes('/') || val.includes('Math')) {
				if (type == 'numero' || type == 'texto') aux[1] = vars[i] = false
			} else if (val.includes('..') && (type == 'funcion' || type == 'texto')) {
				aux[1] = vars[i] = false
			} else if (val.includes(',')) {
				if (type == 'funcion' && !val.includes('Math')) aux[1] = vars[i] = false
				else {
					let ref = val.split(','), number = true
					for (let j = 0; j < ref.length; j++) {
						if (!Number.isInteger(parseInt(ref[j]))) { number = false; break }
					}
					if ((type == 'numero' && number == true) || (type == 'texto' && number == false)) {}
					else aux[1] = vars[i] = false
				}
			} else if (type == 'numero' && !val.includes('..') && !val.includes(',') && !Number.isInteger(parseInt(val))) {
				aux[1] = vars[i] = false
			}

		}
		if (val.includes('+') || val.includes('-') || val.includes('*') || val.includes('/') || val.includes('Math')) {
			let value = val.split('')
			value.forEach((m, i) => {
				value[i] = m.replace(/[*+()-/,]/g, '@')
				//.replace('+', '@').replace('-', '@').replace('*', '@').replace('/', '@').replace('(', '@').replace(')', '@').replace(',', '@')
			})
			let arr = value.join('').split('@')
			for (let k = 0; k < arr.length; k++) {
				if (arr[k].trim() != '') {
					let ok = false
					for (let j = 0; j < variables.length; j++) {
						if (arr[k].trim() == variables[j].var || arr[k].includes('Math') || Number.isInteger(parseInt(arr[k]))) {
							ok = true; break
						}
					} if (!ok) {
						aux[2] = vars[i] = false; break
					}
				}
			}	
		}
		else if (type == 'funcion')
		{	
			let ok = false
			for (let j = 0; j < variables.length; j++) {
				if (val.trim() == variables[j].var) {
					ok = true; break
				}
			} if (!ok) {
				aux[2] = vars[i] = false;
			}
		}
		if (res && res.trim() != '' && !res.includes(variables[i].var)) {
			aux[3] = vars[i] = false
		}
		if (variables[i].vt == 'undefined' || variables[i].vt.trim() == '') {
			aux[4] = vars[i] = false
		}
		for (let j = i + 1; j < variables.length; j++) {
			if (variables[i].var == variables[j].var) {
				aux[5] = vars[i] = false; break
			}
		}
	}
	for (let i = 0; i < aux.length - 1; i++) {
		if (aux[i] == false) { aux[6] = false; break }
	}
	return [aux, vars]
}

export function setFormat(value) {
	let aux = value.trim(), arr = []
	if (aux.includes('..')) {
		arr = aux.split(',')
		for (let i = 0; i < arr.length; i++) {
			let k = arr[i].split('..')
			for (let j = 0; j < k.length; j++) {
				k[j] = k[j].replace('.', '')
			}
			arr[i] = k.filter(n => n).join(' .. ')
		}
		aux = `[${arr.join(', ')}]`
	}
	else if (aux.includes('+') || aux.includes('-') || aux.includes('*') || aux.includes('/') || aux.includes('(') || aux.includes(')')) {
		if (!aux.includes('Math')) {
			for (let i = 0; i < arr.length; i++) {
				if (arr[i].charCodeAt(0) >= 97 && arr[i].charCodeAt(0) <= 122) {
					arr[i] = `$${arr[i].trim()}`
				}
			}
			aux = arr.filter(n => n).join('').split('+').join(' + ').split('-').join(' - ').replace('*', ' * ').replace('^', ' ^ ')
		}		
	}
	return aux
}