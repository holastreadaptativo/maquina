export const DEVICES = 	[ 	
							{ name:'DESKTOP', size:1200, icon:'desktop_windows', col:'md' },
							{ name:'TABLET', size:768, icon:'tablet_mac', col:'sm' },
							{ name:'PHONE', size:320, icon:'phone_iphone', col:'xs' }
 						]

export const LINKS =	[
							{ name:'bootstrap', type:'link', url:'https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css' },
							{ name:'app.css', type:'link', url:'https://firebasestorage.googleapis.com/v0/b/maquina-d0d32.appspot.com/o/src%2Fapp.css?alt=media&token=7b396524-c69f-42af-bc1a-6f0d25bd73c3', dev:'app.css' },
							{ name:'app.js', type:'script', url:'https://firebasestorage.googleapis.com/v0/b/maquina-d0d32.appspot.com/o/src%2Fapp.js?alt=media&token=b7f757f7-1900-4e1d-aa28-92a5e60fde90', dev:'app.js' }
							// { name:'bootstrap', type:'link', url:'https://goo.gl/PK5Rdx' },
							// { name:'app.css', type:'link', url:'https://goo.gl/aMWDY3', dev:'app.css' },
							// { name:'app.js', type:'script', url:'https://goo.gl/4SyPoR', dev:'app.js' }
						]

export const DEFAULT = 	{
							CODE:'000000000000000',
							DEVICE:DEVICES[0].size,
							EMPTY:{ var:'', val:'', type:'numero', vt:'', res:'' },
							SEARCH:{ code:'000000000000000', length:0, search:[], selected:false, temp:0 },
							EXE:{ active:0, limit:32, section:'functions', selected:128, tab:0, total:8192, vars:[], vt:[] },
							FNS:['functions', 'answers', 'feedback'] // propiedades de los ejercicios en firebase /{id ejercicio}/{answers, feedback, functions, variables}
						}

export const LABELS =	{
							CODE:['Nivel', 'Eje', 'OA', 'IE', 'Tipo', 'Ejercicio'],
							VARS:['#', 'Variable', 'Tipo', 'Valores', 'Restricción', 'VT', ''],
							TYPE:['var', 'type', 'val', 'res', 'vt'],
							SIZE:[ 12, 10, 9, 8, 6, 4, 3, 2 ],
							NAME:{functions:'Ejercicios', answers:'Respuestas', feedback:'Glosa'},
							CONT:{functions:'container-E', answers:'container-R', feedback:'container-G'}
						}

export const ROUTES = 	[ 
				            { 
				            	path:'/', title:'Buscador', text:'Buscador', icon:'home', nav:[] }, 
				            { 
				            	path:'/design', title:'Ejercicio', text:'Ejercicio', icon:'th', nav:['details', 'layers', 'toll', 'cloud_upload'] }
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

export const MATH =		{
							props: [
								{ prop:'E', desc:'Constante de Euler, la base de los logaritmos naturales, aproximadamente 2.718.' },
								{ prop:'LN2', desc:'Logaritmo natural de 2, aproximadamente 0.693.' },
								{ prop:'LN10', desc:'Logaritmo natural de 10, aproximadamente 2.303.' },
								{ prop:'LOG2E', desc:'Logaritmo de E con base 2, aproximadamente 1.443.' },
								{ prop:'LOG10E', desc:'Logaritmo de E con base 10, aproximadamente 0.434.' },
								{ prop:'PI', desc:'Relación de la circunferencia de un círculo con su diámetro, aproximadamente 3.14159.' },
								{ prop:'SQRT1_2', desc:'Raíz cuadrada de 1/2; Equivalentemente, 1 sobre la raíz cuadrada de 2, aproximadamente 0.707.' },
								{ prop:'SQRT2', desc:'Raíz cuadrada de 2, aproximadamente 1.414.' }
							],
							funcs: [
								{ func:'abs(x)', desc:'Devuelve el valor absoluto de un número.' },
								{ func:'acos(x)', desc:'Devuelve el arco coseno de un número.' },
								{ func:'acosh(x)', desc:'Devuelve el arco coseno hiperbólico de un número.' },
								{ func:'asin(x)', desc:'Devuelve el arco seno de un número.' },
								{ func:'asinh(x)', desc:'Devuelve el arco seno hiperbólico de un número.' },
								{ func:'atan(x)', desc:'Devuelve el arco tangente de un número.' },
								{ func:'atanh(x)', desc:'Devuelve el arco tangente hiperbólico de un número.' },
								{ func:'atan2(y, x)', desc:'Devuelve el arco tangente del cuociente de sus argumentos.' },
								{ func:'cbrt(x)', desc:'Devuelve la raíz cúbica de un número.' },
								{ func:'ceil(x)', desc:'Devuelve el entero más pequeño mayor o igual que un número.' },
								{ func:'clz32(x)', desc:'Devuelve el número de ceros iniciales de un entero de 32 bits.' },
								{ func:'cos(x)', desc:'Devuelve el coseno de un número.' },
								{ func:'cosh(x)', desc:'Devuelve el coseno hiperbólico de un número.' },
								{ func:'exp(x)', desc:'Devuelve ex, donde x es el argumento, y e es la constante de Euler (2.718...), la base de los logaritmos naturales.' },
								{ func:'expm1(x)', desc:'Devuelve ex - 1.' },
								{ func:'floor(x)', desc:'Devuelve el mayor entero menor que o igual a un número.' },
								{ func:'fround(x)', desc:'Devuelve la representación flotante de precisión simple más cercana de un número.' },
								{ func:'hypot([x[, y[, …]]])', desc:'Devuelve la raíz cuadrada de la suma de los cuadrados de sus argumentos.' },
								{ func:'imul(x, y)', desc:'Devuelve el resultado de una multiplicación de enteros de 32 bits.' },
								{ func:'log(x)', desc:'Devuelve el logaritmo natural (log, también ln) de un número.' },
								{ func:'log1p(x)', desc:'Devuelve el logaritmo natural de x + 1 (loge, también ln) de un número.' },
								{ func:'log10(x)', desc:'Devuelve el logaritmo en base 10 de x.' },
								{ func:'log2(x)', desc:'Devuelve el logaritmo en base 2 de x.' },
								{ func:'max([x[, y[, …]]])', desc:'Devuelve el mayor de cero o más números.' },
								{ func:'min([x[, y[, …]]])', desc:'Devuelve el más pequeño de cero o más números.' },
								{ func:'pow(x, y)', desc:'Las devoluciones de base a la potencia de exponente, que es, baseexponent.' },
								{ func:'random()', desc:'Devuelve un número pseudo-aleatorio entre 0 y 1.' },
								{ func:'round(x)', desc:'Devuelve el valor de un número redondeado al número entero más cercano.' },
								{ func:'sign(x)', desc:'Devuelve el signo de la x, que indica si x es positivo, negativo o cero.' },
								{ func:'sin(x)', desc:'Devuelve el seno de un número.' },
								{ func:'sinh(x)', desc:'Devuelve el seno hiperbólico de un número.' },
								{ func:'sqrt(x)', desc:'Devuelve la raíz cuadrada positiva de un número.' },
								{ func:'tan(x)', desc:'Devuelve la tangente de un número.' },
								{ func:'tanh(x)', desc:'Devuelve la tangente hiperbólica de un número.' },
								{ func:'trunc(x)', desc:'Devuelve la parte entera del número x, la eliminación de los dígitos fraccionarios.' }
							]
						}