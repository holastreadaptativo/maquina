import { replace } from 'actions'

export function insertarTexto(config) {
	const { container, params, variables, versions, vt } = config

	if (container) {
		let vars = vt ? variables : versions
  		container.innerHTML = replace(params.content, vars, vt)
	}
}
export function insertarInput(config) {
	const { container, params, variables, versions, vt } = config, { value1, value2, value3, value4, inputType } = params
	let arr = [value1, value2, value3, value4], vars = vt ? variables : versions
	
	if (container) {
		switch(inputType) {
			case 'input': { container.innerHTML = '<input type="text" placeholder="Respuesta"></input>'; break }
			case 'radio': { let r = '', n = ''
				arr.forEach((m, i) => { n = eval(replace(m, vars, vt))
					r += `<li key="${i}"><input name="answer" value="${n}" type="radio"/><label>${n}</label></li>` 	
				}); container.innerHTML = r
				break
			}
			case 'checkbox': { let r = '', n = ''
				arr.forEach((m, i) => { n = eval(replace(m, vars, vt))
					r += `<li key="${i}"><input name="answer" value="${n}" type="checkbox"/><label>${n}</label></li>` 
				}); container.innerHTML = r
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
export function insertarTabla(config) {
	alert(config)	
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