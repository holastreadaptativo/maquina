export function reloj(config) {
  const { container, params, variables, versions, vt } = config;
  var horas = '', minutos = '', segundos = '';

  if(vt && params.clockType === 'Digital') {
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
  const imgSrcDigital = 'https://desarrolloadaptatin.blob.core.windows.net/frontejercicios/imagenes_front/relojes/Reloj_digital_100.png';
  const imgSrcAnalogo = 'https://desarrolloadaptatin.blob.core.windows.net/frontejercicios/imagenes_front/relojes/basereloj.png';
  const imgSrcMinutero = 'https://desarrolloadaptatin.blob.core.windows.net/frontejercicios/imagenes_front/relojes/Minutero_100.png';
  const imgSrcHorario = 'https://desarrolloadaptatin.blob.core.windows.net/frontejercicios/imagenes_front/relojes/Horario_100.png';
  const srcFont = 'https://desarrolloadaptatin.blob.core.windows.net/frontejercicios/fonts/digital-7_italic.ttf';

  let imgReloj = new Image(); 
  imgReloj.src = params.clockType === 'Digital' ? imgSrcDigital : imgSrcAnalogo;
  //const widthCanvasContainer = canvas.parentElement.offsetWidth;
  
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
      //las imagenes de horario y minutero son 200 x 200, la manecilla estan del centro hacia arriba
      let imgMinutero = new Image();
      imgMinutero.src = imgSrcMinutero; //
      let imgHorario = new Image();
      imgHorario.src = imgSrcHorario;
      ctx.translate(container.width / 2, container.height / 2);
      var radio = container.height / 2;
      /* dibuja horario y minutero con palitos :3
      var radio = container.height / 2;
      ctx.translate(container.width / 2, container.height / 2);
      var horasRadianes = horaARadianes(horas, minutos, params.sumarMinutos, params.formato);
      var minutosRadianes = minutosSegundosARadianes(minutos);

      drawHand(ctx, horasRadianes, radio*0.5, radio*0.07);
      drawHand(ctx, minutosRadianes, radio*0.6, radio*0.03);
      */
      imgHorario.onload = function() {
        var horasRadianes = horaARadianes(horas, minutos, params.sumarMinutos, params.formato);
        pegaImagenDeManecilla(ctx, horasRadianes, imgHorario, radio)
      }

      imgMinutero.onload = function() {
        var minutosRadianes = minutosSegundosARadianes(minutos);
        pegaImagenDeManecilla(ctx, minutosRadianes, imgMinutero, container.width)
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
  ctx.font = `${60}px Digital-7`; //cambiar este valor fijo cuando se tenga la imagen real
  ctx.fillStyle = '#175389';
  var separacion = 25;
  var separacionDosPuntos = 6;
  var actual;
  //inicia en la mitad del canvas menos la mitad del largo del texto de la hora
  if(formato === '12' && conSegs === 'si') {
    actual = ((ancho / 2) - ((6 * separacion) + (2 * separacionDosPuntos) + separacion ) / 2);
  } else if (formato === '12' && conSegs === 'no'){
    actual = ((ancho / 2) - (4 * separacion) + separacionDosPuntos + separacion);
  } else if (formato === '24' && conSegs === 'si') {
    actual = ((ancho / 2) - ((6 * separacion) + (2 * separacionDosPuntos)) / 2);
  } else {//formato = '24' y conSegundos = 'no'
    actual = ((ancho / 2) - ((4 * separacion) + (2 * separacionDosPuntos)) / 2);
  }
       

  if(horas[0] === '0') { //dibuja primer digito de hora
    ctx.globalAlpha = 0.3;
    ctx.fillText('0', actual, alto / 2);
  } else if (horas[0] === '1') {
    ctx.globalAlpha = 1;
    ctx.fillText(' 1', actual, alto / 2);
  } else {
    ctx.globalAlpha = 1;
    ctx.fillText(horas[0], actual, alto / 2);
  }

  actual = actual + separacion; // separa los digitos

  if(horas[1] === '1') { //dibuja segundo digito de hora
    ctx.globalAlpha = 1;
    ctx.fillText(' 1', actual, alto / 2);
  } else {
    ctx.globalAlpha = 1;
    ctx.fillText(horas[1], actual, alto / 2);
  }

  actual = actual + separacion; // separa los digitos

  ctx.fillText(':', actual, alto / 2); //dibuja dos puntos

  actual = actual + separacionDosPuntos; // separa los digitos

  if(minutos[0] === '0') { //dibuja primer digito de minuto
    ctx.globalAlpha = 0.3;
    ctx.fillText('0', actual, alto / 2);
  } else if (minutos[0] === '1') {
    ctx.globalAlpha = 1;
    ctx.fillText(' 1', actual, alto / 2);
  } else {
    ctx.globalAlpha = 1;
    ctx.fillText(minutos[0], actual, alto / 2);
  }

  actual = actual + separacion; // separa los digitos

  if(minutos[1] === '1') { //dibuja segundo digito de minuto
    ctx.globalAlpha = 1;
    ctx.fillText(' 1', actual, alto / 2);
  } else {
    ctx.globalAlpha = 1;
    ctx.fillText(minutos[1], actual, alto / 2);
  }

  if(conSegs === 'si') {
    actual = actual + separacion;

    ctx.fillText(':', actual, alto / 2);//dos puntos

    actual = actual + separacionDosPuntos;

    if(segundos[0] === '0') {
      ctx.globalAlpha = 0.3;
      ctx.fillText('0', actual, alto / 2);
    } else if (segundos[0] === '1') {
      ctx.globalAlpha = 1;
      ctx.fillText(' 1', actual, alto / 2);
    } else {
      ctx.globalAlpha = 1;
      ctx.fillText(segundos[0], actual, alto / 2);
    }

    actual = actual + separacion;

    if(segundos[1] === '1') {
      ctx.globalAlpha = 1;
      ctx.fillText(' 1', actual, alto / 2);
    } else {
      ctx.globalAlpha = 1;
      ctx.fillText(segundos[1], actual, alto / 2);
    }
  }
  
  if(formato === '12') {
    ctx.globalAlpha = 1;
    ctx.font = `${30}px Digital-7`

    actual = actual + separacion;

    ctx.fillText(amPm, actual, alto / 2); // dibuja hora 'am' o 'pm'
  }
}


