import { replace } from 'actions'

export function graficoDatos(config) 
{
    const { container, params, variables, versions, vt } = config
    const { axisColor, axisWidth, background, fontColor, /*extra,*/ lineColor, lineWidth, chartBorder,
        chartPosition, chartColor, chartValues, chartTags, titleValue, titleSize, titleColor, axisTitleX, axisTitleY, fontSize,
        scaleMax, scaleMin, scaleInterval, scaleColor, scaleWidth, dataTag, withArrowsX, withArrowsY, limitVal, projectionVal, highlightBar, fontFamily,
        /* Nuevos parámetros */
        chartType, pictoImg, captVal, captText, caption, rotateTags, rotateValues, barSeparation, showTags, showValues, titleWeight, fontWeight, borderBars,
        canvasPadding, containerPadding, chartPadding, innerChartPadding
    } = params

    if (!container) return
    let maxWidth = container.parentElement.offsetWidth, responsive = params.width < maxWidth,
        width = responsive ? params.width : maxWidth - 15, height = responsive ? params.height : width

    container.width = width
    container.height = height

    let vars = vt ? variables : versions
    let values = replace(chartValues, vars, vt).split(',')

    styleCanvasCont()
    function styleCanvasCont() {
        let borderColor = borderColor
        borderColor = borderColor != '' ? borderColor : 'transparent'
        let borderRadius = borderRadius
        borderRadius = borderRadius > 0 ? borderRadius : 0
        // $(board).attr({
        //     style: `border: ${borderWidth}px solid ${borderColor}; border-radius: ${borderRadius}px; background-color: ${backgroundColor};`
        // })
    }
    let paddingAux = {
        canvas: {
            top: eval(canvasPadding ? canvasPadding.split(',')[0] : 0),
            right: eval(canvasPadding ? canvasPadding.split(',')[1] : 0),
            bottom: eval(canvasPadding ? canvasPadding.split(',')[2] : 0),
            left: eval(canvasPadding ? canvasPadding.split(',')[3] : 0)
        },
        container: {
            top: eval(containerPadding ? containerPadding.split(',')[0] : 0),
            right: eval(containerPadding ? containerPadding.split(',')[1] : 0),
            bottom: eval(containerPadding ? containerPadding.split(',')[2] : 0),
            left: eval(containerPadding ? containerPadding.split(',')[3] : 0)
        },
        chart: {
            top: eval(chartPadding ? chartPadding.split(',')[0] : 20),
            right: eval(chartPadding ? chartPadding.split(',')[1] : 10),
            bottom: eval(chartPadding ? chartPadding.split(',')[2] : 50),
            left: eval(chartPadding ? chartPadding.split(',')[3] : 20)
        },
        innerChart: {
            x: eval(innerChartPadding ? innerChartPadding.split(',')[0] : 10),
            y: eval(innerChartPadding ? innerChartPadding.split(',')[1] : 10)
        }
    }
    let c = container

    let mainScaleInterval, mainScaleMin, mainScaleMax, mainMaxValue,
    mainMinValue
    mainMaxValue = eval(Math.max(...values))
    mainMinValue = eval(Math.min(...values))
    mainScaleInterval = eval(scaleInterval > 1 ? scaleInterval > mainMaxValue ? mainMaxValue : scaleInterval : 1)
    mainScaleMin = eval(scaleMin > 0 ? scaleMin > mainMinValue ? mainMinValue : scaleMin : 0)
    mainScaleMax = eval(scaleMax > mainMaxValue ? scaleMax : mainMaxValue)
    
    let state = {}
    state.ctx = c.getContext('2d')
    state.scale = {
        value: mainScaleInterval,
        width: scaleWidth,
        color: scaleColor,
        min: mainScaleMin >= mainScaleMax ? mainMinValue : mainScaleMin,
        max: mainScaleMax <= mainScaleMin ? mainMaxValue : mainScaleMax
    }
    state.titles = {
        mainTitle: {
            title: titleValue,
            alignX: 'center',
            alignY: 'top',
            font: {
                family: fontFamily,
                weight: titleWeight,
                color: titleColor,
                size: eval(titleSize)
            },
            color: titleColor,
            move: {
                moveY: 0,
                moveX: 0
            }
        },
        titleX: {
            title: axisTitleX,
            alignX: 'center',
            alignY: 'bottom',
            font: {
                family: fontFamily,
                weight: titleWeight,
                color: titleColor,
                size: Math.round(eval(titleSize)*0.8)
            },
            color: titleColor,
            move: {
                moveY: 0,
                moveX: 0
            },
            padding: 0
        },
        titleY: {
            title: axisTitleY,
            alignX: 'center',
            alignY: 'top',
            font: {
                family: fontFamily,
                weight: titleWeight,
                color: titleColor,
                size: Math.round(eval(titleSize)*0.8)
            },
            color: titleColor,
            move: { moveY: 0,moveX: 0 },
            padding: 0
        }
    }
    state.font = {
        family: fontFamily,
        weight: fontWeight,
        size: fontSize,
        color: fontColor,
        align: 'left' // end, right, center, start, left
    }
    state.canvas = {
        height: c.height,
        width: c.width,
        padding: {
            top: c.height*(paddingAux.canvas.top/1000),
            right: c.height*(paddingAux.canvas.right/1000),
            bottom: c.height*(paddingAux.canvas.bottom/1000),
            left: c.height*(paddingAux.canvas.left/1000)
        }
    }
    state.canvas.position = {
        x0: state.canvas.padding.left,
        y0: state.canvas.padding.top,
        x1: c.width - (state.canvas.padding.right),
        y1: c.height - (state.canvas.padding.bottom) 
    }
    state.chart = {
        orientation: chartPosition,
        type: chartType == 'pictórico' ? 'pictorico' : false,
        style: {
            border: {
                color: '',
                width: 1,
                radius: 4
            },
            backgroundColor: background,
            width: 0,
            height: 0,
            innerPadding: {x: 0, y: 0},
            padding: {
                top: c.height*(paddingAux.chart.top/1000),
                right: c.height*(paddingAux.chart.right/1000),
                bottom: c.height*(paddingAux.chart.bottom/1000),
                left: c.height*(paddingAux.chart.left/1000)
            }
        },
        axis: {
            width: axisWidth,
            color: axisColor,
            arrowX: withArrowsX == 'si' ? true: false,
            arrowY: withArrowsY == 'si' ? true: false,
            arrowColor: axisColor
        },
        position: { x0: 0, y0: 0, x1: 0, y1: 0 },
        image: {
            src: pictoImg,
            caption: {
                value: ' = ' + captVal + ' ' + captText,
                show: caption,
                font: {
                    size: fontSize,
                    color: '#262626',
                    family: fontFamily,
                    alignX: 'right',
                    alignY: 'middle',
                    weight: titleWeight
                },
                leyendaImgSize: fontSize*2
            }
        },
        values: values,
        tags: chartTags.split(','),
        config: {
            dataTags: dataTag.split(','),
            hightLightBar: highlightBar,
            girarTextos: {tags: rotateTags, values: rotateValues},
            lines: {
                limitLines: limitVal.split(','),
                projectionLines: projectionVal.split(','),
                color: lineColor, width: lineWidth
            }
        },
        bars: {
            separation: barSeparation ? 1 - (barSeparation)/100: 1 - 60/100,
            width: 1, // 3 valores {0: grande, 1: mediana, 2: pequeña},
            border: {
                color: chartBorder,
                width: borderBars
            },
            color: chartColor, //#c4440980,#1fbc0780,#09ba9c80,#a208ba80
            highlight: {color: '#93939380'},
            padding: 1 // {0: grande, 1: mediana, 2: pequeña},
        },
        show: {tags: showTags, values: showValues, origen: true}
    }

    let tagWordSizeX = 0, tagWordSizeY = 0, valueWordSizeY = 0, valueWordSizeX = 0, maxWord = 0, maxWordIndex;
    state.ctx.font = `${state.font.size}px ${state.font.family}`
    state.chart.tags.map( (el,index) => {
        if(el.length >= maxWord) {
         maxWord = el.length
         maxWordIndex = index
        }
    })
    maxWord = state.chart.tags[maxWordIndex]

    if (state.chart.orientation == 'vertical') {
        tagWordSizeX = Math.sin(state.chart.config.girarTextos.tags*Math.PI/180)*state.ctx.measureText(maxWord).width
        valueWordSizeY = state.scale.max > mainMaxValue ? state.ctx.measureText(state.scale.max).width : state.ctx.measureText(mainMaxValue).width 
    } else {
        tagWordSizeY = Math.cos(state.chart.config.girarTextos.tags*Math.PI/180)*state.ctx.measureText(maxWord).width
        //valueWordSizeX = state.ctx.measureText(Math.max(...state.chart.values)).width
    }

    state.container = {
        padding: { top: state.titles.mainTitle.font.size, right: 10, bottom: state.titles.titleX.font.size + c.height*0.02, left:10 + state.titles.titleY.font.size }
    }

    state.container.position = { 
        x0: state.canvas.position.x0 + state.container.padding.left,
        y0: state.canvas.position.y0 + state.container.padding.top,
        x1: state.canvas.position.x1 - state.container.padding.right,
        y1: state.canvas.position.y1 - state.container.padding.bottom
    }

    if(state.chart.image.caption.show) {
        state.chart.style.padding.top += state.chart.image.caption.leyendaImgSize
    }
    state.chart.position = { 
        x0: state.container.position.x0 + state.chart.style.padding.left + tagWordSizeY + valueWordSizeY,
        y0: state.container.position.y0 + state.chart.style.padding.top,
        x1: state.container.position.x1 - (state.chart.style.padding.right),
        y1: state.container.position.y1 - (state.chart.style.padding.bottom) - state.font.size/2 - tagWordSizeX
    }
    state.chart.style.innerPadding.x = (state.chart.position.x1 - state.chart.position.x0)*(paddingAux.innerChart.x/1000)
    state.chart.style.innerPadding.y = (state.chart.position.y1 - state.chart.position.y0)**(paddingAux.innerChart.y/100)

    state.chart.bars.margin = state.chart.style.innerPadding.x

    state.chart.image.height = (state.chart.position.y1 - state.chart.position.y0)*0.3
    
    state.innerChart = {}
    //*(paddingAux.canvas.top/1000)
    state.innerChart.position = {
        x0: state.chart.position.x0 + state.chart.style.innerPadding.x + state.chart.style.padding.left,
        y0: state.chart.position.y0 + state.chart.style.innerPadding.y,
        x1: state.chart.position.x1 - state.chart.style.innerPadding.x - state.chart.style.padding.right,
        y1: state.chart.position.y1 - state.chart.axis.width/2
    }

    if(state.chart.orientation != 'vertical') {
        state.innerChart.position.y1 -= state.chart.style.innerPadding.y/2
        state.innerChart.position.x0 = state.chart.position.x0 + state.chart.axis.width/2
        state.innerChart.position.x1 = state.chart.position.x1 - state.chart.style.innerPadding.x - state.chart.style.padding.right - state.chart.axis.width
    }

    let data = {
        lenVal: state.chart.values.length,
        lenTag: state.chart.tags.length,
        innerChart: {
            width: state.innerChart.position.x1 - state.innerChart.position.x0,
            height: state.innerChart.position.y1 - state.innerChart.position.y0
        }
    }
    data.chartDivisions = (state.scale.max - state.scale.min)/state.scale.value

    initEx(state)

    function initEx(state) {
        const { ctx, scale, chart } = state
        const { config, show, type } = chart
        ctx.save()
        chart.config.hightLightBar != '' && resaltarBarras(state)
        insTitulos(state)
        insGrafico(state)
        scale.width > 0 && insGuias(state)
        if (type == 'pictorico') {
            datosPictoricos(state)
        } else {
            datosSimbolicos(state)
        }
        config.lines.limitLines != '' && limitarColumnas(state)
        config.lines.projectionLines != '' && proyectarColumnas(state)
        show.tags && insEtiquetas(state)
        show.values && insValores(state)
        config.dataTags && insEtqDatos(state)
        ctx.restore()
        ctx.save()
    }
    
    // Generar Gráfico Datos Histograma
    function datosPictoricos(state){
        insPictoricos(state)
        insLeyenda(state)
    }
    
    // Generar Gráfico Datos Histograma
    function datosSimbolicos(state){
        insBarras(state)
    }
    
    // Insertar Leyenda
    function insLeyenda(state) {
        const { ctx, container, chart, innerChart } = state
        const { caption } = chart.image
        const { width, height } = data.innerChart
        ctx.save()
    
        let img = new Image()
        img.src = chart.image.src
        let imgSize = 0.15
        let imgW = height > width ? width*imgSize : data.innerChart.height*imgSize
        let imgH = imgW
        let captText = caption.value
        ctx.font = `bold ${caption.font.size}px ${caption.font.family}`
        ctx.fillStyle = caption.font.color
        let captTextW = ctx.measureText(captText).width
        //let captTextH = ctx.measureText(captText).height        
        if (chart.orientation == 'vertical') {
            ctx.textAlign = 'right'
            ctx.textBaseline = 'middle'
            ctx.fillText(captText, chart.position.x1, container.position.y0 + imgH/2)
            img.onload = function() {
                ctx.drawImage(img,chart.position.x1 - imgW - captTextW, container.position.y0, imgW,imgH)
            }
        } else {
            ctx.textAlign = 'right'
            ctx.textBaseline = 'middle'
            ctx.fillText(captText, chart.position.x1, container.position.y0 + imgH/2)
            img.onload = function() {
                ctx.drawImage(img,chart.position.x1 - imgW - captTextW, container.position.y0, imgW,imgH)
            }
        }
        let captBox = 0.2
        ctx.fillStyle = 'rgba(0,0,0,0.2)'
        ctx.strokeStyle = 'rgba(0,0,0,0.3)'
        ctx.rect(innerChart.position.x1 - imgW - captTextW - imgW*captBox/2, container.position.y0 - imgH*captBox/2, (imgW + captTextW)*(captBox+1), imgH*(captBox+1))
        ctx.stroke()
        ctx.fill()
    
        ctx.restore()
        ctx.save()
    }
    
    // Generar Gráfico Datos Pictoricos
    function insPictoricos(state){
        const { ctx, innerChart, chart, scale } = state
        const { lenTag, chartDivisions } = data
        const { x0, y1 } = innerChart.position
        ctx.save()
        let img = new Image()
        img.src = chart.image.src
        let barMargin
        if (chart.orientation == 'vertical') {
            let barHeightAux = data.innerChart.height/chartDivisions 
            let barWidthAux = data.innerChart.width/lenTag
            let imgW = barHeightAux > barWidthAux ? barWidthAux : barHeightAux
            let imgH = imgW
            barMargin = barWidthAux - imgW
            img.onload = function() {
                for (let i = 0; i < chartDivisions; i ++) {
                    for (let j = 0; j < (chart.values[i] - scale.min)/scale.value; j++) {
                        chart.tags[i] &&
                            ctx.drawImage(img, x0 + barMargin/2 + (barWidthAux)*i, y1 - imgW*(j),imgH,-imgW)
                    }
                }
            }
        } else {
            let barHeightAux = data.innerChart.width/chartDivisions 
            let barWidthAux = data.innerChart.height/lenTag
            let imgW = barHeightAux > barWidthAux ? barWidthAux : barHeightAux
            let imgH = imgW
            barMargin = barWidthAux - imgW
            img.onload = function() {
                for (let i = 0; i < chartDivisions; i ++) {
                    for (let j = 0; j < (chart.values[i] - scale.min)/scale.value; j++) {
                        chart.tags[i] &&
                            // imagenes pegadas al eje Y
                            // ctx.drawImage(img, x0 + chart.axis.width/4 + (barheight)*j, y1 - barMargin/2 - (barWidth)*i,imgH,-imgW)
                            // imágenes al medio del valor
                            ctx.drawImage(img, x0 + chart.axis.width/2 + (barHeightAux)*(j), y1 - barMargin/2 - (barWidthAux)*i,imgH,-imgW)
                    }
                }
            }
        }
        ctx.restore()
        ctx.save()
    }
    
    // Generar Barras Histogramas
    function insBarras(state) {
        const { ctx, innerChart, chart, scale } = state
        const { lenTag } = data
        const { x0, y1 } = innerChart.position
        const { width, height } = data.innerChart
        ctx.save()
        let colorBars = chart.bars.color.split(',')
        let barMargin
        if (chart.orientation == 'vertical') {
            barMargin = (width/lenTag)*chart.bars.separation
            let newBarWidth = (width/lenTag) - barMargin
            let xPos = x0 + barMargin/2
            let delta = (newBarWidth + barMargin)
            for (let i = 0; i < lenTag; i++) {
                let yPosFin = - (height/data.chartDivisions)*(((chart.values[i]) - scale.min)/scale.value)
                if (chart.values[i]) {
                    ctx.fillStyle = colorBars[i%colorBars.length]
                    ctx.fillRect(xPos + delta*i,y1,newBarWidth,yPosFin)
                    if (chart.bars.border.width > 0) {
                        ctx.beginPath()
                        ctx.lineWidth = chart.bars.border.width
                        ctx.strokeStyle = chart.bars.border.color
                        ctx.moveTo(xPos + delta*i,y1)
                        ctx.lineTo(xPos + delta*i,y1  + yPosFin)
                        ctx.lineTo(xPos + delta*(i+1) - barMargin,y1 + yPosFin)
                        ctx.lineTo(xPos + delta*(i+1) - barMargin,y1)
                        ctx.stroke()
                    }
                }
            }
        } else {
            barMargin = (data.innerChart.height/lenTag)*chart.bars.separation
            let newBarWidth = (data.innerChart.height/lenTag) - barMargin
            let yPos = y1 - barMargin/2
            let delta = (newBarWidth + barMargin)
            for (let i = 0; i < lenTag; i++) {
                let xPosFin = (data.innerChart.width/data.chartDivisions)*(((chart.values[i]) - scale.min)/scale.value)
                if (chart.values[i]) {
                    ctx.fillStyle = colorBars[i%colorBars.length]
                    ctx.fillRect(x0,yPos - delta*i,xPosFin,-newBarWidth)
                    if (chart.bars.border.width > 0) {
                        ctx.strokeStyle = chart.bars.border.color
                        ctx.lineWidth = chart.bars.border.width
                        ctx.beginPath()
                        ctx.moveTo(x0,yPos - delta*i)
                        ctx.lineTo(x0 + xPosFin,yPos - delta*i)
                        ctx.lineTo(x0 + xPosFin,yPos - delta*(i+1) + barMargin)
                        ctx.lineTo(x0,yPos - delta*(i+1) + barMargin)
                        ctx.stroke()
                    }
                }
            }
        }
        ctx.restore()
        ctx.save()
    }
    
    // Insertar Titulos
    function insTitulos(state) {
        const { ctx, chart } = state
        ctx.save()
        let titleHorizontal = 'titleY'
        let titleVertical = 'titleX'
        insTitPrinc(state)
        if (chart.orientation == 'vertical') {
            titleHorizontal = 'titleX'
            titleVertical = 'titleY'
        }
        insTituloX(state, titleHorizontal)
        insTituloY(state, titleVertical)
        ctx.restore()
        ctx.save()
    }
    
    // Main Title
    function insTitPrinc(state) {
        const { ctx, canvas } = state
        const { mainTitle } = state.titles
        ctx.save()
        let x = (canvas.position.x1)/2 + mainTitle.move.moveX + canvas.position.x0
        let y = 0 + canvas.position.y0 + mainTitle.move.moveY
        ctx.translate(x,y)
        ctx.fillStyle = mainTitle.color
        ctx.textAlign = mainTitle.alignX
        ctx.textBaseline = mainTitle.alignY
        ctx.font = mainTitle.font.weight + ' ' + mainTitle.font.size + 'px ' + mainTitle.font.family
        ctx.fillText(mainTitle.title, 0, 0)
        ctx.restore()
        ctx.save()
    }
    
    // Title X
    function insTituloX(state, title) {
        const { ctx, chart, canvas } = state
        const { titleX, titleY } = state.titles
        ctx.save()
        title = (title == 'titleX') ? titleX : titleY
        let x = (chart.position.x1 - chart.position.x0)/2 + title.move.moveX + chart.position.x0
        let y = canvas.position.y1 - title.move.moveY
        ctx.translate(x,y)
        ctx.fillStyle = title.color
        ctx.textAlign = titleX.alignX
        ctx.textBaseline = titleX.alignY
        ctx.font = title.font.weight + ' ' + title.font.size + 'px ' + title.font.family
        ctx.fillText(title.title, 0, 0)
        ctx.restore()
        ctx.save()
    }
    
    // Title Y
    function insTituloY(state, title) {
        const { ctx, chart, canvas } = state
        const { titleX, titleY } = state.titles
        ctx.save()
        title = (title == 'titleX') ? titleX : titleY
        let x = canvas.position.x0 + titleY.move.moveX
        let y = (chart.position.y1 - chart.position.y0)/2 + chart.position.y0 - titleY.move.moveY
        ctx.translate(x,y)
        ctx.fillStyle = title.color
        ctx.rotate(-90*Math.PI/180)
        ctx.textAlign = titleY.alignX
        ctx.textBaseline = titleY.alignY
        ctx.font = title.font.weight + ' ' + title.font.size + 'px ' + title.font.family
        ctx.fillText(title.title, 0, 0)
        ctx.restore()
        ctx.save()
    }
    
    //insertar Chart
    function insGrafico(state) {
        const { ctx } = state
        const { x0, y0, x1, y1 } = state.chart.position
        ctx.save()
        insEjes(state, x0, y0, x1, y1)
        insFlechas(state, x0, y0, x1, y1)
        ctx.restore()
        ctx.save()
    }
    
    // Generar Ejes
    function insEjes(state, x0, y0, x1, y1) {
        const { ctx } = state
        const { axis } = state.chart
        ctx.save()
        ctx.lineWidth = axis.width
        ctx.strokeStyle = axis.color
        ctx.beginPath()
        ctx.moveTo(x0,y0)
        ctx.lineTo(x0,y1)
        ctx.stroke()
        ctx.closePath()
        ctx.beginPath()
        ctx.moveTo(x0,y1)
        ctx.lineTo(x1,y1)
        ctx.stroke()
        ctx.closePath()
        ctx.restore()
        ctx.save()
    } // End insEjes
    
    // Generar Flechas ejes
    function insFlechas(state, x0, y0, x1, y1) {
        const { ctx, chart } = state
        const { axis } = chart
        ctx.save()
        ctx.lineWidth = axis.width
        ctx.strokeStyle = axis.arrowColor
        ctx.lineCap = 'round'; // round, square, butt
        ctx.lineJoin= 'round'; // bevel, round, miter
        let auxWidth = chart.position.x1 - chart.position.x0
        let auxHeight = chart.position.y1 - chart.position.y0
        let width = auxWidth < auxHeight ? auxWidth : auxHeight
        let deltaLength = width*0.025
        let deltaIncl = deltaLength*0.7
        if (axis.arrowX) {
            ctx.beginPath()
            ctx.moveTo(x0 - deltaIncl,y0 + deltaLength)
            ctx.lineTo(x0,y0)
            ctx.closePath()
            ctx.stroke()
            ctx.beginPath()
            ctx.moveTo(x0,y0)
            ctx.lineTo(x0 + deltaIncl,y0 + deltaLength)
            ctx.closePath()
            ctx.stroke()
        }
        if (axis.arrowY) {
            ctx.beginPath()
            ctx.moveTo(x1 - deltaLength,y1 + deltaIncl)
            ctx.lineTo(x1,y1)
            ctx.closePath()
            ctx.stroke()
            ctx.beginPath()
            ctx.moveTo(x1,y1)
            ctx.lineTo(x1 - deltaLength,y1 - deltaIncl)
            ctx.closePath()
            ctx.stroke()
        }
        ctx.restore()
        ctx.save()
    } // End insFlechas
    
    // Insertar dataTags
    function insEtqDatos(state) {
        const { ctx, chart, font, innerChart, scale } = state
        const { values, tags } = chart
        const { x0, y1 } = innerChart.position
        ctx.save()
        ctx.fillStyle = font.color
        ctx.font = 'bold ' + font.size + 'px ' + font.family
        let barMargin, newBarWidth, delta
        for (let i = 0; i < data.lenTag; i++) {
            if (values[i] && tags[i] && chart.config.dataTags[i] === '0') {
                if (chart.orientation == 'vertical') {
                    barMargin = (data.innerChart.width/data.lenTag)*chart.bars.separation
                    newBarWidth = (data.innerChart.width/data.lenTag) - barMargin
                    delta = (newBarWidth + barMargin)
                    ctx.textAlign = 'center'
                    ctx.textBaseline = 'bottom'
                    ctx.fillText(values[i], x0 + delta/2 +  delta*i, y1 - 4 - (data.innerChart.height/data.chartDivisions)*(((values[i]) - scale.min)/scale.value))
                } else {
                    barMargin = (data.innerChart.height/data.lenTag)*chart.bars.separation
                    newBarWidth = (data.innerChart.height/data.lenTag) - barMargin
                    delta = (newBarWidth + barMargin)
                    ctx.textAlign = 'left'
                    ctx.textBaseline = 'middle'
                    ctx.fillText(values[i], x0 + 10 + (data.innerChart.width/data.chartDivisions)*(((values[i]) - scale.min)/scale.value), y1 - delta/2 - delta*i)
                }
            }
        }
        ctx.restore()
        ctx.save()
    }
    
    // Insertar Tags
    function insEtiquetas(state) {
        const { ctx, font, chart, innerChart } = state
        const { x0, y1 } = innerChart.position
        ctx.save()
        let girarTexto = chart.config.girarTextos.tags
        ctx.font = font.weight + ' ' + font.size + 'px ' + font.family
        ctx.fillStyle = font.color
        for (let i = 0; i < data.lenTag; i++) {
            if (chart.tags[i]) {
                if (chart.orientation == 'vertical') {
                    ctx.save()
                    // si se quiere que el final de la letra quede centrado con respecto a la barra eliminar "a" y ctx.textAlign = girarTexto > 0 ? 'right' : 'center'
                    ctx.textAlign = girarTexto > 0 ? 'center' : 'center'
                    ctx.textBaseline = girarTexto > 0 ? 'middle' : 'top'
                    // si se quiere que el final de la letra quede centrado con respecto a la barra eliminar "a"
                    let a = Math.sin(state.chart.config.girarTextos.tags*Math.PI/180)*state.ctx.measureText(chart.tags[i]).width
                    ctx.translate(x0+ (data.innerChart.width/data.lenTag)/2 + (data.innerChart.width/data.lenTag)*(i), chart.position.y1 + a/2 + 2)
                    girarTexto > 0 && ctx.rotate(-girarTexto*Math.PI/180)
                    ctx.fillText(chart.tags[i], 0,girarTexto > 0 ? 5 : 0)
                    ctx.restore()
                    ctx.save()
                } else {
                    ctx.save()
                    ctx.textAlign = 'right'
                    ctx.textBaseline = 'middle'
                    // si se quiere que el final de la letra quede centrado con respecto a la barra eliminar "a"
                    let a = Math.sin(state.chart.config.girarTextos.tags*Math.PI/180)*state.ctx.measureText(chart.tags[i]).width
                    ctx.translate(chart.position.x0 - 10, y1 - data.innerChart.height/data.lenTag/2 - data.innerChart.height/data.lenTag*i - a/2)
                    girarTexto > 0 && ctx.rotate(-girarTexto*Math.PI/180)
                    ctx.fillText(chart.tags[i], 0, 0)
                    ctx.restore()
                    ctx.save()
                }
            }
        }
        ctx.restore()
        ctx.save()
    }
    
    //Insertar Values
    function insValores(state) {
        const { ctx, chart, scale, font, innerChart } = state
        const { x0, y1} = innerChart.position
        ctx.save()
        ctx.font = font.fontWeight + ' ' + font.size + 'px ' + font.family
        ctx.fillStyle = font.color
        if (chart.orientation == 'vertical') {
                ctx.textAlign = 'right'
                ctx.textBaseline = 'middle'
                for (let i = 0; i <= data.chartDivisions; i ++) {
                        if (i === 0) {
                            chart.show.origen && ctx.fillText(0,chart.position.x0 - 5, y1)
                        } else {
                                ctx.fillText(scale.min + (scale.max - scale.min)/data.chartDivisions*(i),chart.position.x0 - 5, y1 - (data.innerChart.height/(data.chartDivisions))*(i))
                        }
                }
                if (scale.min > 0) {
                        ctx.textBaseline = 'middle'
                        ctx.translate(chart.position.x0+1, y1 - data.innerChart.height/(data.chartDivisions)/3)
                        ctx.rotate(70*Math.PI/180)
                        ctx.fillText('//', 0, 0)
                        ctx.translate(-(chart.position.x0+1), +(y1 - data.innerChart.height/(data.chartDivisions)/3))
                        ctx.rotate(-70*Math.PI/180)
                }
        } else {
                ctx.textAlign = 'center'
                ctx.textBaseline = 'top'
                for (let i = 0; i <= data.chartDivisions; i ++) {
                        if (i === 0) {
                            chart.show.origen && ctx.fillText(0,x0, chart.position.y1 + 5)
                        } else {
                                ctx.fillText(scale.min + (scale.max - scale.min)/data.chartDivisions*(i),x0 + (data.innerChart.width/(data.chartDivisions))*(i), chart.position.y1 + 5)
                        }
                }
                if (scale.min > 0) {
                        ctx.textBaseline = 'middle'
                        ctx.translate(x0 + data.innerChart.height/(data.chartDivisions)/3, chart.position.y1)
                        ctx.fillText('//',0, 0)
                        ctx.translate(-(chart.position.x0+5), -(y1 - data.innerChart.height/(data.chartDivisions)/3))
                }
        }
        ctx.restore()
        ctx.save()
    }
    
    // Insertar líneas guías
    function insGuias(state) {
        const { ctx, chart, scale } = state
        ctx.save()
        if (scale.width > 0) {
            ctx.lineWidth = scale.width
            ctx.strokeStyle = scale.color
            ctx.beginPath()
            for (let i = 0; i <= data.chartDivisions; i ++) {
                if (chart.orientation == 'vertical') {
                    ctx.moveTo(chart.position.x0 + chart.axis.width/2, chart.position.y1 - chart.axis.width/2 - data.innerChart.height/data.chartDivisions*(i))
                    ctx.lineTo(chart.position.x1 - chart.axis.width, chart.position.y1 - chart.axis.width/2 - data.innerChart.height/data.chartDivisions*(i))
                } else {
                    ctx.moveTo(chart.position.x0 + chart.axis.width/2 + data.innerChart.width/data.chartDivisions*(i), chart.position.y1 - chart.axis.width/2)
                    ctx.lineTo(chart.position.x0 + chart.axis.width/2 + data.innerChart.width/data.chartDivisions*(i), chart.position.y0 + chart.axis.width)
                }
            }
            ctx.stroke()
            ctx.closePath()
        }
        ctx.restore()
        ctx.save()
    }
    
    // Resaltar Barras
    function resaltarBarras(state) {
        const { ctx, chart, innerChart, container, scale } = state
        const { config } = chart
        const { x0, y1 } = innerChart.position
        ctx.save()
        if (config.hightLightBar != undefined) {
            ctx.fillStyle = 'rgba(163, 163, 163,0.6)'
            ctx.strokeStyle = 'rgba(163, 163, 163,0.9)'
            let hightLightBar = config.hightLightBar.split(',')
            for (let i = 0; i < data.lenTag; i++) {
                if (eval(hightLightBar[i]) === 0) {
                    if (chart.orientation == 'vertical') {
                        let barMargin = (data.innerChart.width/data.lenTag)*chart.bars.separation
                        let newBarWidth = (data.innerChart.width/data.lenTag) - barMargin
                        let delta = (newBarWidth + barMargin)
                        let deltaHeight = data.innerChart.height/data.chartDivisions
                        let yPosFin = -(deltaHeight+deltaHeight*((chart.values[i] - scale.min)/scale.value))
                        ctx.rect(x0 + delta*i, container.position.y1, delta, yPosFin - (container.position.y1-y1))
                    } else {
                        let barMargin = (data.innerChart.height/data.lenTag)*chart.bars.separation
                        let newBarWidth = (data.innerChart.height/data.lenTag) - barMargin
                        let delta = (newBarWidth + barMargin)
                        let deltaHeight = data.innerChart.width/data.chartDivisions
                        let xPosFin = (deltaHeight+deltaHeight*((chart.values[i] - scale.min)/scale.value))
                        ctx.rect(container.position.x0, y1 - (delta)*i,xPosFin + (x0 - container.position.x0),-newBarWidth - barMargin)
                    }
                }
            }
            ctx.fill()
            ctx.stroke()
            ctx.restore()
            ctx.save()
        }
    }
    
    // Limitar Columnas
    function limitarColumnas(state) {
        const { ctx, chart, scale } = state
        const { lines } = chart.config
        ctx.save()
        if (chart.config.lines.width > 0 && lines.limitLines != '' ) {
            ctx.lineWidth = lines.width
            ctx.strokeStyle = lines.color
            ctx.setLineDash([10, 5]);
            ctx.beginPath()
            for (let i = 0; i < lines.limitLines.length; i ++) {
                if (lines.limitLines[i] >= scale.min && lines.limitLines[i] <= scale.max ) {
                    if (chart.orientation == 'vertical') {
                        let barHeightAux = (data.innerChart.height/data.chartDivisions)
                        ctx.moveTo(chart.position.x0 + chart.axis.width/2, chart.position.y1 - chart.axis.width/2 - barHeightAux*(lines.limitLines[i]-scale.min)/scale.value)
                        ctx.lineTo(chart.position.x1 - chart.axis.width, chart.position.y1 - chart.axis.width/2 - barHeightAux*(lines.limitLines[i]-scale.min)/scale.value)
                    } else {
                        let barHeightAux = (data.innerChart.width/data.chartDivisions)
                        ctx.moveTo(chart.position.x0 + chart.axis.width/2 + barHeightAux*(lines.limitLines[i]-scale.min)/scale.value, chart.position.y1 - chart.axis.width/2)
                        ctx.lineTo(chart.position.x0 + chart.axis.width/2 + barHeightAux*(lines.limitLines[i]-scale.min)/scale.value, chart.position.y0 + chart.axis.width)
                    }
                }
            }
            ctx.stroke()
        }
        ctx.closePath()
        ctx.restore()
        ctx.save()
    }
    
    // Proyectar Columnas
    function proyectarColumnas(state) {
        const { ctx, chart, scale, innerChart } = state
        const { lines } = chart.config
        ctx.save()
        if (chart.config.lines.width > 0 && lines.projectionLines != '' ) {
            ctx.lineWidth = lines.width
            ctx.strokeStyle = lines.color
            ctx.setLineDash([10,5]);
            ctx.beginPath()
            for (let i = 0; i < data.lenVal; i ++) {
                if (lines.projectionLines[i] == 0) {
                    if (chart.type == 'pictorico') {}
                    if (chart.orientation == 'vertical') {
                        let barMargin = (data.innerChart.width/data.lenTag)*chart.bars.separation
                        let newBarWidth = (data.innerChart.width/data.lenTag) - barMargin
                        let barHeightAux = (data.innerChart.height/data.chartDivisions)
                        ctx.moveTo(chart.position.x0 + chart.axis.width/2, chart.position.y1 - chart.axis.width/2 - barHeightAux*(chart.values[i]-scale.min)/scale.value)
                        ctx.lineTo(innerChart.position.x0 + chart.axis.width/2 + barMargin/2 + newBarWidth + (newBarWidth + barMargin)*i, chart.position.y1 - chart.axis.width/2 - barHeightAux*(chart.values[i]-scale.min)/scale.value)
                    } else {
                        let barMargin = (data.innerChart.height/data.lenTag)*chart.bars.separation
                        let newBarWidth = (data.innerChart.height/data.lenTag) - barMargin
                        let barHeightAux = (data.innerChart.width/data.chartDivisions)
                        ctx.moveTo(chart.position.x0 + chart.axis.width/2 + barHeightAux*(chart.values[i]-scale.min)/scale.value, chart.position.y1 - chart.axis.width/2)
                        ctx.lineTo(chart.position.x0 + chart.axis.width/2 + barHeightAux*(chart.values[i]-scale.min)/scale.value, innerChart.position.y1 - chart.axis.width/2 - barMargin/2 - (newBarWidth + barMargin)*i - newBarWidth)
                    }
                }
            }
            ctx.stroke()
        }
        ctx.closePath()
        ctx.restore()
        ctx.save()
    }
}