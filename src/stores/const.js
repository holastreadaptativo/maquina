export const DEVICES = 	[ 	{ name:'DESKTOP', size:1200, icon:'desktop_windows' },
							{ name:'TABLET', size:768, icon:'tablet_mac' },
							{ name:'PHONE', size:320, icon:'phone_iphone' }
 						]

export const DEFAULT = 	{
							CODE:'000000000000000',
							DEVICE:DEVICES[0].size
						}

export const NAVBAR = 	[ 
				            { path:'/', icon:'home', text:'Buscador', title:'Buscador', nav:[] }, 
				            { path:'/variables', icon:'th', text:'Variables', title:'Ingresar variables', nav:[] }, 
				            { path:'/ejercicios', icon:'edit', text:'Ejercicios', title:'Crear ejercicio', nav:['details', 'layers'] }, 
				            { path:'/respuestas', icon:'list-alt', text:'Respuestas', title:'Crear respuestas', nav:['details', 'layers'] }, 
				            { path:'/explicacion', icon:'tasks', text:'Explicación', title:'Crear glosa', nav:[] }, 
				            { path:'/versiones', icon:'duplicate', text:'Versiones', title:'Generar versiones', nav:[] }, 
				            { path:'/descargas', icon:'download-alt', text:'Descargas', title:'Descargar ejercicio', nav:[] },
				            { path:'/configuracion', icon:'cog', text:'Configuración', title:'Configuración', nav:[] }
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