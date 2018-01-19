


export function generarPlanoCartesiano(canvas, state) {

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

	ctx.strokeStyle = state.grid
	ctx.lineWidth = 1

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