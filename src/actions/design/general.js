import { replaceVT } from 'actions'

export function insertarTexto(config) {
	const { container, params, variables } = config
	if (container)
  	container.innerHTML = replaceVT(params.textCont, variables)
}