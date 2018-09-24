export function reloj(config) {
  const { container, params, variables, versions, vt } = config;
  if(vt) {
    var horas = String(params.horas).padStart(2,'0');
    var minutos = String(params.minutos).padStart(2,'0');
    var segundos = String(params.segundos).padStart(2,'0');
  } else {
    var horas = String(versions[0].val).padStart(2,'0');
    var minutos = String(versions[1].val).padStart(2,'0');
    var segundos = String(versions[2].val).padStart(2,'0');
  }
  horas = horas === '11' ? '1 1': horas;
  minutos = minutos === '11' ? '1 1': minutos; 
  segundos = segundos === '11' ? '1 1': segundos; 
  //paths de imagenes
  const imgSrcDigital = 'https://desarrolloadaptatin.blob.core.windows.net/frontejercicios/imagenes_front/relojes/Reloj_digital_100.png';
  const imgSrcAnalogo = 'https://desarrolloadaptatin.blob.core.windows.net/frontejercicios/imagenes_front/relojes/basereloj.png';
  const imgSrcMinutero = 'https://desarrolloadaptatin.blob.core.windows.net/frontejercicios/imagenes_front/relojes/Horario_100.png';
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
        ctx.font = `${60}px Digital-7`; //cambiar este valor fijo cuando se tenga la imagen real
        ctx.textAlign = 'center';

        if(params.formato === '12') {
          ctx.fillText(`${horas}:${minutos}${params.hora}`, container.width / 2, container.height / 2);
        } else {
          ctx.fillText(`${horas}:${minutos}`, container.width / 2, container.height / 2);
        }
      });
    } else { //si es analogico
      var radio = container.height / 2;
      ctx.translate(container.width / 2, container.height / 2);
      var horasRadianes = horaARadianes(horas, minutos, params.sumarMinutos, params.formato);
      var minutosRadianes = minutosSegundosARadianes(minutos);

      drawHand(ctx, horasRadianes, radio*0.5, radio*0.07);
      drawHand(ctx, minutosRadianes, radio*0.6, radio*0.03);

      if(params.conSegundos == 'si') {
        var segundosRadianes = minutosSegundosARadianes(segundos);
        drawHand(ctx, segundosRadianes, radio*0.7, radio*0.01);
      }
      
      ctx.stroke();
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


