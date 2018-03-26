export const DEVICES = 	[ 	
							{ name:'DESKTOP', size:1200, icon:'desktop_windows', col:'md' },
							{ name:'TABLET', size:768, icon:'tablet_mac', col:'sm' },
							{ name:'PHONE', size:320, icon:'phone_iphone', col:'xs' }
 						]

export const LINKS =	[
							{ name:'bootstrap', type:'link', url:'https://goo.gl/PK5Rdx' },
							{ name:'app.css', type:'link', url:'https://goo.gl/aMWDY3' },
							{ name:'app.js', type:'script', url:'https://goo.gl/4SyPoR' }
						]

export const DEFAULT = 	{
							CODE:'000000000000000',
							DEVICE:DEVICES[0].size,
							EMPTY:{ var:'', val:'', type:'numero', vt:'', res:'' },
							SEARCH:{ code:'000000000000000', length:0, search:[], selected:false, temp:0 }
						}

export const LABELS =	{
							CODE:['Nivel', 'Eje', 'OA', 'IE', 'Tipo', 'Ejercicio'],
							VARS:['#', 'Variable', 'Tipo', 'Valores', 'Restricción', 'VT', ''],
							TYPE:['var', 'type', 'val', 'res', 'vt'],
							SIZE:[ 12, 10, 9, 8, 6, 4, 3, 2 ],
							NAME:{functions:'Ejercicios', answers:'Respuestas', feedback:'Glosa'}
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
				            	path:'/glosa', title:'Crear glosa', text:'Glosa', icon:'tasks', nav:['details','layers'] }, 
				            { 
				            	path:'/versiones', title:'Generar versiones', text:'Versiones', icon:'duplicate', nav:['toll'] }, 
				            { 
				            	path:'/descargas', title:'Descargar ejercicio', text:'Descargas', icon:'download-alt', nav:['cloud_upload'] }/*,
				            { 
				            	path:'/configuracion', title:'Configuración', text:'Configuración', icon:'cog', nav:[] }*/
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