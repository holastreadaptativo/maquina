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