import { regex, replace } from 'actions'

export function insertarTexto(config) {
	const { container, params, variables, versions, vt } = config

	if (container) {
		let vars = vt ? variables : versions
  		container.innerHTML = regex(params.content, vars, vt)
	}
}
export function insertarInput(config) {
	const { container, params, variables, versions, vt } = config, 
	{ value1, value2, value3, value4, inputType } = params
	let arr = [value1, value2, value3, value4], 
	vars = vt ? variables : versions
	
	if (container) {
		switch(inputType) {
			case 'input': { container.innerHTML = '<input type="text" placeholder="Respuesta"></input>'; break }
			case 'radio': { 
				let r = '', n = '', valoresReemplazados = '';
				arr.forEach((m, i) => {
					valoresReemplazados = replace(m, vars, vt);
					try {
						n = eval(valoresReemplazados);
						r += `<li key="${i}"><input name="answer" value="${n}" type="radio"/><label>${n}</label></li>`
					} catch(e) {
						r += `<li key="${i}"><input name="answer" value="${valoresReemplazados}" type="radio"/><label>${valoresReemplazados}</label></li>`
					}
				}); 
				container.innerHTML = r
				break
			}
			case 'checkbox': { 
				let r = '', n = '', valoresReemplazados = '';
				arr.forEach((m, i) => { 
					valoresReemplazados = replace(m, vars, vt);
					try {
						n = eval(valoresReemplazados)
						r += `<li key="${i}"><input name="answer" value="${n}" type="checkbox"/><label>${n}</label></li>`
					} catch(e) {
						r += `<li key="${i}"><input name="answer" value="${valoresReemplazados}" type="checkbox"/><label>${valoresReemplazados}</label></li>`
					}
				}); 
				container.innerHTML = r
				break
			}	
			case 'select': { let r = '<select>', n = ''
				arr.slice(0, 3).forEach((m, i) => { n = eval(replace(m, vars, vt))
					r += `<option key="${i}" value="${n}">${n}</option>` 
				}); container.innerHTML = r + '</select>'
				break
			}
			case 'textarea': { container.innerHTML = '<textarea placeholder="Respuesta"></textarea>'; break }
		}	
	}
}
export function insertarInputFraccion(config) {
	const { container, params, variables, versions, vt } = config;
	var inputFraccion = '', vars;
	try {
		vars = vt ? variables : versions;
		var feedbackGood = regex(params.feedbackGood, vars, vt);
		var feedbackBad = regex(params.feedbackBad, vars, vt);
		var disabled = params.disabled==='si' ? 'disabled': '';
		var entero = regex('$'.concat(params.entero), vars, vt);
		var numerador = regex('$'.concat(params.numerador), vars, vt);
		var denominador = regex('$'.concat(params.denominador), vars, vt);
		inputFraccion = '<table><tbody><tr><td rowspan="2">';
		inputFraccion += `<input type="text" id="entero" name="answer" class="input-numerador" data-content="{'feedbackGood':'${feedbackGood}','feedbackBad':'${feedbackBad}','esCorrecta': '${entero}'}" ${disabled} ${params.disabled==='si' && `value="${entero}"`} />`;
		inputFraccion += '</td><td style="border-bottom: 2px solid black;">'
		inputFraccion += `<input type="text" id="numerador" name="answer" class="input-num-y-den" data-content="{'feedbackGood':'${feedbackGood}','feedbackBad':'${feedbackBad}','esCorrecta': '${numerador}'}" ${disabled} ${params.disabled==='si' && `value="${numerador}"`}"/>`
		inputFraccion += '</td></tr><tr><td>'
		inputFraccion += `<input type="text" id="denominador" name="answer" class="input-num-y-den" data-content="{'feedbackGood':'${feedbackGood}','feedbackBad':'${feedbackBad}','esCorrecta': '${denominador}'}" ${disabled} ${params.disabled==='si' && `value="${denominador}"`}/>`
		inputFraccion += '</td></tr></tbody></table>';
	} catch(e) {
		console.log(e);
	}
	container.innerHTML = inputFraccion;
} 
export function insertarTabla(config) {
	const { container, params, variables, versions, vt } = config, { table } = params, vars = vt ? variables : versions

	if (container) {
		let r = '<table class="table table-condensed"><tbody>'			
		table.forEach((m, i) => {
			r += `<tr key="${i}">`
			m.value.forEach((n, j) => {
				if (n.value) {
					r += `<td key="${j}">`
					r += n.type == 'input' ? `<input class="form-control" type="text" placeholder="Respuesta" value="${n.value.answer}"></input>` :
						n.type == 'image' ? `<img src="${n.value.url}" height="50px"/>` : `<h6>${n.value.text}</h6>`
					r += '</td>'
				}	
			})
			r += '</tr>'
		})
		r += '</tbody></table>'
		container.innerHTML = r
	}
}
export const ME = { 
	toString:(n) => {
		let e = Math.floor(Number(n))

	    if (e == 0) return 'cero'
	    else return Millones(e)

	    function Unidades(n) {
		    switch(n) {
		        case 1: return 'uno'
		        case 2: return 'dos'
		        case 3: return 'tres'
		        case 4: return 'cuatro'
		        case 5: return 'cinco'
		        case 6: return 'seis'
		        case 7: return 'siete'
		        case 8: return 'ocho'
		        case 9: return 'nueve'
		        default: return ''
		    }
		}
		function Decenas(n){
		    let d = Math.floor(n/10), u = n - (d * 10)

		    switch(d) {
		        case 1:
		            switch(u)
		            {
		                case 0: return 'diez';
		                case 1: return 'once';
		                case 2: return 'doce';
		                case 3: return 'trece';
		                case 4: return 'catorce';
		                case 5: return 'quince';
		                default: return 'dieci' + Unidades(u);
		            }
		        case 2:
		            switch(u) {
		                case 0: return 'veinte';
		                default: return 'venti' + Unidades(u)
		            }
		        case 3: return DecenasY('treinta', u)
		        case 4: return DecenasY('cuarenta', u)
		        case 5: return DecenasY('cincuenta', u)
		        case 6: return DecenasY('sesenta', u)
		        case 7: return DecenasY('setenta', u)
		        case 8: return DecenasY('ochenta', u)
		        case 9: return DecenasY('noventa', u)
		        case 0: return Unidades(u)
		    }
		    function DecenasY(s, u) {
			    if (u > 0) return s + ' y ' + Unidades(u); else return s
			}
		}
		function Centenas(m) {
		    let c = Math.floor(m / 100), d = m - (c * 100)

		    switch(c) {
		        case 1:
		            if (d > 0) return 'ciento ' + Decenas(d)
		            else return 'cien'
		        case 2: return 'doscientos ' + Decenas(d)
		        case 3: return 'trescientos ' + Decenas(d)
		        case 4: return 'cuatrocientos ' + Decenas(d)
		        case 5: return 'quinientos ' + Decenas(d)
		        case 6: return 'seiscientos ' + Decenas(d)
		        case 7: return 'setecientos ' + Decenas(d)
		        case 8: return 'ochocientos ' + Decenas(d)
		        case 9: return 'novecientos ' + Decenas(d)
		        default: return Decenas(d)
		    }
		}
		function Seccion(n, d, s, p) {
		    let c = Math.floor(n / d), r = n - (c * d), l = ''

		    if (c > 0) {
		        if (c > 1) l = Centenas(c) + ' ' + p
		        else l = s
		    }
		    if (r > 0) l += ''

			return l
		}
		function Miles(n) {
		    let d = 1000, c = Math.floor(n / d), r = n - (c * d), sm = Seccion(n, d, 'mil', 'mil'), sc = Centenas(r)

		    if (sm == '') return sc
		    else return sm + ' ' + sc
		}
		function Millones(n) {
		    let d = 1000000, c = Math.floor(n / d), r = n - (c * d), sg = Seccion(n, d, 'un millon ', 'millones '), sm = Miles(r)

		    if (sg == '') return sm
		    else return sg + ' ' + sm
		}
	}
}