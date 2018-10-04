export function reloj(config) {
  const { container, params, variables, versions, vt } = config;
  var horas = '', minutos = '', segundos = '';

  if(vt && params.clockType === 'Digital') { //vt => si es version tutorial
    horas = String(params.horas).padStart(2,'0');
    minutos = String(params.minutos).padStart(2,'0');
    segundos = String(params.segundos).padStart(2,'0');
  } else if(vt && params.clockType === 'Analogo') {
    horas = Number(params.horas);
    minutos = Number(params.minutos);
    segundos = Number(params.segundos);
  } else if(!vt && params.clockType === 'Digital') {
    horas = String(versions[0].val).padStart(2,'0');
    minutos = String(versions[1].val).padStart(2,'0');
    segundos = String(versions[2].val).padStart(2,'0');
  } else {// no es tutorial y es reloj analogo
    horas = Number(versions[0].val);
    minutos = Number(versions[1].val);
    segundos = Number(versions[2].val);
  }
  //paths de imagenes
  const imgSrcDigital = 'https://desarrolloadaptatin.blob.core.windows.net/frontejercicios/imagenes_front/relojes/Reloj_digital_100.svg';
  const imgSrcAnalogo = 'https://desarrolloadaptatin.blob.core.windows.net/frontejercicios/imagenes_front/relojes/basereloj.svg';
  const imgSrcMinutero = 'https://desarrolloadaptatin.blob.core.windows.net/frontejercicios/imagenes_front/relojes/Minutero_100.svg';
  const imgSrcHorario = 'https://desarrolloadaptatin.blob.core.windows.net/frontejercicios/imagenes_front/relojes/Horario_100.svg';
  const srcFont = 'https://desarrolloadaptatin.blob.core.windows.net/frontejercicios/fonts/digital-7-mono-italic.ttf';

  let imgReloj = new Image(); 
  imgReloj.src = params.clockType === 'Digital' ? imgSrcDigital : imgSrcAnalogo;
  
  var ctx = container.getContext('2d');

  imgReloj.onload = function () {
    container.width = imgReloj.width;
    container.height = imgReloj.height;
    ctx.drawImage(imgReloj, 0, 0, container.width, container.height);
    if(params.clockType === 'Digital') { // si es digital
      var font = new FontFace('Digital-7', `url('${srcFont}')`, {});
      font.load().then(function (loadedFace) {
        document.fonts.add(loadedFace);
        dibujaHoraPorCaracter(ctx, horas, minutos, segundos, params.hora, params.formato, params.conSegundos, container.width, container.height);
      });
    } else { //si es analogico
      let imgMinutero = new Image();
      imgMinutero.src = imgSrcMinutero; //
      let imgHorario = new Image();
      imgHorario.src = imgSrcHorario;
      ctx.translate(container.width / 2, container.height / 2);
      var radio = container.height / 2;
      /* 
      dibuja horario y minutero con palitos :3
      var radio = container.height / 2;
      ctx.translate(container.width / 2, container.height / 2);
      var horasRadianes = horaARadianes(horas, minutos, params.sumarMinutos, params.formato);
      var minutosRadianes = minutosSegundosARadianes(minutos);

      drawHand(ctx, horasRadianes, radio*0.5, radio*0.07);
      drawHand(ctx, minutosRadianes, radio*0.6, radio*0.03);
      */
      imgMinutero.onload = function() {//59.12 => largo del minutero
        var altoAnchoImg = imgMinutero.height + ((container.width * 0.3703));
        var minutosRadianes = minutosSegundosARadianes(minutos);
        ctx.imageSmoothingEnabled = false;
        var x = ((container.width - altoAnchoImg) / 2) - (container.width / 2);
        ctx.rotate(minutosRadianes);
        ctx.drawImage(imgMinutero, x, x, altoAnchoImg, altoAnchoImg);
        ctx.rotate(-minutosRadianes);
        //pegaImagenDeManecilla(ctx, minutosRadianes, imgMinutero, container.width)
      }

      imgHorario.onload = function() {//39.12 => largo del horario
        var altoAnchoImg = imgHorario.height + ((container.width * 0.2279));
        var horasRadianes = horaARadianes(horas, minutos, params.sumarMinutos, params.formato);
        ctx.imageSmoothingEnabled = false;
        var x = ((container.width - altoAnchoImg) / 2) - (container.width / 2);
        ctx.rotate(horasRadianes);
        ctx.drawImage(imgHorario, x, x, altoAnchoImg, altoAnchoImg);
        ctx.rotate(-horasRadianes);
      }

      if(params.conSegundos == 'si') {
        var segundosRadianes = minutosSegundosARadianes(segundos);
        drawHand(ctx, segundosRadianes, radio*0.7, radio*0.01);
        ctx.stroke();
      }
    }
  };
}

function drawHand(ctx, pos, length, width) {
  ctx.beginPath();
  ctx.lineWidth = width;
  ctx.lineCap = "round";
  ctx.moveTo(0,0);
  ctx.rotate(pos);
  ctx.lineTo(0, -length);
  ctx.stroke();
  ctx.rotate(-pos);
}
//las imagenes de horario y minutero son 200 x 200, las manecilla estan del centro hacia arriba
function pegaImagenDeManecilla(ctx, pos, img, width) {
  var x = ((width - img.height) / 2) - (width / 2); //290 - (200 / 2) = 90 => 90 / 2 = 45
  ctx.rotate(pos);
  ctx.drawImage(img, x, x, img.width, img.height);
  ctx.rotate(-pos);
}

function horaARadianes(horas, minutos, considerarMinutos, formato) {
  var hora = formato === '24' ? horas % 12 : horas;
  if(considerarMinutos === 'si') {
    hora = (hora * Math.PI / 6) + (minutos * Math.PI/(6*60));
  } else {
    hora = (hora * Math.PI / 6);
  }
  return hora;
}

function minutosSegundosARadianes(minutos) {
  return minutos * Math.PI / 30;
}
/*
ctx = canvas
horas = horas formato: 00
minutos = minutos formato: 00
segundos = segundos formato: 00
amPm = 'am' || 'pm'
formato = '12' || '24'
conSegs = 'si' || 'no'
ancho = ancho de canvas
alto = alto de canvas
*/

function dibujaHoraPorCaracter(ctx, horas, minutos, segundos, amPm, formato, conSegs, ancho, alto) {
  var altoTexto = alto * 0.3027;
  ctx.font = `${altoTexto}px Digital-7`; //cambiar este valor fijo cuando se tenga la imagen real
  ctx.fillStyle = '#175389';
  
  var widthHora;
  if(formato === '12' && conSegs === 'si') {
    widthHora = ctx.measureText(`${horas}:${minutos}:${segundos}${amPm[0]}`).width;
  } else if (formato === '12' && conSegs === 'no'){
    widthHora = ctx.measureText(`${horas}:${minutos}${amPm[0]}`).width;
  } else if (formato === '24' && conSegs === 'si') {
    widthHora = ctx.measureText(`${horas}:${minutos}:${segundos}`).width;
  } else {//formato = '24' y conSegundos = 'no'
    widthHora = ctx.measureText(`${horas}:${minutos}`).width;
  }

  var posicionTextoEjeX = (ancho - widthHora) / 2;
  var posicionTextoEjeY = alto * 0.4863;

  if(horas[0] === '0' && horas[1] !== '0') { //dibuja primer digito de hora
    ctx.globalAlpha = 0.3;
    ctx.fillText(horas[0], posicionTextoEjeX, posicionTextoEjeY);
  } else {
    ctx.globalAlpha = 1;
    ctx.fillText(horas[0], posicionTextoEjeX, posicionTextoEjeY);
  }

  posicionTextoEjeX += ctx.measureText(horas[0]).width; // agrega ancho de nuevo caracter

  ctx.globalAlpha = 1;
  ctx.fillText(horas[1], posicionTextoEjeX, posicionTextoEjeY);

  posicionTextoEjeX += ctx.measureText(horas[1]).width; // agrega ancho de nuevo caracter

  ctx.fillText(':', posicionTextoEjeX, posicionTextoEjeY); //dibuja dos puntos

  posicionTextoEjeX += ctx.measureText(':').width; // agrega ancho de nuevo caracter

  if(minutos[0] === '0' && minutos[1] !== '0') { //dibuja primer digito de minuto
    ctx.globalAlpha = 0.3;
    ctx.fillText(minutos[0], posicionTextoEjeX, posicionTextoEjeY);
  } else {
    ctx.globalAlpha = 1;
    ctx.fillText(minutos[0], posicionTextoEjeX, posicionTextoEjeY);
  }

  posicionTextoEjeX += ctx.measureText(minutos[0]).width; // agrega ancho de nuevo caracter

  ctx.globalAlpha = 1;
  ctx.fillText(minutos[1], posicionTextoEjeX, posicionTextoEjeY);

  posicionTextoEjeX += ctx.measureText(minutos[1]).width; // agrega ancho de nuevo caracter

  if(conSegs === 'si') {
    ctx.fillText(':', posicionTextoEjeX, posicionTextoEjeY);//dos puntos

    posicionTextoEjeX += ctx.measureText(':').width; // agrega ancho de nuevo caracter

    if(segundos[0] === '0' && segundos[1] !== '0') {
      ctx.globalAlpha = 0.3;
      ctx.fillText(segundos[0], posicionTextoEjeX, posicionTextoEjeY);
    } else {
      ctx.globalAlpha = 1;
      ctx.fillText(segundos[0], posicionTextoEjeX, posicionTextoEjeY);
    }

    posicionTextoEjeX += ctx.measureText(segundos[0]).width; // agrega ancho de nuevo caracter

    ctx.globalAlpha = 1;
    ctx.fillText(segundos[1], posicionTextoEjeX, posicionTextoEjeY);

    posicionTextoEjeX += ctx.measureText(segundos[1]).width; // agrega ancho de nuevo caracter
  }
  
  if(formato === '12') {
    ctx.globalAlpha = 1;

    ctx.font = `${altoTexto / 2}px Digital-7`

    ctx.fillText(amPm, posicionTextoEjeX, posicionTextoEjeY); // dibuja hora 'am' o 'pm'
  }
}


