import * as geometria from './geometria'
import * as datos from './datos'

export const FUNCIONES = 
[
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
			{ id:'Plano Cartesiano', component:geometria.PlanoCartesiano }
		]
	},
	{ 
		name:'Datos', tag:'datos', fns:[
			{ id:'Gráfico Datos', component:datos.GraficoDatos }
		]
	}
]