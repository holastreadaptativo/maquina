export function generarEjes(canvas, state) {

	let ctx = canvas.getContext('2d')

	const { axis, chart, font, title } = state
	const { height, width } = state.canvas
	const { x, y } = chart.margin 
	const { padding } = chart

	ctx.beginPath()
	ctx.moveTo(x, y - 2*padding.y)
	ctx.lineTo(x, height - y) //EJE VERTICAL
	ctx.lineTo(width - x + 2*padding.x, height - y) //EJE HORIZONTAL

	ctx.lineWidth = axis.width
	ctx.strokeStyle = axis.color
	ctx.stroke()

	ctx.textAlign = font.align
	ctx.font = font.size + 'px ' + font.family
	ctx.fillText(axis.title_x, width/2, height - x/2 + font.size - 20) //INSERTAR TITULO X

	ctx.rotate(3*Math.PI/2)
	ctx.fillText(axis.title_y, - height/2, y/2 - font.size) //INSERTAR TITULO Y

	ctx.rotate(Math.PI/2)
    ctx.fillStyle = title.color
	ctx.font = title.size + 'px ' + font.family
	ctx.fillText(title.value, width/2, 42) //INSERTAR TITULO

	ctx.closePath()
}
export function generarColumnas(data, state) {

    const { canvas, chart } = state
    const { dx, dy, height, len, max, width, x0, y0 } = data
    const { ctx } = canvas

    ctx.beginPath()
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    ctx.fillStyle = chart.color[0]

    if (chart.position == 'vertical') 
    {
        for (let i = 0, x = data.cx; i < len; i++, x += width/len) {
            let dy = height/max * chart.values[i], y = y0 - dy //TAMAÑO DE LA COLUMNA
            ctx.fillRect(x, y, dx, dy) //DIBUJAR COLUMNA      
            ctx.moveTo(x, y0) 
            ctx.lineTo(x, y)
            ctx.lineTo(x + dx, y)
            ctx.lineTo(x + dx, y0) //BORDES COLUMNA
        }
    } 
    else 
    {
        for (let i = 0, y = data.cy; i < len; i++, y -= height/len) {
            let dx = width/max * chart.values[i], x = x0 //TAMAÑO DE LA COLUMNA
            ctx.fillRect(x, y, dx, dy) //DIBUJAR COLUMNA
            ctx.moveTo(x, y) 
            ctx.lineTo(x + dx, y)
            ctx.lineTo(x + dx, y + dy)
            ctx.lineTo(x, y + dy) //BORDES COLUMNA
        }
    }

    ctx.strokeStyle = chart.border.color
    ctx.lineWidth = chart.border.width
    ctx.stroke()
    ctx.closePath()
}
export function proyectarColumnas(data, state) {

    const { chart, line } = state
    const { ctx, height, len, max, width, x0, y0 } = data
   
    ctx.beginPath()
    if (chart.position == 'vertical') 
    {
        for (let i = 0, x = data.cx; i < len; i++, x += width/len) {
            let dy = height/max * chart.values[i], y = y0 - dy //TAMAÑO DE LA COLUMNA
            ctx.moveTo(x0, y) 
            ctx.lineTo(x, y) //PROYECCION COLUMNA
        }
    }
    else
    {
        for (let i = 0, y = data.cy; i < len; i++, y -= height/len) {
            let dx = width/max * chart.values[i], x = x0 //TAMAÑO DE LA COLUMNA
            ctx.moveTo(x + dx, y0) 
            ctx.lineTo(x + dx, y) //PROYECCION COLUMNA
        }
    }

    ctx.strokeStyle = line.color
    ctx.setLineDash([5, 1])
    ctx.lineWidth = line.width
    ctx.stroke()
    ctx.closePath()
}
export function insertarTextos(data, state) {

    const { chart, font } = state
    const { ctx, dx, dy, height, len, max, width, x0, y0 } = data
    
    ctx.beginPath()
    ctx.font = font.size + 'px ' + font.family
    ctx.fillStyle = font.color

    if (chart.position == 'vertical') 
    {
        ctx.textAlign = 'right'
        for (let i = 0; i < len; i++) {
            let dy = height/max * chart.values[i], y = y0 - dy //TAMAÑO DE LA COLUMNA
            ctx.fillText(chart.values[i], x0 - 5, y + 5) //INSERTAR TEXTO
        }

        ctx.textAlign = font.align    
        for (let i = 0, x = data.cx + dx/2; i < len; i++, x += width/len) {
            ctx.fillText(chart.tags.length > i ? chart.tags[i] : '', x, y0 + font.size + 5) //INSERTAR TEXTO
        }
    }
    else 
    {
        ctx.textAlign = font.align
        for (let i = 0; i < len; i++) {
            let dx = width/max * chart.values[i], x = x0 + dx //TAMAÑO DE LA COLUMNA
            ctx.fillText(chart.values[i], x, y0 + font.size + 5) //INSERTAR TEXTO
        }

        ctx.textAlign = 'right'
        for (let i = 0, y = data.cy; i < len; i++, y-= height/len) {
            ctx.fillText(chart.tags.length > i ? chart.tags[i] : '', x0 - 5, y + dy/2 + 5) //INSERTAR TEXTO
        }
    }

    ctx.closePath()
}