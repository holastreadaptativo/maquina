import { replace } from 'actions'

export function graficoDatos(config) 
{
    const { container, params, variables, versions, vt } = config
    const { axisColor, axisWidth, borderColor, borderRadius, borderWidth, background, fontColor, /*extra,*/ lineColor, lineWidth, chartBorder,
        chartPosition, chartColor, chartValues, chartTags, titleValue, titleSize, titleColor, axisTitleX, axisTitleY, margin, titleTop, fontSize,
        scaleMax, scaleMin, scaleInterval, scaleColor, scaleWidth, dataTag, withArrowsX, withArrowsY, limitVal, projectionVal, highlightBar, fontFamily } = params

    if (!container) return
    let maxWidth = container.parentElement.offsetWidth, responsive = params.width < maxWidth,
        width = responsive ? params.width : maxWidth - 15, height = responsive ? params.height : width

    container.width = width
    container.height = height

    let vars = vt ? variables : versions
    let values = replace(chartValues, vars, vt).split(',')
    let state = {
        axis: {
            color: axisColor, 
            scale: 'auto', 
            title_x: axisTitleX, 
            title_y: axisTitleY, 
            width: axisWidth
        },
        border: {
            width: borderWidth,
            style:'solid',
            color: borderColor,
            radius: borderRadius,
            margin:margin
        },
        canvas: {
            color: background,
            context: container.getContext('2d'),
            height: height,
            width: width,
            ctx: container.getContext('2d')
        },
        chart: {
            border: {
                color: chartBorder,
                width: 2
            }, 
            color: chartColor.split(','),
            length: values.length,
            margin: { x:container.width*0.15, y:container.width*0.15 },
            padding: { x:container.height*0.03, y:container.height*0.03 }, 
            position: chartPosition, 
            values: values,
            tags: replace(chartTags, vars, vt).split(','),
            dataTag: replace(dataTag, vars, vt).split(','),
            withArrowsX: withArrowsX == 'si' ? true : false,
            withArrowsY: withArrowsY == 'si' ? true : false
        },
        extra:{
            limit: true,
            projection: true,
            limitVal: replace(limitVal, vars, vt).split(','),
            highlightBar: highlightBar ? highlightBar.split(',') : '',
            projectionVal: replace(projectionVal, vars, vt).split(',')
        },
        font: {
            align: 'center',
            color: fontColor,
            family: fontFamily,
            size: fontSize
        },
        line: {
            color: lineColor,
            value: 10, 
            width: lineWidth
        },
        scale: {
            max:Number(scaleMax),
            min:Number(scaleMin),
            interval:Number(scaleInterval),
            color:scaleColor,
            width:scaleWidth
        },
        title: {
            color: titleColor,
            size: titleSize,
            value: titleValue,
            top:titleTop
        }
    }

    let anchoTag = []
    state.chart.tags.map(tag => {
        anchoTag.push(state.canvas.ctx.measureText(tag).width)
    })
    anchoTag = Math.max(...anchoTag)
    
    const { chart, canvas } = state
    chart.position == 'horizontal' ? chart.margin.x += anchoTag : false 
    let { x, y } = chart.margin

    let data = {
        ctx: canvas.ctx, height: canvas.height - 2*y, len: chart.length, 
        max: Math.max(...chart.values), width: canvas.width - 2*(x+10), x0: x, y0: canvas.height - y,
        dx: Math.min(Math.floor((canvas.width - 2*(x))/(3/2*chart.length)), 100),
        dy: Math.min(Math.floor((canvas.height - 2*(y))/(4/3*chart.length)), 60)
    }

    state.canvas.ctx.font = state.font.size + 'px ' + state.font.family

    data.cx = data.x0 + 2*chart.padding.x + data.width/data.len/2 - data.dx/2
    data.cy = data.y0 - chart.padding.y - data.height/data.len/2 - data.dy/2    

    data.ctx.translate(0, canvas.margin == 'si' ? 0 : 10)
    data.ctx.save()

    lineasGuias(data, state)
    generarColumnas(data, state)
    generarEjes(container, state)
    if (state.extra.projection) 
        proyectarColumnas(data, state)
    if (state.extra.limit) 
        limitarColumnas(data, state)
    insertarTextos(data, state)
    insertarValores(data, state)
    insertarTitulos(data, state)
}

function generarEjes(canvas, state) {

    let ctx = canvas.getContext('2d')
    ctx.save()

    const { axis, chart } = state
    const { height, width } = state.canvas
    const { x, y } = chart.margin 
    const { padding } = chart
		
    let x2;
    chart.position == 'vertical' ? x2 = x : x2 = x/2 

    ctx.beginPath()
    ctx.moveTo(x, y - 2*padding.y)
    ctx.lineTo(x, height - y) //EJE VERTICAL
    ctx.lineTo(width - x2 + 2*padding.x, height - y) //EJE HORIZONTAL
    
    if (chart.withArrowsY) {
        //EJE VERTICAL
        ctx.moveTo(x + width/110, y - 2*padding.y + width/110)
        ctx.lineTo(x, y - 2*padding.y)
        ctx.lineTo(x - width/110, y - 2*padding.y + width/110)
    }
    if (chart.withArrowsX) {
        //EJE HORIZONTAL
        ctx.moveTo(width - x2 + 2*padding.x - width/110, height - y - width/110) 
        ctx.lineTo(width - x2 + 2*padding.x, height - y)
        ctx.lineTo(width - x2 + 2*padding.x - width/110, height - y + width/110)
    }

    ctx.lineWidth = axis.width
    ctx.strokeStyle = axis.color
    ctx.stroke()
    ctx.closePath()

    ctx.restore()
    ctx.save()
}
function generarColumnas(data, state) {

    const { canvas, chart, scale, extra } = state
    const { dx, dy, height, len, max, width, x0, y0 } = data
    const { ctx } = canvas
    const limit = Math.max(scale.max, max)

    ctx.save()
    
    let width2;
    if (chart.position != 'vertical') {
        width2 = canvas.width - 2*(chart.margin.x/2+10) - chart.padding.x*2-10
    }

    ctx.beginPath()
    //ctx.clearRect(0, 0, canvas.width, canvas.height)

    extra.highlightBar && resaltarBarras(data, state)

    if (chart.position == 'vertical') {

        ctx.beginPath()
        ctx.fillStyle = chart.color[0]
        for (let i = 0, x = data.cx; i < len; i++, x += width/len) {
            let dy = height/limit * chart.values[i], y = y0 - dy //TAMAÑO DE LA COLUMNA
            ctx.fillRect(x, y, dx, dy) //DIBUJAR COLUMNA      
            ctx.moveTo(x, y0) 
            ctx.lineTo(x, y)
            ctx.lineTo(x + dx, y)
            ctx.lineTo(x + dx, y0) //BORDES COLUMNA
        }
    } 
    else {
        ctx.fillStyle = chart.color[0]
        for (let i = 0, y = data.cy; i < len; i++, y -= height/len) {
            let dx = width2/(limit) * chart.values[i], x = x0 //TAMAÑO DE LA COLUMNA
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

    ctx.restore()
    ctx.save()
}
function proyectarColumnas(data, state) {

    const { chart, line, scale, extra, canvas } = state
    const { ctx, height, len, max, width, x0, y0, dx } = data
    const limit = Math.max(scale.max, max)

    ctx.save()

    let valuesProj = extra.projectionVal

    let width2
    if (chart.position != 'vertical')
        width2 = canvas.width - 2*(chart.margin.x/2+10) - chart.padding.x*2-10

    ctx.beginPath()
    if (chart.position == 'vertical') {
        for (let i = 0, x = data.cx + dx; i < len; i++, x += width/len) {
            if(valuesProj[i] == '0') {
                let dy = height/limit * chart.values[i], y = y0 - dy //TAMAÑO DE LA COLUMNA
                ctx.moveTo(x0, y) 
                ctx.lineTo(x, y) //PROYECCION COLUMNA
            }
        }
    }
    else {
        for (let i = 0, y = data.cy; i < len; i++, y -= height/len) {
            if(valuesProj[i] == '0') {
                let dx = width2/limit * chart.values[i], x = x0 //TAMAÑO DE LA COLUMNA
                ctx.moveTo(x + dx, y0) 
                ctx.lineTo(x + dx, y) //PROYECCION COLUMNA
            }
        }
    }

    ctx.strokeStyle = line.color
    ctx.setLineDash([5, 1])
    ctx.lineWidth = line.width
    ctx.stroke()
    ctx.closePath()

    ctx.restore()
    ctx.save()
}
function limitarColumnas(data, state) {
    const { chart, line, scale, canvas, extra } = state
    const { ctx, height, len, max, width, x0, y0 } = data
    const limit = Math.max(scale.max, max)

    ctx.save()

    let values = extra.limitVal
    let width2
    if (chart.position != 'vertical')
        width2 = canvas.width - 2*(chart.margin.x/2+10) - chart.padding.x*2-10
    if (values.length) {
        ctx.beginPath()
        if (chart.position == 'vertical') {
            for (let i = 0, x = data.cx; i < max; i++, x += width/len) {
                if (true) {
                    let dy = height/limit * values[i], y = y0 - dy //TAMAÑO DE LA COLUMNA
                    ctx.moveTo(x0, y) 
                    ctx.lineTo(canvas.width - chart.margin.x + 2*chart.padding.x, y) //PROYECCION COLUMNA
                }
            }
        }
        else {
            for (let i = 0, y = data.cy; i < max; i++, y -= height/len) {
                if (true) {
                    let dx = width2/(limit) * values[i], x = x0 //TAMAÑO DE LA COLUMNA
                    ctx.moveTo(x + dx, y0) 
                    ctx.lineTo(x + dx,  chart.margin.y - 2*chart.padding.y + canvas.height/110) //PROYECCION COLUMNA
                }
            }
        }
        ctx.strokeStyle = line.color
        ctx.setLineDash([5, 1])
        ctx.lineWidth = line.width
        ctx.stroke()
        ctx.closePath()
    }
    ctx.restore()
    ctx.save()
}
function insertarTextos(data, state) {

    const { chart, font, scale, canvas } = state
    const { ctx, dx, dy, height, len, width, x0, y0, max } = data
    const limit = Math.max(scale.max, max)

    ctx.save()

    let width2 
    if (chart.position != 'vertical')
        width2 = canvas.width - 2*(chart.margin.x/2+10) - chart.padding.x*2-10
    let intervalVal = scale.interval > 0 ? scale.interval : 1 
    // Textos de Tags y Values Begin
    ctx.beginPath()
    if (chart.position == 'vertical') {
        ctx.font = font.size + 'px ' + font.family
        ctx.textAlign = font.align
        ctx.textBaseline = 'top'  
        ctx.fillStyle = font.color
        for (let i = 0, x = data.cx + dx/2; i < len; i++, x += width/len) {
            ctx.fillText(chart.tags.length > i ? chart.tags[i] : '', x, y0*1.02) //INSERTAR TEXTO
        }
        
        ctx.beginPath()
        ctx.font = font.size + 'px ' + font.family
        ctx.textAlign = 'right'
        ctx.textBaseline = 'alphabetic'
        ctx.fillStyle = font.color
        for (let i = scale.min; i <= limit; i += intervalVal) {
            let dy = height/limit * i, y = y0 - dy //TAMAÑO DE LA COLUMNA
            ctx.fillText(i, x0 - 7, y + 5) //INSERTAR TEXTO
        }
        ctx.closePath()
    } else {
        ctx.font = font.size + 'px ' + font.family
        ctx.textAlign = 'right'
        ctx.textBaseline = 'alphabetic'
        ctx.fillStyle = font.color
        for (let i = 0, y = data.cy; i < len; i++, y-= height/len) {
            ctx.fillText(chart.tags.length > i ? chart.tags[i] : '', x0 - 5, y + dy/2 + 5) //INSERTAR TEXTO 
        }
        ctx.beginPath()
        ctx.font = font.size + 'px ' + font.family
        ctx.fillStyle = font.color
        ctx.textBaseline = 'top'
        ctx.textAlign = font.align
        for (let i = scale.min; i <= limit; i += intervalVal) {
            let dx = width2/limit * i, x = x0 + dx //TAMAÑO DE LA COLUMNA
            ctx.fillText(i, x, y0 + 5) //INSERTAR TEXTO
        }
        ctx.closePath()
    }
    ctx.closePath()
    // Textos de Tags y Values End
    ctx.restore()
    ctx.save()
}
function insertarValores(data, state) {
    const { chart, font, scale, canvas } = state
    const { ctx, dx, dy, height, len, max, width, x0, y0 } = data

    ctx.save()

    if (chart.dataTag.length /*&& chart.dataTags*/) {
        ctx.fillStyle = font.color
        
        let dataTags = chart.dataTag
        let width2 
        if (chart.position != 'vertical')
            width2 = canvas.width - 2*(chart.margin.x/2) - chart.padding.x

        ctx.beginPath()
        ctx.font = font.size + 'px ' + font.family
        const limit = Math.max(scale.max, max)
            
        if (chart.position == 'vertical') {
            ctx.textAlign = 'center'
            ctx.textBaseline = 'bottom'
            for (let i = 0, x = data.cx + dx/2; i < len; i++, x += width/len) {
                if (dataTags[i] == '0') {
                    let dy = height/limit * chart.values[i], y = y0 - dy//TAMAÑO DE LA COLUMNA
                    ctx.fillText(chart.values[i], x, y) //INSERTAR TEXTO
                }
            }
        } else {
            ctx.textAlign = 'left'
            ctx.textBaseline = 'alphabetic'
            for (let i = 0, y = data.cy + dy/2 + font.size/2; i < len; i++, y -= height/len) {
                if (dataTags[i] == '0') {
                        let dx = width2/(limit+state.scale.interval) * chart.values[i], x = x0 + dx//TAMAÑO DE LA COLUMNA
                        ctx.fillText(chart.values[i], x*1.05, y - 2) //INSERTAR TEXTO
                }
            }
        }
            
    } else {
        ctx.fillStyle = 'transparent'
    }
    
    ctx.closePath()

    ctx.restore()
    ctx.save()
}
function resaltarBarras(data, state) {

    const { canvas, chart, scale, font, extra } = state
    const { dx, dy, height, len, max, width, x0, y0 } = data
    const { ctx } = canvas
    const limit = Math.max(scale.max, max)

    ctx.save()

    ctx.font = font.size + 'px ' + font.family

    let hightBar = extra.highlightBar
    let width2 
    if (chart.position != 'vertical')
        width2 = canvas.width - 2*(chart.margin.x/2)

    // anchoTags
    // let tagsWidth = []
    // chart.tags.map((tagWidth, i) => tagsWidth[i] = (ctx.measureText(chart.tags[i]).width))
    // tagsWidth = Math.max(...tagsWidth)
    
    //anchoValues
    let valuesWidth = []
    chart.values.map((valueWidth, i) => valuesWidth[i] = (ctx.measureText(chart.values[i]).width))
    valuesWidth = Math.max(...valuesWidth)
    ctx.beginPath()
    ctx.fillStyle = 'rgba(212,230,192, 0.6)'

    if (chart.position == 'vertical') {
        for (let i = 0, x = data.cx/1.08; i < len; i++, x += width/len) {
            if (!isNaN(hightBar[i]) && hightBar[i].length === 1 && eval(hightBar[i]) === 0) {
                let dy = height/limit * chart.values[i], y = y0 - dy //TAMAÑO DE LA COLUMNA
                ctx.fillRect(x, y - height*0.13, dx*1.34, dy + height*0.13 + font.size*2) //DIBUJAR COLUMNA
            }
        }
    } else {
        for (let i = 0, y = data.cy; i < len; i++, y -= height/len) {
            let dx2 = []
            for (let j = 0; j < len; j ++) {
                dx2.push(ctx.measureText(chart.tags[j]).width + font.size)
            }
            dx2 = Math.max(...dx2)
            if (!isNaN(hightBar[i]) && hightBar[i].length === 1 && eval(hightBar[i]) === 0) {
                let dx = width2/(limit+state.scale.interval) * chart.values[i], x = x0 //TAMAÑO DE LA COLUMNA
                ctx.fillRect(x - dx2, y - height/len*0.1, dx + dx2*1.5 +20, dy + height/len*0.2) //DIBUJAR COLUMNA
                // let dx = width/limit * chart.values[i], x = x0 + dx //TAMAÑO DE LA COLUMNA
                // ctx.fillRect(x0 - width/limit*0.25, y + height/limit*0.2, dx + width/limit*0.45, dy - height/limit*0.4) //DIBUJAR COLUMNA
            }
        }
    }
    ctx.restore()
    ctx.save()
}
function lineasGuias(data, state) {
    const { canvas, scale, chart } = state
    const { ctx } = canvas
    const { height, max, x0, y0 } = data
    const limit = Math.max(scale.max, max)

    ctx.save()
    
    ctx.strokeStyle = scale.color == '' ? 'transparent' : scale.color
    ctx.lineWidth = eval(scale.width)
    let width2 
    
    if (chart.position != 'vertical')
    width2 = canvas.width - 2*(chart.margin.x/2+10) - chart.padding.x*2-10
    
    if (scale.interval > 0) {
        if (scale.width > 0) {
            if (chart.position == 'vertical') {
                for (let i = scale.min; i <= limit; i += scale.interval) { 
                    let dy = height/limit * i, y = y0 - dy //TAMAÑO DE LA COLUMNA
                    ctx.moveTo(chart.margin.x, y)
                    ctx.lineTo(canvas.width - chart.margin.x + 2*chart.padding.x, y)
                }
            } else {
                for (let i = scale.min; i <= limit; i += scale.interval) {
                    let dx = width2/limit * i, x = x0 + dx //TAMAÑO DE LA COLUMNA
                    ctx.moveTo(x, chart.margin.y - 2*chart.padding.y)
                    ctx.lineTo(x, y0)
                }
            }
        } 
    }
    console.log(ctx.lineWidth)
    ctx.stroke()
    //ctx.closePath()
    ctx.restore()
    ctx.save()
}
function insertarTitulos(data, state) {
    const { canvas, axis, chart, font, title } = state
    const { height, width } = state.canvas
    const { ctx } = canvas
    const { /*x,*/ y } = chart.margin 
    const { padding } = chart

    ctx.save()

    ctx.textAlign = font.align
    ctx.font = (title.size*0.9) + 'px ' + font.family
    ctx.fillStyle = title.color
    ctx.fillText(axis.title_x, width/2,height - padding.y) //INSERTAR TITULO X

    ctx.rotate(3*Math.PI/2)
    ctx.fillText(axis.title_y, - height/2, y/2 - Number(font.size)/1.5) //INSERTAR TITULO Y

    ctx.rotate(Math.PI/2)
    ctx.fillStyle = title.color
    ctx.font = title.size + 'px ' + font.family
    ctx.textBaseline = 'top'
    ctx.fillText(title.value, width/2, title.top) //INSERTAR TITULO

    ctx.restore()
    ctx.save()
}
