import { replace } from 'actions'

export function graficoDatos(config) 
{
    const { container, params, variables, versions, vt } = config
    const { axisColor, axisWidth, background, fontColor, lineColor, lineWidth, chartBorder, chartPosition, chartColor, chartValues, chartTags, dataTag, 
        titleValue, titleSize, titleColor, axisTitleX, axisTitleY, fontSize, scaleMax, scaleMin, scaleInterval, scaleColor, scaleWidth, withArrowsX, 
        withArrowsY, limitVal, projectionVal, highlightBar, fontFamily, chartType, pictoImg, captText, rotateTags, rotateValues, barSeparation, showTags, 
        showValues, titleWeight, fontWeight, borderBars, canvasPadding, containerPadding, chartPadding, innerChartPadding, valuesSeparator, showOrigin, 
        titleXYSize, dobLinesSize, dobLinesGradient, showCaption, showValCapt, captBg, captBorder, captBorderWidth, showAxisX, showAxisY, heightImgTag 
    } = params

    if (!container) return
    let maxWidth = container.parentElement.offsetWidth, responsive = params.width < maxWidth,
        width = responsive ? params.width : maxWidth - 15, height = responsive ? params.height : width

    container.height = height
    container.width = width

    let vars = vt ? variables : versions, values = replace(chartValues, vars, vt).split(','), c = container
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

    let mainScaleInterval, mainScaleMin, mainScaleMax, mainMaxValue, mainMinValue
    mainMaxValue = eval(Math.max(...values)); mainMinValue = eval(Math.min(...values))
    mainScaleInterval = eval(scaleInterval > 1 ? scaleInterval > mainMaxValue ? mainMaxValue : scaleInterval : 1)
    mainScaleMin = eval(scaleMin > 0 ? scaleMin > mainMinValue ? mainMinValue : scaleMin : 0)
    mainScaleMax = eval(scaleMax > mainMaxValue ? scaleMax : mainMaxValue)
    
    let state = {}
    state.ctx = c.getContext('2d')
    state.scale = {
        color: scaleColor,
        max: eval(mainScaleMax <= mainScaleMin ? mainMaxValue : mainScaleMax),
        min: eval(mainScaleMin >= mainScaleMax ? mainMinValue : mainScaleMin),
        value: eval(mainScaleInterval),
        width: scaleWidth
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
                size: Math.round(eval(titleXYSize))
            },
            color: titleColor,
            move: { moveY: 0, moveX: 0 },
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
                size: Math.round(eval(titleXYSize))
            },
            color: titleColor,
            move: { moveY: 0, moveX: 0 },
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
            showAxisX: showAxisX === 'si' || showAxisX === '' || showAxisX === undefined ? true : false,
            showAxisY: showAxisY === 'si' || showAxisY === '' || showAxisY === undefined ? true : false,
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
                border: {color: captBorder, width: captBorderWidth},
                background: captBg,
                value: scaleInterval,
                text: captText,
                show: {showCaption: showCaption === 'si' ? true : false, showCaptVal: showValCapt === 'si' ? true : false},
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
        heightImgTag: c.height*(eval(heightImgTag)/1000),
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
            highlight: {color: '#d4e6c080'},
            padding: 1 // {0: grande, 1: mediana, 2: pequeña},
        },
        show: {
            tags: showTags === 'si' ? true : false,
            values: showValues === 'si' ? true : false,
            origen: showOrigin === 'si' ? true : false,
            dobLinesOrigin: {
                size: dobLinesSize,
                gradient: dobLinesGradient
            },
            valuesSeparator: valuesSeparator
        }
    }

    let imgInTags = false
    state.chart.tags.map( (tag) => {
        if (tag.includes('http')) {
            imgInTags = true
        }
        return
    })

    let tagWordSizeX = 0, tagWordSizeY = 0, valueWordSizeY = 0/*, valueWordSizeX = 0*/, maxWord = 0, maxWordIndex;
    state.ctx.font = `${state.font.size}px ${state.font.family}`
    state.chart.tags.map( (el,index) => {
        if(el.length >= maxWord) {
         maxWord = el.length
         maxWordIndex = index
        }
    })
    maxWord = state.chart.tags[maxWordIndex]

    let tagImgHeightV = 0
    let tagSizeLength = 0
    let tagImgHeightH = 0
    if (!imgInTags) {
        if (state.chart.orientation == 'vertical') {
            tagWordSizeX = Math.sin(state.chart.config.girarTextos.tags*Math.PI/180)*state.ctx.measureText(maxWord).width
            valueWordSizeY = state.scale.max > mainMaxValue ? state.ctx.measureText(state.scale.max).width : state.ctx.measureText(mainMaxValue).width 
        } else {
            tagWordSizeY = Math.cos(state.chart.config.girarTextos.tags*Math.PI/180)*state.ctx.measureText(maxWord).width
            //valueWordSizeX = state.ctx.measureText(Math.max(...state.chart.values)).width
        }
    } else {
        if (state.chart.orientation === 'vertical') {
            tagImgHeightV = state.chart.heightImgTag
            state.ctx.font = state.font.size + 'px ' + state.font.family
            tagSizeLength = state.ctx.measureText(Math.max(...state.chart.values)).width
        } else {
            tagImgHeightH = state.chart.heightImgTag
            tagSizeLength = state.ctx.measureText(Math.max(...state.chart.values)).width > tagImgHeightH ? state.ctx.measureText(Math.max(...state.chart.values)).width : tagImgHeightH
        }
    }
    
    state.container = {
        padding: {
            top: c.height*paddingAux.container.top/1000 + state.titles.mainTitle.font.size + 10,
            right: c.width*paddingAux.container.right/1000,
            bottom: c.height*paddingAux.container.bottom/1000 + state.titles.titleX.font.size + 10 + tagImgHeightV,
            left: c.width*paddingAux.container.left/1000 + state.titles.titleY.font.size + 10 + tagImgHeightH + tagSizeLength
        }
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
    state.chart.style.innerPadding.y = (state.chart.position.y1 - state.chart.position.y0)*(paddingAux.innerChart.y/1000)

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

    if (state.chart.orientation != 'vertical') {
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
    let chartDivisionsNumber = (state.scale.max - state.scale.min)/state.scale.value
    if (chartDivisionsNumber >= 50) {
        data.chartDivisions = 50
        state.scale.value = state.scale.max / data.chartDivisions
    } else {
        data.chartDivisions = chartDivisionsNumber
    }
    // console.log(state)
    // console.log(data)
    initEx(state)

    function initEx(state) {
        const { ctx, scale, chart } = state
        const { config, show, type } = chart
        ctx.save()
        chart.config.hightLightBar != '' && resaltarBarras(state)
        insTitulos(state)
        insGrafico(state)
        scale.width > 0 && insGuias(state)
        if (chart.values.length > 0) {
            if (type == 'pictorico') {
                datosPictoricos(state)
            } else {
                datosSimbolicos(state)
            }
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
        state.chart.image.caption.show.showCaption && insLeyenda(state)
    }
    
    // Generar Gráfico Datos Histograma
    function datosSimbolicos(state){
        insBarras(state)
    }
    
    // Insertar Leyenda
    function insLeyenda(state) {
        const { ctx, container, chart, /*innerChart,*/ font } = state
        const { caption } = chart.image
        const { width, height } = data.innerChart
        ctx.save()
    
        let img = new Image()
        img.src = chart.image.src
        let imgSize = 0.15
        let imgW = height > width ? width*imgSize : data.innerChart.height*imgSize
        let imgH = imgW
        let captText = caption.show.showCaptVal ? ' = ' + caption.value + ' ' + caption.text : ' ' + caption.text
        ctx.font = `bold ${caption.font.size}px ${caption.font.family}`
        ctx.fillStyle = caption.font.color
        let captTextW = ctx.measureText(captText).width
        //let captBox = caption.show.showCaptVal ? 0.5 : 0.2
        ctx.beginPath()
        ctx.fillStyle = caption.background
        ctx.rect(chart.position.x1, container.position.y0 - imgH*0.2, -(imgW*1.2 + captTextW), imgH + imgH*0.2)
        ctx.fill()
        ctx.closePath()
        ctx.beginPath()
        ctx.strokeStyle = caption.border.color
        ctx.lineWidth = caption.border.width
        ctx.strokeRect(chart.position.x1, container.position.y0 - imgH*0.2, -(imgW*1.2 + captTextW + 10), imgH + imgH*0.2)
        ctx.closePath()
        //let captTextH = ctx.measureText(captText).height
        ctx.beginPath()        
        ctx.fillStyle = font.color
        ctx.textAlign = 'right'
        ctx.textBaseline = 'middle'
        ctx.fillText(captText, chart.position.x1 - 10, container.position.y0 + imgH/2)
        img.onload = function() {
            ctx.drawImage(img,chart.position.x1 - imgW - captTextW - 10, container.position.y0 - imgH*0.1, imgW,imgH)
        }
        ctx.stroke()
        ctx.fill()
        ctx.closePath()
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
        const { ctx, chart } = state
        const { x0, y0, x1, y1 } = state.chart.position
        ctx.save()
        chart.axis.width > 0 && insEjes(state, x0, y0, x1, y1)
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
        if (axis.showAxisX) {
            ctx.beginPath()
            ctx.moveTo(x0,y1)
            ctx.lineTo(x1,y1)
            ctx.stroke()
            ctx.closePath()
        }
        if (axis.showAxisY) {
            ctx.beginPath()
            ctx.moveTo(x0,y0)
            ctx.lineTo(x0,y1)
            ctx.stroke()
            ctx.closePath()
        }
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
        if (axis.arrowY) {
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
        if (axis.arrowX) {
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
            if (chart.config.dataTags[i]) {
                if (values[i] && tags[i] && chart.config.dataTags[i] !== '1') {
                    if (chart.orientation == 'vertical') {
                        barMargin = (data.innerChart.width/data.lenTag)*chart.bars.separation
                        newBarWidth = (data.innerChart.width/data.lenTag) - barMargin
                        delta = (newBarWidth + barMargin)
                        ctx.textAlign = 'center'
                        ctx.textBaseline = 'bottom'
                        if (chart.config.dataTags[i] === '0') {
                            ctx.fillText(values[i], x0 + delta/2 +  delta*i, y1 - (data.innerChart.height/data.chartDivisions)*(((values[i]) - scale.min)/scale.value))
                        } else {
                            ctx.fillText(chart.config.dataTags[i], x0 + delta/2 +  delta*i, y1 - (data.innerChart.height/data.chartDivisions)*(((values[i]) - scale.min)/scale.value))
                        }
                    } else {
                        barMargin = (data.innerChart.height/data.lenTag)*chart.bars.separation
                        newBarWidth = (data.innerChart.height/data.lenTag) - barMargin
                        delta = (newBarWidth + barMargin)
                        ctx.textAlign = 'left'
                        ctx.textBaseline = 'middle'
                        if (chart.config.dataTags[i] === '0') {
                            ctx.fillText(values[i], x0 + 5 + (data.innerChart.width/data.chartDivisions)*(((values[i]) - scale.min)/scale.value), y1 - delta/2 - delta*i)
                        } else {
                            ctx.fillText(chart.config.dataTags[i], x0 + 5 + (data.innerChart.width/data.chartDivisions)*(((values[i]) - scale.min)/scale.value), y1 - delta/2 - delta*i)
                        }
                    }
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
                    if (!chart.tags[i].includes('http')) {
                        // si se quiere que el final de la letra quede centrado con respecto a la barra eliminar "a" y ctx.textAlign = girarTexto > 0 ? 'right' : 'center'
                        ctx.textAlign = girarTexto > 0 ? 'center' : 'center'
                        ctx.textBaseline = girarTexto > 0 ? 'middle' : 'top'
                        // si se quiere que el final de la letra quede centrado con respecto a la barra eliminar "a"
                        let a = Math.sin(state.chart.config.girarTextos.tags*Math.PI/180)*state.ctx.measureText(chart.tags[i]).width
                        ctx.translate(x0+ (data.innerChart.width/data.lenTag)/2 + (data.innerChart.width/data.lenTag)*(i), chart.position.y1 + a/2 + 2)
                        girarTexto > 0 && ctx.rotate(-girarTexto*Math.PI/180)
                        ctx.fillText(chart.tags[i], 0,girarTexto > 0 ? 5 : 0)
                    } else {
                        let img = new Image()
                        img.src = chart.tags[i]
                        let imgSize = state.chart.heightImgTag
                        img.onload = function() {
                            let xPosImg = x0 + (data.innerChart.width/data.lenTag)/2 + (data.innerChart.width/data.lenTag)*(i) - imgSize/2
                            let yPosImg = chart.position.y1 + 10
                            ctx.drawImage(img, xPosImg, yPosImg, imgSize, imgSize)
                        }
                    }
                    ctx.restore()
                    ctx.save()
                } else {
                    ctx.save()
                    if (!chart.tags[i].includes('http')) {
                        ctx.textAlign = 'right'
                        ctx.textBaseline = 'middle'
                        // si se quiere que el final de la letra quede centrado con respecto a la barra eliminar "a"
                        let a = Math.sin(state.chart.config.girarTextos.tags*Math.PI/180)*state.ctx.measureText(chart.tags[i]).width
                        ctx.translate(chart.position.x0 - 10, y1 - data.innerChart.height/data.lenTag/2 - data.innerChart.height/data.lenTag*i - a/2)
                        girarTexto > 0 && ctx.rotate(-girarTexto*Math.PI/180)
                        ctx.fillText(chart.tags[i], 0, 0)
                    } else {
                        let img = new Image()
                        img.src = chart.tags[i]
                        let imgSize = state.chart.heightImgTag
                        img.onload = function() {
                            let xPosImg = chart.position.x0 - 10 - imgSize
                            let yPosImg = y1 - data.innerChart.height/data.lenTag/2 - data.innerChart.height/data.lenTag*i - imgSize/2
                            ctx.drawImage(img, xPosImg, yPosImg, imgSize, imgSize)
                        }
                    }
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
        let lineSize = data.innerChart.width*(chart.show.dobLinesOrigin.size/1000)
        let angle = chart.show.dobLinesOrigin.gradient
        if (chart.orientation == 'vertical') {
            ctx.textAlign = 'right'
            ctx.textBaseline = 'middle'
            for (let i = 0; i <= data.chartDivisions; i ++) {
                let valorImprimir = scale.min + scale.value*i
                if (chart.show.valuesSeparator != '') {
                    valorImprimir = formatearNumeros(valorImprimir, chart.show.valuesSeparator)
                }
                if (i === 0) {
                    chart.show.origen && ctx.fillText(0,chart.position.x0 - 5, y1)
                } else {
                    ctx.beginPath()
                    ctx.fillText(valorImprimir,chart.position.x0 - 5, y1 - (data.innerChart.height/(data.chartDivisions))*(i))
                    ctx.closePath()
                }
            }
            if (scale.min > 0) {
                ctx.beginPath()
                ctx.strokeStyle = font.color
                ctx.translate(chart.position.x0, y1 - data.innerChart.height/(data.chartDivisions)/3)
                ctx.rotate(-angle*Math.PI/180)
                ctx.moveTo(-lineSize,0)
                ctx.lineTo(lineSize,0)
                ctx.stroke()
                ctx.closePath()
                ctx.restore()
                ctx.beginPath()
                ctx.strokeStyle = font.color
                ctx.translate(chart.position.x0, y1 - data.innerChart.height/(data.chartDivisions)/3 - 5)
                ctx.rotate(-angle*Math.PI/180)
                ctx.moveTo(-lineSize,0)
                ctx.lineTo(lineSize,0)
                ctx.stroke()
                ctx.closePath()
                ctx.restore()
            }
        } else {
            ctx.textAlign = 'center'
            ctx.textBaseline = 'top'
            for (let i = 0; i <= data.chartDivisions; i ++) {
                let valorImprimir = scale.min + scale.value*i
                if (chart.show.valuesSeparator != '') {
                    valorImprimir = formatearNumeros(valorImprimir, chart.show.valuesSeparator)
                }
                if (i === 0) {
                    chart.show.origen && ctx.fillText(0,x0, chart.position.y1 + 5)
                } else {
                    ctx.beginPath()
                    ctx.fillText(valorImprimir,x0 + (data.innerChart.width/(data.chartDivisions))*(i), chart.position.y1 + 5)
                    ctx.closePath()
                }
            }
            if (scale.min > 0) {
                ctx.beginPath()
                ctx.strokeStyle = font.color
                ctx.translate(x0 + data.innerChart.height/(data.chartDivisions)/3, chart.position.y1)
                ctx.rotate(-angle*Math.PI/180)
                ctx.moveTo(0,lineSize)
                ctx.lineTo(0,-lineSize)
                ctx.stroke()
                ctx.closePath()
                ctx.restore()
                ctx.beginPath()
                ctx.strokeStyle = font.color
                ctx.translate(x0 + data.innerChart.height/(data.chartDivisions)/3 + 5, chart.position.y1)
                ctx.rotate(-angle*Math.PI/180)
                ctx.moveTo(0,-lineSize)
                ctx.lineTo(0,lineSize)
                ctx.stroke()
                ctx.closePath()
                ctx.restore()
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
            for (let i = 0; i <= data.chartDivisions; i ++) {
                ctx.beginPath()
                if (chart.orientation == 'vertical') {
                    ctx.moveTo(chart.position.x0 + chart.axis.width/2, chart.position.y1 - chart.axis.width/2 - data.innerChart.height/data.chartDivisions*(i))
                    ctx.lineTo(chart.position.x1 - chart.axis.width, chart.position.y1 - chart.axis.width/2 - data.innerChart.height/data.chartDivisions*(i))
                } else {
                    ctx.moveTo(chart.position.x0 + chart.axis.width/2 + data.innerChart.width/data.chartDivisions*(i), chart.position.y1 - chart.axis.width/2)
                    ctx.lineTo(chart.position.x0 + chart.axis.width/2 + data.innerChart.width/data.chartDivisions*(i), chart.position.y0 + chart.axis.width)
                }
                ctx.stroke()
                ctx.closePath()
            }
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

    // formatear números
    function formatearNumeros(valor, tipoSeparador) {
        switch (tipoSeparador) {
            case 'punto':
                tipoSeparador = '.'
                break;
            case 'coma':
                tipoSeparador = ','
            break;
            case 'espacio':
                tipoSeparador = ' '
            break;
        
            default:
                tipoSeparador = ''
                break;
        }
        return valor.toString().replace(/\B(?=(\d{3})+(?!\d))/g, tipoSeparador);
    }
}