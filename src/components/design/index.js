import * as geometria from './geometria'
import * as datos from './datos'
import * as general from './general'
import * as actions from 'actions'

export const FUNCIONES = 
[	
	{ 
		name:'General', tag:'general', fns:[
			{ id:'Insertar Texto', component:general.InsertarTexto, action:actions.insertarTexto },
			{ id:'Insertar Botones', component:general.InsertarBotones, action:actions.insertarBotones },
			{ id:'Insertar Inputs', component:null, action:null }
		]
	},
	{ 
		name:'Numeración', tag:'numeracion', fns:[]
	},
	{ 
		name:'Álgebra', tag:'algebra', fns:[]
	},
	{ 
		name:'Medición', tag:'medicion', fns:[]
	},
	{ 
		name:'Geometría', tag:'geometria', fns:[
			{ id:'Plano Cartesiano', component:geometria.PlanoCartesiano, action:actions.planoCartesiano }
		]
	},
	{ 
		name:'Datos', tag:'datos', fns:[
			{ id:'Gráfico Datos', component:datos.GraficoDatos, action:actions.graficoDatos }
		]
	}
]