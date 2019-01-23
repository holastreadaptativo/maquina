import * as actions from 'actions'
import * as general from './general'
import * as canvas from './canvas'

const components = { ...general, ...canvas }

export const FUNCIONES = [{ 
	name:'General', 
	tag:'general', 
	fns:[{ 
		id:'Insertar Input', 
		component:components.InsertarInput, 
		action:actions.insertarInput 
	},{ 
		id:'Insertar Tabla', 
		component:components.InsertarTabla, 
		action:actions.insertarTabla 
	},{ 
		id:'Insertar Texto', 
		component:components.InsertarTexto, 
		action:actions.insertarTexto 
	},{ 
		id:'Insertar Input Fraccion', 
		component:components.InsertarInputFraccion, 
		action:actions.insertarInputFraccion 
	}]
},{ 
	name:'Numeración', 
	tag:'numeracion', 
	fns:[{ 
		id:'Recta Numérica', 
		component:components.RectaNumerica, 
		action:actions.rectNumFn 
	},{ 
		id:'Repetición Pictóricos', 
		component:components.RepeticionPictoricos, 
		action:actions.repeticionPic 
	},{ 
		id:'Tabla Posicional', 
		component:components.TablaPosicional, 
		action:actions.tablaPosicional 
	},{ 
		id:'Valor Posicional', 
		component:components.ValorPosicional, 
		action:actions.valorPosicional 
	}]
},{ 
	name:'Álgebra', 
	tag:'algebra', 
	fns:[{ 
		id:'Sucesiones', 
		component:components.Sucesiones, 
		action:actions.sucesiones 
	}]
},{ 
	name:'Medición', 
	tag:'medicion', fns:[{ 
		id: 'Tiempo', 
		component:components.Reloj, 
		action:actions.reloj 
	},{ 
		id:'Area Cuadrados', 
		component:components.AreaCuadrado, 
		action:actions.areaCuadrada 
	},{ 
		id:'Perimetro', 
		component:components.IgualPerimetro, 
		action:actions.igualPerimetro 
	}]
},{ 
	name:'Geometría', 
	tag:'geometria', 
	fns:[{ 
		id:'Plano Cartesiano', 
		component:components.PlanoCartesiano, 
		action:actions.planoCartesiano 
	},{ 
		id:'Transportador', 
		component:components.Transportador, 
		action:actions.transportador 
	}]
},{ 
	name:'Datos', 
	tag:'datos', 
	fns:[{ 
		id:'Gráfico Datos', 
		component:components.GraficoDatos, 
		action:actions.graficoDatos 
	}]
}]