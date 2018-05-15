export function planoCartesiano(config) 
{
	const { container, params } = config
	const { exerType } = params

	generarPlanoCartesiano(container, params)

	if (exerType == 'traslación') {		
		generarCuadradosUnidos(container, params)
	} else {
		dividirPlanoCartesiano(container, params)
		reflejarCuadrado(container, params)  
	}
}

function generarPlanoCartesiano(canvas, state) {

	canvas.width = state.width; canvas.height = state.height
	let ctx = canvas.getContext('2d'), w = state.width/state.cols, h = state.height/state.rows
	ctx.clearRect(0, 0, state.width, state.height)

	ctx.beginPath()

	for (let x = w; x < state.width; x += w) {
     	ctx.moveTo(x, 0); ctx.lineTo(x, state.height)
	}
	for (let y = h; y < state.height; y += h) {
    	ctx.moveTo(0, y); ctx.lineTo(state.width, y)
	}	

	ctx.strokeStyle = state.gridColor
	ctx.lineWidth = state.gridWidth

	ctx.stroke()
	ctx.closePath()
}

export function dividirPlanoCartesiano(canvas, state) {

	let ctx = canvas.getContext('2d')	
	
	ctx.beginPath()
   	ctx.strokeStyle = 'orange'
   	ctx.lineWidth = 3

   	switch(state.line) {
   		case 0: {
	   		ctx.moveTo(state.width/2, 0)
			ctx.lineTo(state.width/2, state.height)
			break
		}
		case 1: {
			ctx.moveTo(0, state.height/2)
			ctx.lineTo(state.width, state.height/2)
			break
		}
		case 2: {
			ctx.moveTo(0, 0)
			ctx.lineTo(state.width, state.height)
			break
		}
		case 3: {
			ctx.moveTo(state.width, 0)
			ctx.lineTo(0, state.height)
			break
		}
   	}

	ctx.stroke()
	ctx.closePath()
}

export function reflejarCuadrado(canvas, state) {

	let ctx = canvas.getContext('2d'), red = 'rgba(200, 0, 0, 0.5)', blue = 'rgba(0, 0, 200, 0.5)'
	let w = state.width/state.cols, h = state.height/state.rows, ax, ay, bx, by

	ctx.beginPath()
	ctx.fillStyle = red

	switch(state.line) {
		case 0: {
			ax = Math.floor(Math.random()*state.cols/2)*w
			ay = Math.floor(Math.random()*state.rows)*h
			ctx.fillRect(ax, ay, w, h)
			ctx.fillStyle = blue
			bx = state.width - ax - w
			ctx.fillRect(bx, ay, w, h)
			break
		}
		case 1: {
			ax = Math.floor(Math.random()*state.cols)*w
			ay = Math.floor(Math.random()*state.rows/2)*h
			ctx.fillRect(ax, ay, w, h)
			ctx.fillStyle = blue
			by = state.height - ay - h
			ctx.fillRect(ax, by, w, h)
			break
		}
		case 2: {
			ax = Math.floor(Math.random()*state.cols/2)*w
			ay = Math.floor((Math.random() + 1)*state.rows/2)*h
			ctx.fillRect(ax, ay, w, h)
			ctx.fillStyle = blue
			bx = ay
			by = ax
			ctx.fillRect(bx, by, w, h)
			break
		}
		case 3: {
			ax = Math.floor(Math.random()*state.cols/2)*w
			ay = Math.floor(Math.random()*state.rows/2)*h
			ctx.fillRect(ax, ay, w, h)
			ctx.fillStyle = blue
			bx = state.height - ay - h
			by = state.width - ax - w
			ctx.fillRect(bx, by, w, h)
			break
		}
	}
	
	ctx.closePath()
}

function generarCuadradosUnidos(canvas, state) {

	let ctx = canvas.getContext('2d'), red = 'rgba(200, 0, 0, 0.5)', blue = 'rgba(0, 0, 200, 0.5)', green = 'darkgreen'
	let w = state.width/state.cols, h = state.height/state.rows, headlen = w/3, ax, ay, bx, by, fx, fy, tx, ty, rad = Math.PI/180

	ctx.beginPath()
	ctx.fillStyle = red
	ax = Math.floor(Math.random()*state.cols)*w
	ay = Math.floor(Math.random()*state.rows)*h
	ctx.fillRect(ax, ay, w, h)	

	ctx.fillStyle = blue
	bx = Math.floor(Math.random()*state.cols)*w
	by = Math.floor(Math.random()*state.rows)*h
	ctx.fillRect(bx, by, w, h)
	ctx.closePath()

	if (ax < bx) { fx = ax; tx = bx; fy = ay; ty = by; } 
   	else { fx = bx; tx = ax; fy = by; ty = ay; }

   	ctx.beginPath()
	ctx.strokeStyle = green
	for (let x = fx, a = Math.atan2(0, w); x < tx; x += w) {
		ctx.moveTo(x, fy); ctx.arc(x + w/2, fy + h/2 - 3, 220/320*w, 220*rad, 320*rad, false)
		ctx.lineTo(x + w - headlen * Math.cos(a + Math.PI/24), fy - headlen * Math.sin(a + Math.PI/24))
		ctx.moveTo(x + w, fy)
		ctx.lineTo(x + w - headlen * Math.cos(a + Math.PI/2), fy - headlen * Math.sin(a + Math.PI/2))
	}
	let i = fy < ty ? 1 : -1
	for (let y = fy, a = Math.atan2(h, 0); i*y < i*ty; y += i*h) {
		ctx.moveTo(tx, y + i*h)
		ctx.moveTo(tx, y + i*h)
		ctx.lineTo(tx - headlen * Math.cos(a + i*Math.PI/2), y + i*h - i*headlen * Math.sin(a + i*Math.PI/2)) 
		ctx.moveTo(tx, y + i*h)
		ctx.lineTo(tx - headlen * Math.cos(a + i*Math.PI/24), y + i*h - i*headlen * Math.sin(a + i*Math.PI/24))
		ctx.moveTo(tx, y); ctx.arc(tx - i*w/2 + i*3, y + i*h/2, 220/320*w, (i > 0 ? 310 : 130)*rad, (i > 0 ? 50 : 230)*rad, false)
	}
	ctx.stroke()
	ctx.closePath()
}

/////////////////////////////////////////////////////////////////////////////////////////


// function planoCartesianoX() { 

// 	let clase = $(".plano-r1").attr('class','text-center')  
// 	clase.each((index, item) => {
// 			$(item).find(".txtRef").remove();
// 			let id = $(item).attr("id").split('htmlPlano')[1]
// 			let plano = $("#htmlPlano"+id)     
// 			let state = {
// 					height:Number.parseInt(plano.attr("alto")),
// 					width:Number.parseInt(plano.attr("ancho")),
// 					rows:Number.parseInt(plano.attr("filas")),
// 					cols:Number.parseInt(plano.attr("columnas")),
// 					background:plano.attr("fondo"),
// 					gridColor:plano.attr("malla"),
// 					fontColor:plano.attr("letra"),
// 					cx1:Number.parseInt(plano.attr("coordx1")),
// 					cy1:Number.parseInt(plano.attr("coordy1")),
// 					color1:plano.attr("roundcolor1"),
// 					cx2:Number.parseInt(plano.attr("coordx2")),
// 					cy2:Number.parseInt(plano.attr("coordy2")),
// 					color2:plano.attr("roundcolor2"),
// 					cx3:Number.parseInt(plano.attr("coordx3")),
// 					cy3:Number.parseInt(plano.attr("coordy3")),
// 					color3:plano.attr("roundcolor3"),
// 					cx4:Number.parseInt(plano.attr("coordx4")),
// 					cy4:Number.parseInt(plano.attr("coordy4")),
// 					color4:plano.attr("roundcolor4"),
// 					lineColor:plano.attr("linea"),
// 					lineWidth:plano.attr("lineagrosor"),
// 					line:Number.parseInt(plano.attr("lineaposicion")),
// 					borderWidth:plano.attr("bordegrosor"),
// 					borderRadius:plano.attr("borderadio"),
// 					border:plano.attr("borde"),
// 					image1:plano.attr("imagen1"),
// 					image2:plano.attr("imagen2"),
// 					image3:plano.attr("imagen3"),
// 					image4:plano.attr("imagen4"),
// 					image5:plano.attr("imagen5"),
// 					image6:plano.attr("imagen6"),
// 					selection:plano.attr("ejercicio"),
// 					imageHeight:Number.parseInt(plano.attr("imagenalto")),
// 					imageWidth:Number.parseInt(plano.attr("imagenancho")),
// 					iniciox1:Number.parseInt(plano.attr("iniciox1")),
// 					inicioy1:Number.parseInt(plano.attr("inicioy1")),
// 					finx1:Number.parseInt(plano.attr("finx1")),
// 					finy1:Number.parseInt(plano.attr("finy1")),
// 					arrowColor:plano.attr("flecha"),
// 					arrowWidth:parseInt(plano.attr("flechaancho")),
// 					hasArrow:plano.attr("conflecha"),
// 					imageHeight2:Number.parseInt(plano.attr("imagenalto2")),
// 					imageWidth2:Number.parseInt(plano.attr("imagenancho2")),
// 					flechaDerecha: eval(plano.attr("sentidoderechaflecha")),
// 					flechaArriba: eval(plano.attr("sentidoarribaflecha"))
// 			};

// 			if (state.selection == 1) {
// 				state.imageHeight2 = Number.parseInt(plano.attr("imagenalto"));
// 				state.imageWidth2 = Number.parseInt(plano.attr("imagenancho"));
// 			}

// 			let html = '<canvas id="canvas'+id+'" style="border:'+(state.selection == 1 ? state.borderWidth : 0)+'px solid '+state.border+'; border-radius:'+(state.selection == 1 ? state.borderRadius : 0)+'px; margin: 0 auto; background: '+state.background+'";></canvas>';
// 			 plano.append(html);

// 			let canvas = $("#canvas"+id)[0]
// 			generarPlanoCartesiano(canvas, state);

// 			switch(Number.parseInt(state.selection)) {
// 					case 1: {
// 							reflejarCuadrado(canvas, state);
// 							dividirPlanoCartesiano(canvas, state);
// 							break;
// 					}
// 					case 2: {
// 							generarCoordenadas(canvas, state);
// 							generarCuadradosUnidos(canvas, state);
// 							break;
// 					}
// 			}
// 	})
// };

// function generarPlanoCartesiano(canvas, state) {
// canvas.width = state.width; canvas.height = state.height
// let ctx = canvas.getContext('2d'), w = state.width/state.cols, h = state.height/state.rows
// ctx.clearRect(0, 0, state.width, state.height)
// ctx.save()

// 	if (state.selection == 2) {
// 			w = state.width/(state.cols + 1), h = state.height/(state.rows + 1)
// 	} else {
// 		if (state.line == 1) {
// 			w = state.width/state.cols + state.lineWidth/state.cols
// 		} else if (state.line == 0) {
// 			h = state.height/state.rows + state.lineWidth/state.cols
// 		}
// 	}
	
// 	for (let x = w; x < state.width; x += w) {
// 		if (x > (state.cols/2 - 1)*w && x < (state.cols/2 + 1)*w) {
// 			ctx.beginPath()
// 			ctx.strokeStyle = state.gridColor
// 			ctx.lineWidth = state.lineWidth
// 			ctx.moveTo(x, 0); ctx.lineTo(x, state.height - (state.selection == 2 ? h : 0))
// 			ctx.stroke()
// 			ctx.closePath()
// 		} else {
// 			ctx.beginPath()
// 			ctx.strokeStyle = state.gridColor
// 			ctx.lineWidth = 2
// 			ctx.moveTo(x, 0); ctx.lineTo(x, state.height - (state.selection == 2 ? h : 0))
// 			ctx.stroke()
// 			ctx.closePath()
// 		}
// 	}
// 	for (let y = h; y < state.height; y += h) {
// 		if (y > (state.rows/2 - 1)*h && y < (state.rows/2 + 1)*h) {
// 			ctx.beginPath()
// 			ctx.strokeStyle = state.gridColor
// 			ctx.lineWidth = state.lineWidth
// 			ctx.moveTo((state.selection == 2 ? w : 0), y); ctx.lineTo(state.width, y)
// 			ctx.stroke()
// 			ctx.closePath()
// 		} else {
// 			ctx.beginPath()
// 			ctx.strokeStyle = state.gridColor
// 			ctx.lineWidth = 2
// 			ctx.moveTo((state.selection == 2 ? w : 0), y); ctx.lineTo(state.width, y)
// 			ctx.stroke()
// 			ctx.closePath()
// 		}
// 	}   

// 	ctx.restore()
// 	ctx.save()
// }

// function dividirPlanoCartesiano(canvas, state) {

// 	let ctx = canvas.getContext('2d')   
	
// 	ctx.beginPath()
// 	ctx.strokeStyle = state.lineColor
// 	ctx.lineWidth = state.lineWidth

// 	switch(state.line) {
// 			case 0: {
// 				ctx.moveTo(0, state.height/2)
// 				ctx.lineTo(state.width, state.height/2)
// 				break
// 			}
// 			case 1: {
// 					ctx.moveTo(state.width/2, 0)
// 					ctx.lineTo(state.width/2, state.height)
// 					break
// 			}
// 			case 2: {
// 					ctx.moveTo(state.width, 0)
// 					ctx.lineTo(0, state.height)
// 					break
// 			}
// 			case 3: {
// 					ctx.moveTo(0, 0)
// 					ctx.lineTo(state.width, state.height)
// 					break
// 			}
// 	}

// 	ctx.stroke()
// 	ctx.closePath()
// }

// function reflejarCuadrado(canvas, state) {

// let ctx = canvas.getContext('2d');
// let w = state.width/state.cols, h = state.height/state.rows, ax, ay, bx, by

// state.cx1 > 0 ? state.cx1 = (state.cx1 - 1) : state.cx1;
// state.cy1 > 0 ? state.cy1 = (state.cy1) : state.cy1 = state.cy1 + 1;

// state.cx2 > 0 ? state.cx2 = (state.cx2 - 1) : state.cx2;
// state.cy2 > 0 ? state.cy2 = (state.cy2) : state.cy2 = state.cy2 + 1;

// state.cx3 > 0 ? state.cx3 = (state.cx3 - 1) : state.cx3;
// state.cy3 > 0 ? state.cy3 = (state.cy3) : state.cy3 = state.cy3 + 1;

// state.cx4 > 0 ? state.cx4 = (state.cx4 - 1) : state.cx4;
// state.cy4 > 0 ? state.cy4 = (state.cy4) : state.cy4 = state.cy4 + 1;

// ctx.beginPath()

// wCX1 = w; wCX2 = w; wCX3 = w; wCX4 = w;
// hCY1 = h; hCY2 = h; hCY3 = h; hCY4 = h;

// if (state.line == 0) {
// 	if (state.cy2 >= 1) {
// 		console.log(state.cy2)
// 	}
// 	state.cy1 >= 1 ? hCY1 = h - 0.85 : hCY1 = h + 0.74;
// 	state.cy2 >= 1 ? hCY2 = h - 0.85 : hCY2 = h + 0.74;
// 	state.cy3 >= 1 ? hCY3 = h - 0.85 : hCY3 = h + 0.74;
// 	state.cy4 >= 1 ? hCY4 = h - 0.85 : hCY4 = h + 0.74;
// } else if (state.line == 1) {
// 	state.cx1 >= 0 ? wCX1 = w + 0.4 : wCX1 = w - 0.9;
// 	state.cx2 >= 0 ? wCX2 = w + 0.4 : wCX2 = w - 0.9;
// 	state.cx3 >= 0 ? wCX3 = w + 0.4 : wCX3 = w - 0.9;
// 	state.cx4 >= 0 ? wCX4 = w + 0.4 : wCX4 = w - 0.9;
// }

// /* ax = (state.cols/2 + state.cx1)*w;				*/ax = (state.cols/2 + state.cx1)*wCX1;
// /* ay = (state.rows/2 - state.cy1 - 1)*h;  	*/ay = (state.rows/2 - state.cy1 - state.imageHeight2 + 1)*hCY1;
// /* bx = (state.cols/2 + state.cx2)*w;				*/bx = (state.cols/2 + state.cx2)*wCX2;
// /* by = (state.rows/2 - state.cy2 - 1)*h;		*/by = (state.rows/2 - state.cy2 - state.imageHeight2 + 1)*hCY2;
// /* cx = (state.cols/2 + state.cx3)*w;				*/cx = (state.cols/2 + state.cx3)*wCX3;
// /* cy = (state.rows/2 - state.cy3 - 1)*h;		*/cy = (state.rows/2 - state.cy3 - state.imageHeight2 + 1)*hCY3;
// /* dx = (state.cols/2 + state.cx4)*w;				*/dx = (state.cols/2 + state.cx4)*wCX4;
// /* dy = (state.rows/2 - state.cy4 - 1)*h;		*/dy = (state.rows/2 - state.cy4 - state.imageHeight2 + 1)*hCY4;


// if (state.image1 && state.image1 != "") {
// 		let img1 = new Image();
// 		img1.src = state.image1;
// 		img1.onload = function() { 
// 				/*ctx.drawImage(img1, ax, ay, w, h); */ctx.drawImage(img1, ax, ay, w*state.imageWidth2, h*state.imageHeight2);
// 		}
// } else {
// 		ctx.fillStyle = state.color1;
// 		/*ctx.fillRect(ax, ay, w, h); */ctx.fillRect(ax, ay, w*state.imageWidth2, h*state.imageHeight2);
// }

// if (state.image2 && state.image2 != "") {
// 		let img2 = new Image();
// 		img2.src = state.image2;
// 		img2.onload = function() {
// 				/*ctx.drawImage(img2, bx, by, w, h); */ctx.drawImage(img2, bx, by, w*state.imageWidth2, h*state.imageHeight2);
// 		}
// } else {
// 		ctx.fillStyle = state.color2;
// 		/*ctx.fillRect(bx, by, w, h); */ctx.fillRect(bx, by, w*state.imageWidth2, h*state.imageHeight2);
// }

// if (state.image5 && state.image5 != "") {
// 	let img3 = new Image();
// 	img3.src = state.image5;
// 	img3.onload = function() {
// 			/*ctx.drawImage(img3, cx, cy, w, h); */ctx.drawImage(img3, cx, cy, w*state.imageWidth2, h*state.imageHeight2);
// 	}
// } else {
// 	state.color3 != '' ? ctx.fillStyle = state.color3 : ctx.fillStyle = 'rgba(255, 255, 255, 0.0)';
// 		/*ctx.fillRect(cx, cy, w, h); */ctx.fillRect(cx, cy, w*state.imageWidth2, h*state.imageHeight2);
// }

// if (state.image6 && state.image6 != "") {
// 	let img4 = new Image();
// 	img4.src = state.image6;
// 	img4.onload = function() {
// 			/*ctx.drawImage(img4, dx, dy, w, h); */ctx.drawImage(img4, dx, dy, w*state.imageWidth2, h*state.imageHeight2);
// 	}
// } else {
// 	state.color4 != '' ? ctx.fillStyle = state.color4 : ctx.fillStyle = 'rgba(255, 255, 255, 0.0)';
// 	/*ctx.fillRect(dx, dy, w, h); */ctx.fillRect(dx, dy, w*state.imageWidth2, h*state.imageHeight2);
// }

// ctx.closePath()
// }

// function generarCuadradosUnidos(canvas, state) {

// let ctx = canvas.getContext('2d'), red = 'rgba(200, 0, 0, 0.5)', blue = 'rgba(0, 0, 200, 0.5)', green = 'darkgreen'
// let w = state.width/(state.cols + 1), h = state.height/(state.rows + 1), headlen = w*1/6, ax, ay, bx, by, fx, fy, tx, ty, rad = Math.PI/180

// ctx.beginPath()

// ax = state.iniciox1*w; //Math.floor(Math.random()*state.cols)*w
// ay = (state.rows - state.inicioy1 - state.imageHeight + 1)*h; //Math.floor(Math.random()*state.rows)*h
// bx = state.finx1*w //Math.floor(Math.random()*state.cols)*w
// by = (state.rows - state.finy1 - state.imageHeight + 1)*h //Math.floor(Math.random()*state.rows)*h

// if (state.image3 && state.image4 && state.image3 != "" && state.image4 != "") {
// 		let img3 = new Image();
// 		img3.src = state.image3;
// 		img3.onload = function() { 
// 				ctx.drawImage(img3, ax, ay, state.imageWidth*w, state.imageHeight*h);
// 		}
// 		let img4 = new Image();
// 		img4.src = state.image4;
// 		img4.onload = function() { 
// 				ctx.drawImage(img4, bx, by, state.imageWidth*w, state.imageHeight*h);
// 		}
// } else {
// 		ctx.fillStyle = red;
// 		ctx.fillRect(ax, ay, state.imageWidth*w, state.imageHeight*h);
// 		ctx.fillStyle = blue;
// 		ctx.fillRect(bx, by, state.imageWidth*w, state.imageHeight*h);
// }

// ctx.closePath()
// ctx.save()

// fx = ax; tx = bx; 
// fy = ay; ty = by; 

// if (fx < tx) {
// 		//fx += state.imageWidth*w
// 		//tx += state.imageWidth*w
// }

// // Generar Flechas
// if (state.hasArrow == 1) {
// 		ctx.beginPath()
// 		ctx.strokeStyle = state.arrowColor
// 		ctx.lineWidth = 1 //state.arrowWidth

// 		//https://goo.gl/SuHQRH     
// 		// FLechas Horizontales
// 		let k = fx < tx ? 1 : -1, i = fy < ty ? 1 : -1
// 		for (let x = fx, a = Math.atan2(0, w); k*x < k*(tx + (k < 1 ? 1 : 0)); x += k*w) 
// 		{
// 				let img = new Image()
// 				img.src = 'https://desarrolloadaptatin.blob.core.windows.net/imagenesprogramacion/Eje_3/Simbolos/flecha_tras_der.svg'
// 				if (k == 1) {
// 					img.onload = function() { 
// 						ctx.drawImage(img, x + w/10, fy - h/(2.5), w*.8, h/3)
// 					}
// 				} else {
// 						if (i != 1) {
// 								img.onload = function() { 
// 										ctx.save()
// 										ctx.translate(x - w/10, fy + h/(2.5))
// 										ctx.rotate(rad*180)
// 										ctx.drawImage(img, 0, 0, w*.8, h/3)
// 										ctx.restore()
// 										ctx.save()
// 								}
// 						} else {
// 								img.src = 'https://desarrolloadaptatin.blob.core.windows.net/imagenesprogramacion/Eje_3/Simbolos/flecha_tras_izq.svg'
// 								img.onload = function() { 
// 										ctx.save()
// 										ctx.translate(x + w/10 - w, fy - h/(2.5))
// 										ctx.drawImage(img, 0, 0, w*.8, h/3)
// 										ctx.restore()
// 										ctx.save()
// 								}
// 						}
// 				}
// 		}
// 		// FLechas Verticales
// 		for (let y = fy, a = Math.atan2(h, 0); i*y < i*ty; y += i*h) {
// 				let img = new Image()
// 				img.src = 'https://desarrolloadaptatin.blob.core.windows.net/imagenesprogramacion/Eje_3/Simbolos/flecha_tras_der.svg'
// 				if (i == 1) {  
// 						if (k == 1) {
// 							if (i*y > i*ty /*- i*h*/) {
// 								return false;
// 							}
// 								img.onload = function() { 
// 										ctx.save()
// 										ctx.translate(tx + w/(2.5), y + h/10)  
// 										ctx.rotate(rad*90)
// 										ctx.drawImage(img, 0, 0, w*.8, h/3)
// 										ctx.restore()
// 										ctx.save()
// 								}             
// 						} else {
// 								img.src = 'https://desarrolloadaptatin.blob.core.windows.net/imagenesprogramacion/Eje_3/Simbolos/flecha_tras_izq.svg'
// 								img.onload = function() { 
// 										ctx.save()
// 										ctx.translate(tx - w/(2.5), y - h/10 + h)  
// 										ctx.rotate(rad*270)
// 										ctx.drawImage(img, 0, 0, w*.8, h/3)
// 										ctx.restore()
// 										ctx.save()
// 								}
// 						}
// 				} else {                 
// 						img.onload = function() { 
// 								ctx.save()
// 								ctx.translate(tx - w/(2.5), y - h/10)  
// 								ctx.rotate(rad*270)
// 								ctx.drawImage(img, 0, 0, w*.8, h/3)
// 								ctx.restore()
// 								ctx.save()
// 						}
// 				}
// 		}
		
// 		ctx.stroke()
// 		ctx.closePath()
// 		ctx.restore()
// 		ctx.save()
// }    
// }

// function generarCoordenadas(canvas, state) {

// 	let ctx = canvas.getContext('2d'), w = state.width/(state.cols + 1), h = state.height/(state.rows + 1)

// 	ctx.beginPath()
// 	ctx.font = "" + w*31/45 + "px Larke Neue Thin"
// 	ctx.fillStyle = state.fontColor
// 	ctx.textAlign = "center"

// 	for (let i = 3*w/2, j = 0; i < state.width; i += w, j++)
// 			ctx.fillText(String.fromCharCode(65 + j), i, state.height - w/4)

// 	for (let i = state.height - w - w/8, j = 0; i > 0; i-= h, j++)
// 			 ctx.fillText(j + 1, w/2, i - 3)

// 	ctx.closePath()
// 	ctx.beginPath()

// 	ctx.strokeStyle = state.background
// 	ctx.lineWidth = 5

// 	ctx.moveTo(w, 0)
// 	ctx.lineTo(w, state.height)
// 	ctx.moveTo(state.width, 0)
// 	ctx.lineTo(state.width, state.height)
// 	ctx.moveTo(w, state.height - h)
// 	ctx.lineTo(state.width, state.height - h)
// 	ctx.moveTo(w, state.height)
// 	ctx.lineTo(state.width, state.height)

// 	ctx.stroke()

// 	ctx.closePath()
	
// 	if (state.borderWidth != 0) {
// 		ctx.beginPath()

// 		ctx.strokeStyle = state.border
// 		ctx.lineWidth = state.borderWidth

// 		if (state.borderRadius != 0) {
// 			ctx.moveTo(w, h)
// 			ctx.lineTo(w, state.height - 2*h)
// 			ctx.arc(2*w, h, w, 1*Math.PI, 1.5*Math.PI)
	
// 			ctx.moveTo(2*w, state.height - h)
// 			ctx.lineTo(state.width - w, state.height - h)
// 			ctx.arc(2*w, state.height - 2*h, w, 0.5*Math.PI, 1*Math.PI)
	
// 			ctx.moveTo(state.width - 1, h)
// 			ctx.lineTo(state.width - 1, state.height - 2*h)
// 			ctx.arc(state.width - w, state.height - 2*h, w, 0*Math.PI, 0.5*Math.PI)
	
// 			ctx.moveTo(2*w, 1)
// 			ctx.lineTo(state.width - w, 1)
// 			ctx.arc(state.width - w, h, w, 1.5*Math.PI, 0*Math.PI)
// 		} else {

// 			ctx.moveTo(w, state.borderWidth/2)
// 			ctx.lineTo(w, state.height-h)
// 			ctx.lineTo(state.width, state.height-h)
// 			ctx.lineTo(state.width - state.borderWidth/2, state.borderWidth/2)
// 			ctx.lineTo(w, state.borderWidth/2)
// 		}

	

// 		ctx.stroke()
// 		ctx.closePath()
// 	}

// }