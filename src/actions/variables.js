export function setFormat(value) {
	let aux = value.toLowerCase(), arr = []
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
	else if (aux.includes('+') || aux.includes('-') || aux.includes('*') || aux.includes('/') || aux.length == 1) {
		arr = aux.split('')
		for (let i = 0; i < arr.length; i++)
			if (arr[i].charCodeAt(0) >= 97 && arr[i].charCodeAt(0) <= 122) {
				arr[i] = `$${arr[i].trim()}`
			}
		aux = arr.filter(n => n).join('').split('+').join(' + ').split('-').join(' - ').replace('*', ' * ').replace('^', ' ^ ')
	}
	return aux
}

export function checkAll(variables) {
		let aux = [variables.length > 0 && variables[0].var != '' && variables[0].val != '', true, true, true, true, true, true], vars = []

		if (variables.length > 0 && variables[0].var == '')
			return [[false, false, false, false, false, false, false], 0]

		for (let i = 0; i < variables.length; i++) {
			let val = variables[i].val, res = variables[i].res, type = variables[i].type; vars[i] = true
			if (val.length == 1) {
				if (val.charCodeAt(0) >= 97 && val.charCodeAt(0) <= 122 && type == 'funcion') {}
				else if (Number.isInteger(parseInt(val)) && type == 'numero') {} else aux[1] = vars[i] = false
			} else {
				if (val == '' || val.length == 0) {
					aux[1] = vars[i] = false
				} else if (val.includes('+') || val.includes('-') || val.includes('*') || val.includes('/')) {
					if (type == 'numero' || type == 'texto') aux[1] = vars[i] = false
				} else if (val.includes('..')) {
					if (type == 'funcion' || type == 'texto') aux[1] = vars[i] = false
				} else if (val.includes(',')) {
					if (type == 'funcion') aux[1] = vars[i] = false
					else {
						let ref = val.split(','), number = true
						for (let j = 0; j < ref.length; j++) {
							if (!Number.isInteger(parseInt(ref[j].trim()))) { number = false; break }
						}
						if ((type == 'numero' && number == true) || (type == 'texto' && number == false)) {}
						else aux[1] = vars[i] = false
					}
				}
			}
			if (val.includes('+') || val.includes('-') || val.includes('*') || val.includes('/') || val.length == 1) {
				let arr = val.split('')
				for (let k = 0; k < arr.length; k++) {
					if (arr[k].charCodeAt(0) >= 97 && arr[k].charCodeAt(0) <= 122) {
						let ok = false
						for (let j = 0; j < variables.length; j++) {
							if (arr[k].trim() == variables[j].var) {
								ok = true; break
							}
						} if (!ok) {
							aux[2] = vars[i] = false; break
						}
					}
				}	
			}
			if (res && res.trim() != '' && !res.includes(variables[i].var)) {
				aux[3] = vars[i] = false
			}
			if (variables[i].vt.trim() == '') {
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