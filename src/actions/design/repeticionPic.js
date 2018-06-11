export function billetesMonedas(config) {
  const { container, params, variables, versions, vt } = config

  const {
    // height, width, background,
    // Borde
    //borderWidth, borderColor, borderStyle, borderRadius,
    // Título
    titleValue, titleColor, titleSize, titleWeight,
    // Padding
    canvasPadding, containerPadding, chartPadding,
    // Fuente
    fontColor, fontSize, fontFamily, fontWeight,
    // Valores
    /*cantElem: 1*/
    repetElem1, urlElem1, repetElem2, urlElem2, repetElem3, urlElem3, repetElem4, urlElem4,
    repetElem5, urlElem5, repetElem6, urlElem6, repetElem7, urlElem7,
    elemType1, elemType2, elemType3, elemType4, elemType5, elemType6, elemType7
  } = params

  if (!container) return
  let maxWidth = container.parentElement.offsetWidth, responsive = params.width < maxWidth,
      width = responsive ? params.width : maxWidth - 15, height = responsive ? params.height : width

  container.width = width
  container.height = height

  let c = container

  let vars = vt ? variables : versions

  let canvasPaddingAux = {}, containerPaddingAux = {}, chartPaddingAux = {}/*, innerChartPaddingAux = {}*/
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

  let state = {}
  state.ctx = container.getContext('2d')
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
    y0: state.canvas.position.y0 + state.container.padding.top + titleSize,
    x1: state.canvas.position.x1 - state.container.padding.right,
    y1: state.canvas.position.y1 - state.container.padding.bottom
  }
  state.chart = {
    padding: {
      top: c.height*(chartPaddingAux.top/1000),
      right: c.width*(chartPaddingAux.right/1000),
      bottom: c.height*(chartPaddingAux.bottom/1000),
      left: c.width*(chartPaddingAux.left/1000)
    }
  }
  state.chart.position = {
    x0: state.container.position.x0 + state.chart.padding.left,
    y0: state.container.position.y0 + state.chart.padding.top,
    x1: state.container.position.x1 - state.chart.padding.right,
    y1: state.container.position.y1 - state.chart.padding.bottom
  }
  state.pictorics = [
    {
      elem: elemType1,
      qtty: repetElem1
    },
    {
      elem: elemType2,
      qtty: repetElem2
    },
    {
      elem: elemType3,
      qtty: repetElem3
    },
    {
      elem: elemType4,
      qtty: repetElem4
    },
    {
      elem: elemType5,
      qtty: repetElem5
    },
    {
      elem: elemType6,
      qtty: repetElem
    },
    {
      elem: elemType7,
      qtty: repetElem7
    }    
  ]
  state.images = [
    {
      name: 'moneda 1',
      url: 'https://desarrolloadaptatin.blob.core.windows.net:443/agapito/1_1.png',
      width: 66,
      height: 66
    },
    {
      name: 'moneda 5',
      url: 'https://desarrolloadaptatin.blob.core.windows.net:443/agapito/5_1.png',
      width: 66,
      height: 66
    },
    {
      name: 'moneda 10',
      url: 'https://desarrolloadaptatin.blob.core.windows.net:443/agapito/10_1.png',
      width: 66,
      height: 66
    },
    {
      name: 'moneda 50',
      url: 'https://desarrolloadaptatin.blob.core.windows.net:443/agapito/50_1.png',
      width: 66,
      height: 66
    },
    {
      name: 'moneda 100',
      url: 'https://desarrolloadaptatin.blob.core.windows.net:443/agapito/100_1.png',
      width: 72,
      height: 72
    },
    {
      name: 'moneda 500',
      url: 'https://desarrolloadaptatin.blob.core.windows.net:443/agapito/500_1.png',
      width: 72,
      height: 72
    },
    {
      name: 'billete 1000',
      url: 'https://desarrolloadaptatin.blob.core.windows.net:443/agapito/1000_1.png',
      width: 120,
      height: 60
    }
  ]
  
  // drawRects(state, state.canvas, 'red')
  // drawRects(state, state.container, 'blue')
  // drawRects(state, state.chart, 'green')

  init(state)
}

// Dibuja los espacios definidos, container, chart
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

function init(state) {
  insertarTituloPrincipal(state)
  insertarPictoricos(state)
}


// Main Title
function insertarTituloPrincipal(state) {
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

function insertarPictoricos(state) {
  const { ctx, chart, pictorics, images } = state
  const { x0, y0, x1 } = chart.position
  // pictorics ==> elem, qtty
  // images ==> name, url, width, height
  let canvasWidth = x1 - x0
  let imgArr = []
  let xDist = [0]
  pictorics.map((pic,index) => {
    images.map((img,index2) => {
      if (pic.qtty !== 0 && pic.elem === img.name) {
        imgArr.push({
          name: img.name,
          qtty: pic.qtty,
          url: img.url,
          width: img.width,
          height: img.height, 
          xPos: x0 + xDist[index],
          yPos: y0
        })
        xDist.push(img.name === 'billete 1000' ? xDist[index] + img.width + 30 : xDist[index] + img.width + 20)
      }
    })
  })
  imgArr.map((img,index) => {
    if (img.qtty > 0) {
      let picImg = new Image()
      picImg.src = img.url
      picImg.width = img.width
      picImg.height = img.height
      picImg.onload = function() {
        for (let i = 0; i < img.qtty; i++) {
          let xPos = img.name === 'billete 1000' ? img.xPos + img.width/12*i : img.xPos + img.width/6*i
          let yPos = img.yPos + img.height/4*i
          ctx.drawImage(picImg, xPos, yPos)
        }
      }
    }
  })  
}