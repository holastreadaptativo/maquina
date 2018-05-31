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