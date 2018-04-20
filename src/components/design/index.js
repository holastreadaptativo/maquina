import * as actions from 'actions'
import * as components from 'components'

export const FUNCIONES = [	
	{ name:'General', tag:'general', fns:[
		{ id:'Insertar Texto', component:components.InsertarTexto, action:actions.insertarTexto },
		{ id:'Insertar Input', component:components.InsertarInput, action:actions.insertarInput },
		{ id:'Insertar Tabla', component:components.InsertarTabla, action:actions.insertarTabla }
	]},
	{ name:'Numeración', tag:'numeracion', fns:[
		{ id:'' }
	]},
	{ name:'Álgebra', tag:'algebra', fns:[]},
	{ name:'Medición', tag:'medicion', fns:[]},
	{ name:'Geometría', tag:'geometria', fns:[
		{ id:'Plano Cartesiano', component:components.PlanoCartesiano, action:actions.planoCartesiano }
	]},
	{ name:'Datos', tag:'datos', fns:[
		{ id:'Gráfico Datos', component:components.GraficoDatos, action:actions.graficoDatos }
	]}
]
export InsertarInput from './general/InsertarInput'
export InsertarTabla from './general/InsertarTabla'
export InsertarTexto from './general/InsertarTexto'

export GraficoDatos from './general/GraficoDatos'

export PlanoCartesiano from './general/PlanoCartesiano'