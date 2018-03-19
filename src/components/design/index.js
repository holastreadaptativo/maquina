import * as geometria from './geometria'
import * as datos from './datos'
import * as general from './general'
import * as actions from 'actions'

export const FUNCIONES = 
[	
	{ 
		name:'General', tag:'general', fns:[
			{ id:'Insertar Texto', component:general.InsertarTexto, action:actions.insertarTexto },
			{ id:'Radio Buttons', component:general.RespRadioButtons, action:actions.respRadioBtn }
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