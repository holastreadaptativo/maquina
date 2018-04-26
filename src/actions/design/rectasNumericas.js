import { replace } from 'actions'

export function rectNumMixtaFn(config) {
  const { container, params, variables, versions, vt } = config

  const { 
    rectType, rectOrientation, background, borderWidth, borderColor, borderStyle, borderRadius, titleValue,
    titleColor, titleSize, titleWeight, canvasPadding, containerPadding, chartPadding, /*innerChartPadding,*/ rectValuesUnit,
    rectValuesDec, rectValuesCen, valuesSeparator, axisColor, withArrows, axisWidth, fontColor, fontSize, fontFamily, fontWeight, 
    pictoImg, lupaImg
  } = params

  let canvasPaddingAux = {}, containerPaddingAux = {}, chartPaddingAux = {}, innerChartPaddingAux = {}
  canvasPaddingAux.top = eval(canvasPadding.split(',')[0])
  canvasPaddingAux.right = eval(canvasPadding.split(',')[1])
  canvasPaddingAux.bottom = eval(canvasPadding.split(',')[2])
  canvasPaddingAux.left = eval(canvasPadding.split(',')[3])
  containerPaddingAux.top = eval(containerPadding.split(',')[0])
  containerPaddingAux.right = eval(containerPadding.split(',')[1])
  containerPaddingAux.bottom = eval(containerPadding.split(',')[2])
  containerPaddingAux.left = eval(containerPadding.split(',')[3])
  chartPaddingAux.top = eval(chartPadding.split(',')[0])
  chartPaddingAux.right = eval(chartPadding.split(',')[1])
  chartPaddingAux.bottom = eval(chartPadding.split(',')[2])
  chartPaddingAux.left = eval(chartPadding.split(',')[3])
  //innerChartPaddingAux = eval(innerChartPadding)

  if (!container) return
  let maxWidth = container.parentElement.offsetWidth, responsive = params.width < maxWidth,
      width = responsive ? params.width : maxWidth - 15, height = responsive ? params.height : width

  container.width = width
  container.height = height

  let c = container
  let vars = vt ? variables : versions
  let valuesUnit = replace(rectValuesUnit, vars, vt)
  let valuesDec = replace(rectValuesDec, vars, vt)
  let valuesCen = replace(rectValuesCen, vars, vt)

  let state = {

  }
  state.ctx = c.getContext('2d')
  state.font = {
    family: fontFamily,
    weight: fontWeight,
    size: fontSize,
    color: fontColor,
    align: 'left' // end, right, center, start, left
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
      move: { moveY: 0, moveX: 0 }
    }
  }
  state.canvas = {
    height: c.height,
    width: c.width,
    padding: {
      top: c.height*(canvasPaddingAux.top/1000),
      right: c.width*(canvasPaddingAux.right/1000),
      bottom: c.height*(canvasPaddingAux.bottom/1000),
      left: c.width*(canvasPaddingAux.left/1000)
    }
  }
  state.canvas.position = {
    x0: state.canvas.padding.left,
    y0: state.canvas.padding.top,
    x1: c.width - (state.canvas.padding.right),
    y1: c.height - (state.canvas.padding.bottom) 
  }
  state.container = {
    padding: {
      top: c.height*(containerPaddingAux.top/1000),
      right: c.width*(containerPaddingAux.right/1000),
      bottom: c.height*(containerPaddingAux.bottom/1000),
      left: c.width*(containerPaddingAux.left/1000)
    }
  }
  state.container.position = {
    x0: state.canvas.position.x0 + state.container.padding.left,
    y0: state.canvas.position.y0 + state.container.padding.top + state.titles.mainTitle.font.size,
    x1: state.canvas.position.x1 - state.container.padding.right,
    y1: state.canvas.position.y1 - state.container.padding.bottom
  }
  state.chart = {
    orientation: rectOrientation,
    padding: {
      top: c.height*(chartPaddingAux.top/1000),
      right: c.width*(chartPaddingAux.right/1000),
      bottom: c.height*(chartPaddingAux.bottom/1000),
      left: c.width*(chartPaddingAux.left/1000)
    },
    axis: {
      width: axisWidth,
      color: axisColor,
      arrows: withArrows == 'si' ? true : false,
      arrowColor: axisColor
    },
    image: {
      lupa: lupaImg,
      src: pictoImg
    },
    values: { 
      valuesUnit: valuesUnit,
      valuesDec: valuesDec,
      valuesCen: valuesCen
    }
  }
  state.chart.position = {
    x0: state.container.position.x0 + state.chart.padding.left,
    y0: state.container.position.y0 + state.chart.padding.top,
    x1: state.container.position.x1 - state.chart.padding.right,
    y1: state.container.position.y1 - state.chart.padding.bottom
  }

  
  drawRects(state, state.canvas, 'red')
  drawRects(state, state.container, 'blue')
  drawRects(state, state.chart, 'green')
  initFn(state)

}


function drawRects(state, el, color) {
  const { ctx } = state
  ctx.save()
  ctx.beginPath()
  ctx.strokeStyle = color
  ctx.rect(el.position.x0, el.position.y0, el.position.x1 - el.position.x0, el.position.y1 - el.position.y0)
  ctx.stroke()
  ctx.restore()
  ctx.save()
}

function initFn(state) {
  insTitPrinc(state)
  insEjePrincipal(state)
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

// Insertar eje Principal
function insEjePrincipal(state) {
  const { ctx, chart, canvas } = state
  const { x0, x1 } = chart.position
  ctx.save()
  let centerChartY = (canvas.position.y1 - canvas.position.y0)/2
  ctx.lineWidth = chart.axis.width
  ctx.strokeStyle = chart.axis.color

  let arrowsLenght = canvas.height*0.02

  ctx.lineCap="round";
  ctx.lineJoin="round";
  ctx.beginPath()
  ctx.moveTo(x0 + arrowsLenght, centerChartY - arrowsLenght)
  ctx.lineTo(x0, centerChartY)
  ctx.lineTo(x0 + arrowsLenght, centerChartY + arrowsLenght)
  ctx.stroke()
  ctx.beginPath()
  ctx.moveTo(x0, centerChartY)
  ctx.lineTo(x1, centerChartY)
  ctx.stroke()
  ctx.beginPath()
  ctx.moveTo(x1 - arrowsLenght, centerChartY - arrowsLenght)
  ctx.lineTo(x1, centerChartY)
  ctx.lineTo(x1 - arrowsLenght, centerChartY + arrowsLenght)
  ctx.stroke()
  ctx.restore()
  ctx.save()
}