import { replace } from 'actions'

export function insertarTexto(config) {
	const { container, params, variables, versions, vt } = config

	if (container) {
		let vars = vt ? variables : versions
  		container.innerHTML = replace(params.textCont, vars, vt)
	}
}

export function insertarBotones(config) {
	const { container, params, variables, versions, vt } = config
	if (container) {
		let vars = vt ? variables : versions
  		container.innerHTML = replace(params.textCont, vars, vt)
	}
	console.log('*********** insertarBotones')
}

export function insertarInputs(config) {
	const { container, params, variables, versions, vt } = config
	if (container) {
		let vars = vt ? variables : versions
  		container.innerHTML = replace(params.textCont, vars, vt)
	}
	console.log('*********** insertarInputs')
}