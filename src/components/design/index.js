import * as actions from 'actions'
import * as components from './general'

export const FUNCIONES = [	
	{ name:'General', tag:'general', fns:[
		{ id:'Insertar Texto', component:components.InsertarTexto, action:actions.insertarTexto },
		{ id:'Radio Buttons', component:components.RespRadioButtons, action:actions.respRadioBtn }
	]},
	{ name:'Numeración', tag:'numeracion', fns:[]},
	{ name:'Álgebra', tag:'algebra', fns:[]},
	{ name:'Medición', tag:'medicion', fns:[]},
	{ name:'Geometría', tag:'geometria', fns:[
		{ id:'Plano Cartesiano', component:components.PlanoCartesiano, action:actions.planoCartesiano }
	]},
	{ name:'Datos', tag:'datos', fns:[
		{ id:'Gráfico Datos', component:components.GraficoDatos, action:actions.graficoDatos }
	]}
]