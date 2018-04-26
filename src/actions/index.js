export * from './global/tools'
export * from './global/users'

export * from './main/ejercicios'
export * from './main/variables'
export * from './main/versiones'

export * from './design/datos'
export * from './design/general'
export * from './design/geometria'
export * from './design/numeracion'
export * from './design/rectasNumericas'

import * as fn from 'actions'

export const action = { var:fn.cod, exe:fn.exe, ver:fn.ver }

export default fn.$