import { replace } from 'actions'

export function transportador(config) {
  const { container, params, variables, versions, vt } = config
  const {
    // Estilos
    estilos: {
      font: {
        family: fontFamily,
        size: fontSize,
        color: fontColor
      },
      elements: {
        backgroundColor: elBackgroundColor,
        color: elColor
      }
    },
    // General
    transpType,
    // Ángulos
    anguloA, anguloB,
    // Sentido Ángulo
    angIntSentido, nombreAnguloInt, angExtDesde, angExtSentido, nombreAnguloExt
  } = params

  if (!container) return
  let maxWidth = container.parentElement.offsetWidth, responsive = params.width < maxWidth,
      width = responsive ? params.width : maxWidth - 15, height = responsive ? params.height : width

  container.width = width
  container.height = height

  let c = container
  let vars = vt ? variables : versions

  // State del gráfico
  let state = {}
  state.ctx = c.getContext('2d')
  state.container = { width: c.width, height: c.height }
  state.transpType = transpType === '180°' ? true : false
  state.angulos = { anguloA, anguloB }
  state.interno = {
    sentido: angIntSentido,
    nombre: nombreAnguloInt
  }
  state.externo = {
    angulo: transpType === '180°' ? angExtDesde : false,
    sentido: angExtSentido,
    nombre: nombreAnguloExt
  }
  state.imagenes = {
    transp180: 'https://desarrolloadaptatin.blob.core.windows.net/genericos/Transportador_GEO/Transportador.svg',
    transp360: ''
  }

  init(state)

  function init(state) {
    console.log(state)
    const { transpType } = state
    if (transpType) {
      dibujarTransportador180(state)
    } else {
      dibujarTransportador360(state)
    }
  }
  function dibujarTransportador180(state) {
    const { ctx, container, angulos, interno, externo, imagenes } = state
    const { transp180 } = imagenes
    ctx.save()
    let imgTransp = new Image()
    imgTransp.src = transp180
    let anchoImg, altoImg
    anchoImg = container.width*2/3
    altoImg = anchoImg/2
    let centroXTransp = anchoImg/2, centroYTransp = altoImg*0.95
    imgTransp.onload = function() {
      ctx.fillStyle = '#077C7E'
      ctx.strokeStyle = '#077C7E'
      ctx.drawImage(imgTransp, 0,0, anchoImg, altoImg)  
      ctx.beginPath()
      ctx.arc(centroXTransp, centroYTransp, 3, 0, 1000)
      ctx.closePath()
      ctx.stroke()
      ctx.fill()
      ctx.lineWidth = 2
      let largoLinea = centroXTransp*0.85
      angulos.anguloA !== '' && mostrarAnguloLinea(ctx, angulos.anguloA, centroXTransp, centroYTransp, largoLinea)
      angulos.anguloB !== '' && mostrarAnguloLinea(ctx, angulos.anguloB, centroXTransp, centroYTransp, largoLinea)
      let radioArc = largoLinea/2
      if (angulos.anguloA !== '' && angulos.anguloB !== '' && interno.sentido !== 'no') {
        mostrarAnguloInterno(ctx, angulos.anguloA, angulos.anguloB, centroXTransp, centroYTransp, radioArc, interno.sentido)
      }
      //angulos.anguloB !== '' && externo.sentido !== 'no' && mostrarAnguloExterno(ctx, angulos.anguloA, angulos.anguloB, centroXTransp, centroYTransp, radioArc, extrer)      
    }
    ctx.restore()
    ctx.save()
  }
  function dibujarTransportador360(state) {
    console.log('dibujarTransportador360')
  }
  function mostrarAnguloInterno(ctx, anguloA, anguloB, centroX, centroY, radioArc, sentido) {
    ctx.save()
    nombreAnguloInterno(state, centroX, centroY, radioArc)
    let anguloANuevo = -anguloA*Math.PI/180, anguloBNuevo = -anguloB*Math.PI/180
    if (sentido !== 'horario') {
      anguloBNuevo += 1*Math.PI/180
      ctx.arc(centroX, centroY, radioArc, anguloANuevo, anguloBNuevo, true)
      ctx.stroke()
      generarFlechas(ctx, centroX, centroY, anguloBNuevo, sentido)
    } else {
      anguloANuevo -= 1*Math.PI/180
      ctx.arc(centroX, centroY, radioArc, anguloBNuevo, anguloANuevo, false)
      ctx.stroke()
      generarFlechas(ctx, centroX, centroY, anguloANuevo, sentido)
    }
    ctx.stroke()
    ctx.restore()
    ctx.save()
    function generarFlechas(ctx, centroX, centroY, angulo, sentido) {
      let sentidoFlecha = sentido !== 'horario' ? 1 : -1
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
  
  function mostrarAnguloExterno(ctx, anguloA, anguloB, centroX, centroY, radioArc, sentido) {
    ctx.save()
    let anguloANuevo = -anguloA*Math.PI/180, anguloBNuevo = -anguloB*Math.PI/180
    if (sentido !== 'horario') {
      anguloBNuevo += 1*Math.PI/180
      ctx.arc(centroX, centroY, radioArc, anguloANuevo, anguloBNuevo, true)
      ctx.stroke()
      generarFlechas(ctx, centroX, centroY, anguloBNuevo, sentido)
    } else {
      anguloANuevo -= 1*Math.PI/180
      ctx.arc(centroX, centroY, radioArc, anguloBNuevo, anguloANuevo, false)
      ctx.stroke()
      generarFlechas(ctx, centroX, centroY, anguloANuevo, sentido)
    }
    ctx.stroke()
    ctx.restore()
    ctx.save()
    function generarFlechas(ctx, centroX, centroY, angulo, sentido) {
      let sentidoFlecha = sentido !== 'horario' ? 1 : -1
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

  function nombreAnguloInterno(state, centroX, centroY, radioArc) {
    const { ctx, angulos } = state
    const { anguloA, anguloB } = angulos
    const { nombre } = state.interno
    // state.interno = {
    //   sentido: angIntSentido,
    //   nombre: nombreAnguloInt
    ctx.save()
    let anguloMenor = Number(anguloA < anguloB ?  anguloA : anguloB)
    let anguloMayor = Number(anguloA > anguloB ?  anguloA : anguloB)
    let deltaAngulo = Math.abs((anguloMayor - anguloMenor)/2)
    let anguloMedio = anguloMenor + deltaAngulo
    let nuevoCentroX = centroX + Math.cos(-anguloMedio*Math.PI/180)*radioArc*0.7
    let nuevoCentroY = centroY + Math.sin(-anguloMedio*Math.PI/180)*radioArc*0.7
    ctx.translate(nuevoCentroX, nuevoCentroY)
    ctx.fillText(nombre, 0 ,0)
    ctx.restore()
    ctx.save()
  }

  function mostrarAnguloLinea(ctx, angulo, centroX, centroY, largoLinea) {
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