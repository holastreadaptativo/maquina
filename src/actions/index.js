export * from './global/tools'
export * from './global/users'

export * from './main/ejercicios'
export * from './main/variables'
export * from './main/versiones'

export * from './design/datos'
export * from './design/general'
export * from './design/geometria'
export * from './design/numeracion'
export * from './design/medicion'
export * from './design/algebra'
export * from './design/repeticionPic'

import * as functions from 'actions'

export const action = { var:functions.cod, exe:functions.exe, ver:functions.ver }

export default functions.$