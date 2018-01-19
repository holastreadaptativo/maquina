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

export function generarCuadradosUnidos(canvas, state) {

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