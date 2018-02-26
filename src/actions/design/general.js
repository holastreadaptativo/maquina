import { replaceVT } from 'actions'

export function insertarTexto(config) {
	const { container, params, variables } = config
  	container.innerHTML = replaceVT(params.textCont, variables)
}