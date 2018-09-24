import { replace } from 'actions'

export function transportador(config) {
  const { container, params, variables, versions, vt } = config
  const {
    // Estilos
    fontFamily, fontSize, fontColor, primaryBgColor, primaryColor,
    // General
    transpType,
    // Ángulos
    anguloA, anguloB,
    // Ángulo interno
    angIntSentido, nombreAnguloInt,
    // Ángulo interno
    angExtSentido, nombreAnguloExt
  } = params

  if (!container) return
  let maxWidth = container.parentElement.offsetWidth, 
      responsive = params.width < maxWidth,
      width = responsive ? params.width : maxWidth - 15, 
      height = responsive ? params.height : width

  container.width = width
  container.height = height

  let c = container
  let vars = vt ? variables : versions

  // State del gráfico
  let state = {}
  state.style = {
    font: {
      family: fontFamily,
      size: fontSize,
      color: fontColor
    },
    elements: {
      colors: {
        primaryColor,
        primaryBgColor
      }
    }
  }
  state.ctx = c.getContext('2d')
  state.container = { width: c.width, height: c.height }
  state.transpType = transpType === '180°' ? true : false
  state.angulos = { anguloA, anguloB }
  state.interno = {
    sentido: angIntSentido,
    nombre: nombreAnguloInt
  }
  state.externo = {
    //angulo: transpType === '180°' ? angExtDesde : false,
    sentido: angExtSentido,
    nombre: nombreAnguloExt
  }
  state.imagenes = {
    // transp180: 'https://desarrolloadaptatin.blob.core.windows.net/imagenesprogramacion/Eje_3/OA_19/IE_04/Transportador180.svg',
    transp180: 'https://desarrolloadaptatin.blob.core.windows.net/genericos/Transportador_GEO/Transportador.svg',
    transp360: 'https://desarrolloadaptatin.blob.core.windows.net/imagenesprogramacion/Eje_3/OA_19/IE_05/F762_transportador360.svg'
  }

  init(state)

  function init(state) {
    const { transpType, container, imagenes } = state
    const { transp180, transp360 } = imagenes
    let anchoImg, altoImg
    if (transpType) {
      anchoImg = container.width*2/3
      altoImg = transpType ? anchoImg/2 : anchoImg
    } else {
      altoImg = container.height/2
      anchoImg = transpType ? altoImg*2 : altoImg
    }
    let mainData = {
      img: {
        url: transpType ? transp180 : transp360,
        centroX: anchoImg/2,
        centroY: transpType ? altoImg*0.95 : altoImg/2,
        ancho: anchoImg,
        alto: altoImg
      },
      angulo: {
        centroX: anchoImg/2,
        centroY: transpType ? altoImg*0.95 : altoImg/2,
        largoLinea: anchoImg/2*0.85,
        arcoRadio: anchoImg/4*0.85,
        nombreAngRadio: anchoImg/4*0.70
      }
    }
    dibujarTransportador(state, mainData)
  }
  function dibujarTransportador(state, mainData) {
    const { ctx } = state
    ctx.lineWidth = 2
    ctx.fillStyle = '#077C7E'
    ctx.strokeStyle = '#077C7E'
    ctx.save()
    let imgTransp = new Image()
    imgTransp.src = mainData.img.url
    imgTransp.onload = function() {
      ctx.drawImage(imgTransp, 0,0, mainData.img.ancho, mainData.img.alto)  
      ctx.beginPath()
      ctx.arc(mainData.angulo.centroX, mainData.angulo.centroY, 3, 0, 1000)
      ctx.closePath()
      ctx.stroke()
      ctx.fill()
      mostrarElementos(state, mainData)
    }
    ctx.restore()
    ctx.save()
  }

  function mostrarElementos(state, mainData) {
    mostrarLineasAngulos(state, mainData)
    mostrarArcos(state, mainData)
  }
  
  function mostrarArcos(state, mainData) {
    const { ctx, angulos, interno, externo, style } = state
    ctx.save()
    if (angulos.anguloA !== '' && angulos.anguloB !== '' ) {
      let esInterno = true
      if (interno.sentido !== 'no') {
        let radioArco = mainData.angulo.arcoRadio
        let antiHorario = interno.sentido !== 'horario' ? true : false
        let anguloANuevo = antiHorario ? -angulos.anguloA*Math.PI/180 : -angulos.anguloB*Math.PI/180
        let anguloBNuevo = antiHorario ? -angulos.anguloB*Math.PI/180 : -angulos.anguloA*Math.PI/180
        dibujarArco(ctx, mainData.angulo.centroX, mainData.angulo.centroY, radioArco, anguloANuevo, anguloBNuevo, antiHorario)
        nombreAngulo(ctx, mainData.angulo.centroX, mainData.angulo.centroY, radioArco, anguloANuevo, anguloBNuevo, interno.nombre, style, esInterno)
      }
      if (externo.sentido !== 'no') {
        esInterno = false
        let radioArco = mainData.angulo.arcoRadio*1.15
        let antiHorario = externo.sentido !== 'horario' ? true : false
        let anguloANuevo = !antiHorario ? -angulos.anguloA*Math.PI/180 : -angulos.anguloB*Math.PI/180
        let anguloBNuevo = !antiHorario ? -angulos.anguloB*Math.PI/180 : -angulos.anguloA*Math.PI/180
        dibujarArco(ctx, mainData.angulo.centroX, mainData.angulo.centroY, radioArco, anguloANuevo, anguloBNuevo, antiHorario)
        nombreAngulo(ctx, mainData.angulo.centroX, mainData.angulo.centroY, radioArco, anguloBNuevo, anguloANuevo, externo.nombre, style, esInterno)
      }
      ctx.stroke()
      ctx.restore()
      ctx.save()
    }
    function nombreAngulo(ctx, x, y, radio, anguloA, anguloB, nombreAngulo, style, esInterno) {
      ctx.save()
      let anguloMenor = Number(anguloA < anguloB ?  anguloA : anguloB)
      let anguloMayor = Number(anguloA > anguloB ?  anguloA : anguloB)
      let anguloMedio, deltaAngulo
      if (esInterno) {
        deltaAngulo = Math.abs((anguloMayor - anguloMenor)/2)
        anguloMedio = anguloMenor + deltaAngulo
      } else {
        deltaAngulo = Math.abs((360*Math.PI/180 - (anguloMayor - anguloMenor))/2)
        anguloMedio = anguloMayor + deltaAngulo
      }
      let nuevoCentroX = x + Math.cos(anguloMedio)*radio*0.8
      let nuevoCentroY = y + Math.sin(anguloMedio)*radio*0.8
      if (!esInterno) {
        anguloMenor
        anguloMayor
      }
      ctx.translate(nuevoCentroX, nuevoCentroY)
      ctx.textBaseline = 'middle'
      ctx.textAlign = 'center'
      ctx.font = `bold ${style.font.size}px ${style.font.family}`
      ctx.strokeStyle = style.font.color
      ctx.fillText(nombreAngulo, 0 ,0)
      ctx.restore()
      ctx.save()
    }
    function dibujarArco(ctx, x, y, radio, iniAng, finAng, antiHorario) {
      // antiHorario === true || false
      ctx.save()
      finAng = antiHorario ? finAng + 1*Math.PI/180 : finAng - 1*Math.PI/180
      ctx.beginPath()
      ctx.arc(x, y, radio, iniAng, finAng, antiHorario)
      ctx.stroke()
      ctx.restore()
      ctx.save()
      generarFlechas(ctx, x, y, finAng, antiHorario, radio)
      function generarFlechas(ctx, centroX, centroY, angulo, sentido, radioArc) {
        let sentidoFlecha = sentido ? 1 : -1
        let nuevoCentroX = centroX + Math.cos(angulo)*radioArc
        let nuevoCentroY = centroY + Math.sin(angulo)*radioArc
        ctx.translate(nuevoCentroX, nuevoCentroY)
        let deltaAngulo = 40*Math.PI/180
        let deltaLargoFlecha = centroX/20
        // Mitad Flecha
        ctx.rotate(angulo)
        ctx.rotate(deltaAngulo)
        ctx.beginPath()
        ctx.moveTo(0, 0)
        ctx.lineTo(0, sentidoFlecha*deltaLargoFlecha)
        ctx.closePath()
        ctx.stroke()
        ctx.restore()
        // Mitad Flecha
        ctx.translate(nuevoCentroX, nuevoCentroY)
        ctx.rotate(angulo)
        ctx.rotate(-deltaAngulo)
        ctx.beginPath()
        ctx.moveTo(0, 0)
        ctx.lineTo(0, sentidoFlecha*deltaLargoFlecha)
        ctx.closePath()
        ctx.stroke()
        ctx.restore()
      }
    }
  }
  function mostrarLineasAngulos(state, mainData) {
    const { ctx, angulos } = state
    angulos.anguloA !== '' && mostrarLinea(ctx, angulos.anguloA, mainData.angulo.centroX, mainData.angulo.centroY, mainData.angulo.largoLinea)
    angulos.anguloB !== '' && mostrarLinea(ctx, angulos.anguloB, mainData.angulo.centroX, mainData.angulo.centroY, mainData.angulo.largoLinea)
    function mostrarLinea(ctx, angulo, centroX, centroY, largoLinea) {
      ctx.save()
      ctx.translate(centroX, centroY)
      ctx.rotate(-angulo*Math.PI/180)
      ctx.beginPath()
      ctx.moveTo(0, 0)
      ctx.lineTo(largoLinea, 0)
      ctx.closePath()
      ctx.stroke()
      ctx.fill()
      ctx.restore()
      ctx.save()
    }
  }
}