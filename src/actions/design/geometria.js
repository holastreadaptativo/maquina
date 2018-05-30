import { replace } from 'actions'

export function planoCartesiano(config) 
{
	const { container, params, variables, versions, vt } = config
	const { cols, rows, px1, px2, py1, py2, px3, px4, py3, py4, axisTags, exerciseType } = params

	if (!container) return
	let maxWidth = container.parentElement.offsetWidth, responsive = params.width < maxWidth, vars = vt ? variables : versions, 
		t = exerciseType == 'reflexión' || axisTags == 'no', margin = t ? 0 : 20, p = margin/5, _width = responsive ? params.width : maxWidth - 15, 
		_height = responsive ? params.height : _width, width = t ? _width : _width - margin - p, height = t ? _height : _height - margin - p, 
		h = height/rows, w = width/cols, fx = m => { return (t ? m : m + margin) - w }, fy = m => { return (t ? m : m + p) + h }, 
		r = v => { return replace(v, vars, vt) }

    container.height = _height
    container.width = _width

    let state = {
    	ctx: container.getContext('2d'), h, w, height, width, params, margin, p, x1: fx(r(px1)*w), y1: fy((rows - r(py1) - 1)*h), 
    	x2: fx(r(px2)*w), y2: fy((rows - r(py2) - 1)*h), x3: fx(r(px3)*w), y3: fy((rows - r(py3) - 1)*h), x4: fx(r(px4)*w), y4: fy((rows - r(py4) - 1)*h),
    	arrow: {
    		right: 'https://desarrolloadaptatin.blob.core.windows.net/imagenesprogramacion/Eje_3/Simbolos/flecha_tras_der.svg',
    		left: 'https://desarrolloadaptatin.blob.core.windows.net/imagenesprogramacion/Eje_3/Simbolos/flecha_tras_izq.svg'
    	}
    }

    generarPlanoCartesiano(state)
    generarFigurasGeometricas(state)

    if (params.gridType == 'simbólico') 
    {
    	if (params.exerciseType == 'traslación') { 
    		unirFigurasGeometricas(state) 
    	}
		else { 
			dividirPlanoCartesiano(state) 
		}
    }

	function generarPlanoCartesiano(state) {
		const { ctx, params, height, width, h, w, margin, p } = state

		ctx.clearRect(0, 0, width, height)
		ctx.beginPath()

		for (let x = w + margin; x < width + margin; x += w) {
	     	ctx.moveTo(x, p)
	     	ctx.lineTo(x, height + p)
		}
		for (let y = h; y < height; y += h) {
	    	ctx.moveTo(margin, y + p)
	    	ctx.lineTo(width + margin, y + p)
		}

		if (params.exerciseType == 'traslación' && params.axisTags == 'si') {
			ctx.moveTo(margin, p)
			ctx.lineTo(margin, height + p)
			ctx.lineTo(margin + width, height + p)
			ctx.lineTo(margin + width, p)
			ctx.lineTo(margin, p)

			ctx.textAlign = 'center'
			ctx.textBaseline = 'middle'
			ctx.font = 'bold 13px arial'

			for (let x = w/2 + margin, i = 1; x < width + margin; x += w, i++) {
		     	ctx.fillText(i, x, height + 4*p)
			}
			for (let y = height - h/2, i = 1; y > 0; y -= h, i++) {
		    	ctx.fillText(i, margin/2, y + 2*p - 2)
			}
		}

		ctx.strokeStyle = params.gridColor
		ctx.lineWidth = params.gridWidth

		ctx.stroke()
		ctx.closePath()
	}
	function generarFigurasGeometricas(state) {
		const { ctx, h, w, x1, y1, x2, y2, x3, x4, y3, y4 } = state, red = 'rgba(200, 0, 0, 0.5)', blue = 'rgba(0, 0, 200, 0.5)',
			{ img1, img2, img3, img4, figureType, figureSize, exerciseType, gridType } = params
			
		if (img1 && img1 != '' && (figureType == 'images' || gridType == 'pictórico')) {
			drawImage(x1, y1, 1*w, 1*h, img1, red)

			if (exerciseType == 'traslación' || figureSize >= 2) {
				if (img2 && img2 != '') { drawImage(x2, y2, 1*w, 1*h, img2, blue) } 
				else { drawImage(x2, y2, 1*w, 1*h, img1, blue) }
			} 
			if (exerciseType == 'reflexión') {
				if (figureSize >= 3) {
					if (img3 && img3 != '') { drawImage(x3, y3, 1*w, 1*h, img3, red) } 
					else { drawImage(x3, y3, 1*w, 1*h, img1, red) }
				}
				if (figureSize >= 4) {
					if (img4 && img4 != '') { drawImage(x4, y4, 1*w, 1*h, img4, blue) } 
					else { drawImage(x4, y4, 1*w, 1*h, img1, blue) }
				}
			}
		}
		else {
			fillRect(x1, y1, w, h, red)
			fillRect(x2, y2, w, h, blue)
			if (figureType == 'reflexión') {
				if (figureSize >= 3) { fillRect(x3, y3, w, h, red) }
				if (figureSize >= 4) { fillRect(x4, y4, w, h, blue) }
			}
		}

		function fillRect(x, y, w, h, color) {
			ctx.beginPath()
			ctx.fillStyle = color
			ctx.fillRect(x, y, w, h)
			ctx.closePath()
		}
		function drawImage(x, y, w, h, src, color) {
			ctx.beginPath()
			let image = new Image()
			image.src = src
			image.onload = () => { ctx.drawImage(image, x, y, w, h) }
			image.onerror = () => { fillRect(x, y, w, h, color) }
			ctx.closePath()
		}
	}
	function unirFigurasGeometricas(state) {
		const { ctx, h, w, x1, y1, x2, y2, arrow } = state, rad = Math.PI/180

		ctx.beginPath()

		let k = x1 < x2 ? 1 : -1, i = y1 < y2 ? 1 : -1
		for (let x = x1; x < x2 + (k < 1 ? 1 : 0); x += k*w) {
			let img = new Image()
			img.src = arrow.right
			
			if (k == 1) {
				img.onload = () => { 
					ctx.drawImage(img, x + w/10, y1 - h/(2.5), w*.8, h/3)
				}
			} 
			else {
				if (i != 1) {
					img.onload = () => { 
						ctx.save()
						ctx.translate(x - w/10, y1 + h/(2.5))
						ctx.rotate(rad*180)
						ctx.drawImage(img, 0, 0, w*.8, h/3)
						ctx.restore()
						ctx.save()
					}
				} else {
					img.src = arrow.left
					img.onload = () => { 
						ctx.save()
						ctx.translate(x + w/10 - w, y1 - h/(2.5))
						ctx.drawImage(img, 0, 0, w*.8, h/3)
						ctx.restore()
						ctx.save()
					}
				}
			}
		}
		for (let y = y1; i*y < i*y2; y += i*h) {
			let img = new Image()
			img.src = arrow.right
			
			if (i == 1) {  
				if (k == 1) {
					if (i*y > i*y2) { return false }
					img.onload = () => { 
						ctx.save()
						ctx.translate(x2 + w/(2.5), y + h/10)  
						ctx.rotate(rad*90)
						ctx.drawImage(img, 0, 0, w*.8, h/3)
						ctx.restore()
						ctx.save()
					}             
				} 
				else {
					img.src = arrow.left
					img.onload = () => { 
						ctx.save()
						ctx.translate(x2 - w/(2.5), y - h/10 + h)  
						ctx.rotate(rad*270)
						ctx.drawImage(img, 0, 0, w*.8, h/3)
						ctx.restore()
						ctx.save()
					}
				}
			} 
			else { 
				img.onload = () => { 
					ctx.save()
					ctx.translate(x2 - w/(2.5), y - h/10)  
					ctx.rotate(rad*270)
					ctx.drawImage(img, 0, 0, w*.8, h/3)
					ctx.restore()
					ctx.save()
				}
			}
		}

		ctx.closePath()
		ctx.restore()
		ctx.save()
	}
	function dividirPlanoCartesiano(state) {
		const { ctx, height, width } = state

		ctx.beginPath()
	   	ctx.strokeStyle = params.axisColor
	   	ctx.lineWidth = params.axisWidth

	   	switch (params.axisOrientation) {
	   		case 'vertical': {
		   		ctx.moveTo(width/2, 0)
				ctx.lineTo(width/2, height)
				break
			}
			case 'horizontal': {
				ctx.moveTo(0, height/2)
				ctx.lineTo(width, height/2)
				break
			}
			case 'descendente': {
				ctx.moveTo(0, 0)
				ctx.lineTo(width, height)
				break
			}
			case 'ascendente': {
				ctx.moveTo(width, 0)
				ctx.lineTo(0, height)
				break
			}
	   	}

	   	ctx.stroke()
		ctx.closePath()
	}
}

/////////////////////////////////////////////////////////////////////////////////////////

//  function planoCartesianoX() { 

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