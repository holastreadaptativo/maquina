import { replaceVT } from 'actions'

export function insertarTexto(container, state, variables) {
  	container.innerHTML = replaceVT(state.textCont, variables)
}

