import * as actions from 'actions'
import * as components from './general'

export const FUNCIONES = [	
	{ name:'General', tag:'general', fns:[
		{ id:'Insertar Input', component:components.InsertarInput, action:actions.insertarInput },
		{ id:'Insertar Tabla', component:components.InsertarTabla, action:actions.insertarTabla },
		{ id:'Insertar Texto', component:components.InsertarTexto, action:actions.insertarTexto }
	]},
	{ name:'Numeración', tag:'numeracion', fns:[
		{ id:'Recta Numérica', component:components.RectaNumerica, action:actions.rectNumMixtaFn }	
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