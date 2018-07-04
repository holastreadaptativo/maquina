export function repeticionPic(config) {
  const { container, params, variables, versions, vt } = config

  const {
    pictoricType,
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
    cantElem,
    elemData
  } = params
  if (!container) return
  let maxWidth = container.parentElement.offsetWidth, responsive = params.width < maxWidth,
      width = responsive ? params.width : maxWidth - 15, height = params.height//height = responsive ? params.height : width

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
  state.cantElem = eval(cantElem)
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
    type: pictoricType,
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
  state.chart.width = state.chart.position.x1 - state.chart.position.x0,
  state.chart.height = state.chart.position.y1 - state.chart.position.y0
  
  state.pictorics = []
  for (let i = 0; i < elemData.length; i++) {
    let elemType = 'elemType' + (i+1)
    let repetElem = 'repetElem' + (i+1)
    state.pictorics.push({
      elem: elemData[i][elemType],
      qtty: Number(elemData[i][repetElem])
    })
  }
  
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
    },
    {
      name: 'bloque unidad',
      url: 'https://desarrolloadaptatin.blob.core.windows.net/imagenesprogramacion/Bloques%20multibase/Unidad_Original.png',
      width: 120,
      height: 60
    },
    {
      name: 'bloque decena',
      url: 'https://desarrolloadaptatin.blob.core.windows.net/imagenesprogramacion/Bloques%20multibase/Decenas_Original.png',
      width: 120,
      height: 60
    },
    {
      name: 'bloque centena',
      url: 'https://desarrolloadaptatin.blob.core.windows.net/imagenesprogramacion/Bloques%20multibase/Cien_Original.png',
      width: 120,
      height: 60
    },
    {
      name: 'bloque mil',
      url: 'https://desarrolloadaptatin.blob.core.windows.net/imagenesprogramacion/Bloques%20multibase/Mil_Original.png',
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
  const { ctx, chart, pictorics, images, cantElem } = state
  const { x0, y0, x1 } = chart.position
  // pictorics ==> elem, qtty
  // images ==> name, url, width, height
  let imgArr = []
  let chartWidth = x1 - x0
  let maxPictoricWidth = 0
  let xDist = [x0]
  let yDist = [y0]
  let reduceImgPercent = 1
  let imagesMargin = []
  let deltaX = x0, deltaY = y0
  pictorics.map((pic,index) => {
    images.map((img,index2) => {
      if (pic.elem === img.name && index < cantElem && pic.qtty > 0) {
        imgArr.push({
          name: img.name,
          url: img.url,
          width: img.width,
          height: img.height,
          qtty: pic.qtty,
          images: [],
        })
      }
      if (img.width > 0) { imagesMargin.push(img.height) }
    })
  })
  imagesMargin = imagesMargin.sort((a, b) => {a-b}).shift()
  imgArr.map((img,i) => {
    let multImgRept = i === imgArr.length - 1 ? img.qtty : 0
    console.log(multImgRept)
    console.log(i)
    maxPictoricWidth += eval(img.width) + imagesMargin/2 + multImgRept*imagesMargin/8
  })
  maxPictoricWidth -= (imagesMargin/2 - imagesMargin/8)
  if (chartWidth < maxPictoricWidth) {
    reduceImgPercent = chartWidth/maxPictoricWidth
  }
  imagesMargin = imagesMargin*reduceImgPercent
  imgArr.map((img, index) => {
    img.width = img.width*reduceImgPercent
    img.height = img.height*reduceImgPercent
    //console.log(img.width)
    let distImgReptVertical = 0, distImgReptHorizontal = 0

    if (imgArr[index - 1] && imgArr[index - 1].name === 'billete 1000') {
      //console.log('if')
      deltaX += index === 0 ? 0 : imgArr[index - 1].width + imagesMargin/2
      deltaY += 0
    } else if (imgArr[index].name === 'billete 1000') {
      // console.log('else if')
      deltaX += index === 0 ? 0 : imgArr[index - 1].width + imagesMargin/2
      deltaY += 0
    } else {
      // console.log('else')
      deltaX += index === 0 ? 0 : img.width + imagesMargin/2
      deltaY += 0
    }

    for (let i = 0; i < img.qtty; i++) {
      distImgReptVertical = imagesMargin/4*i
      distImgReptHorizontal = imagesMargin/8*i

      img.images.push({
        xPos: deltaX + distImgReptHorizontal,
        yPos: deltaY + distImgReptVertical
      })
    }

  })
  dibujarPictoricos(imgArr)
  function dibujarPictoricos(imgArr) {
    imgArr.map((img,index) => {
      let picImg = new Image()
      picImg.src = img.url
      picImg.onload = function() {
        for (let i = 0; i < img.qtty; i++) {
          ctx.drawImage(picImg, img.images[i].xPos, img.images[i].yPos, img.width, img.height)
        }
      }
    })
  }
  //console.log(imgArr)
}

function insertarPictoricos1(state) {
  const { ctx, chart, pictorics, images, cantElem } = state
  const { x0, y0/*, x1*/ } = chart.position
  // pictorics ==> elem, qtty
  // images ==> name, url, width, height
  let imgArr = []
  let xDist = [0]
  let chartWidth = state.chart.width

  pictorics.map((pic,index) => {
    images.map((img,index2) => {
      if (index < cantElem && pic.qtty !==  0 && pic.elem === img.name) {
        imgArr.push({
          name: img.name,
          qtty: pic.qtty,
          url: img.url,
          width: img.width,
          height: img.height, 
          xPos: x0 + xDist[index],
          yPos: y0
        })
        let newVal = 0
        switch (img.name) {
          case 'billete 1000':
            newVal = images[index2-1].name === 'billete 1000' ? xDist[index] + (img.width + img.width/4)*(1+reduceImgPercent) : xDist[index] + (img.width + img.width/6)*(1+reduceImgPercent)
            break;
        
          default:
            newVal = xDist[index] + (img.width + img.width/3)*(1+reduceImgPercent)
            break;
        }
        xDist.push(newVal)
        //xDist.push(img.name === 'billete 1000' ? xDist[index] + img.width + 40 : xDist[index] + img.width + 20)
      }
    })
  })

  let lastImg = pictorics[cantElem - 1] !== undefined ? pictorics[cantElem - 1] : 0
  console.log(lastImg)
  let typeImg = lastImg.elem === 'billete 1000' ? 12 : 6
  console.log(typeImg)
  let imagesWidth = 0
  images.map((img,index2) => {
    if (lastImg.elem === img.name) {
      imagesWidth = img.xPos + img.width + (lastImg.qtty - 1)*img.width/typeImg
    }
  })
  console.log(imagesWidth)
  let reduceImgPercent = 0
  if (chartWidth < imagesWidth) {
    console.log('asdlskldalksadlsdalkas')
    reduceImgPercent = (chartWidth - imagesWidth)/chartWidth
  }
  console.log(reduceImgPercent)

  
  imgArr.map((img,index) => {
    if (img.qtty > 0 && index < cantElem) {
      let picImg = new Image()
      picImg.src = img.url
      picImg.onload = function() {
        for (let i = 0; i < img.qtty; i++) {
          let xPos = img.name === 'billete 1000' ? img.xPos*(1+reduceImgPercent) + img.width/12*i : img.xPos*(1+reduceImgPercent) + img.width/6*i
          let yPos = img.yPos + img.height/4*i
          ctx.drawImage(picImg, xPos, yPos, img.width*(1+reduceImgPercent),img.height*(1+reduceImgPercent))
        }
      }
    }
  })
}