export const DEVICES = 	[ 	{ name:'DESKTOP', size:1200, icon:'desktop_windows' },
							{ name:'TABLET', size:768, icon:'tablet_mac' },
							{ name:'PHONE', size:320, icon:'phone_iphone' }
 						]

export const DEFAULT = 	{
							CODE:'000000000000000',
							DEVICE:DEVICES[0].size
						}

export const ROUTES = 	[ 
				            { 
				            	path:'/', title:'Buscador', text:'Buscador', icon:'home', nav:[] }, 
				            { 
				            	path:'/variables', title:'Ingresar variables', text:'Variables', icon:'th', nav:[] }, 
				            { 
				            	path:'/ejercicios', title:'Crear ejercicio', text:'Ejercicios', icon:'edit', nav:['details', 'layers'] }, 
				            { 
				            	path:'/respuestas', title:'Crear respuestas', text:'Respuestas', icon:'list-alt', nav:['details','layers'] }, 
				            { 
				            	path:'/glosa', title:'Crear glosa', text:'Glosa', icon:'tasks', nav:[] }, 
				            { 
				            	path:'/versiones', title:'Generar versiones', text:'Versiones', icon:'duplicate', nav:['layers'] }, 
				            /*{ 
				            	path:'/descargas', title:'Descargar ejercicio', text:'Descargas', icon:'download-alt', nav:[] },*/
				            { 
				            	path:'/configuracion', title:'Configuración', text:'Configuración', icon:'cog', nav:[] }
        				]

export const COLORS = 	{
							geometria:'#00aaad', 
							algebra:'#91518f', 
							medicion:'#175389', 
							numeracion:'#bc2424', 
							datos:'#549c02', 
							background:'#ffffff', 
							border:'#cccccc', 
							grid:'#dddddd' 
						}

export const CODE = 	[ 'Nivel', 'Eje', 'OA', 'IE', 'Tipo', 'Ejercicio' ]

export const SIZES = 	[ 12, 9, 8, 6, 4, 3 ]