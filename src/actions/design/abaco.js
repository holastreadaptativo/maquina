import { regex, cargaImagen, cargaFuente } from '../global/tools';

export function abaco(config) {
  const { container, params, variables, versions, vt } = config;
  const { datos, _altoCanvas, _anchoCanvas } = params;
  let srcImagenAbaco = "https://desarrolloadaptatin.blob.core.windows.net/sistemaejercicios/ejercicios/Nivel-4/imagenes_front/abaco/Abaco.svg";
  let srcImagenFicha = "https://desarrolloadaptatin.blob.core.windows.net/sistemaejercicios/ejercicios/Nivel-4/imagenes_front/abaco/Ficha_Abaco.svg";
  let altoCanvas = Number(_altoCanvas), anchoCanvas = Number(_anchoCanvas);
  container.height = altoCanvas;
  container.width = anchoCanvas;
  let ctx = container.getContext('2d');

  var vars = vt ? variables : versions;

  let datosfn = datos.map(obj => {
    switch(obj.tipo) {
      case 'abaco':
        return {
          tipo: obj.tipo,
          altoImg: Number(obj.altoImg),
          unidad: obj.numComp !== '0' ? Number(regex(obj.numComp, vars, vt)[2]) : Number(regex(obj.unidad, vars, vt)),
          decena: obj.numComp !== '0' ? Number(regex(obj.numComp, vars, vt)[1]) : Number(regex(obj.decena, vars, vt)),
          centena: obj.numComp !== '0' ? Number(regex(obj.numComp, vars, vt)[0]) : Number(regex(obj.centena, vars, vt)),
          numComp: Number(regex(obj.numComp, vars, vt)),
          esAgrupado: obj.esAgrupado === 'si' ? true : false,
          grupos: Number(obj.grupos),
          agrupar: obj.esAgrupado === 'si' ? true : false,
          numerosArriba: obj.numerosArriba === 'si' ? true : false,
          agruparCanje: obj.agruparCanje === 'si' ? true : false
        };
      case 'imagen':
        return {
          tipo: obj.tipo,
          src: obj.src,
          altoImg: obj.altoImg,
          texto1: regex(obj.texto1, vars, vt),
          texto2: regex(obj.texto2, vars, vt),
          texto3: regex(obj.texto3, vars, vt),
          texto4: regex(obj.texto4, vars, vt),
          yTexto1: Number(obj.yTexto1),
          yTexto2: Number(obj.yTexto2),
          yTexto3: Number(obj.yTexto3),
          yTexto4: Number(obj.yTexto4),
          altoTexto: Number(obj.altoTexto),
          colorTexto: obj.colorTexto
        };
      case 'texto':
        return {
          tipo: obj.tipo,
          texto1: regex(obj.texto1, vars, vt),
          texto2: regex(obj.texto2, vars, vt),
          texto3: regex(obj.texto3, vars, vt),
          texto4: regex(obj.texto4, vars, vt),
          yTexto1: Number(obj.yTexto1),
          yTexto2: Number(obj.yTexto2),
          yTexto3: Number(obj.yTexto3),
          yTexto4: Number(obj.yTexto4),
          altoTexto: Number(obj.altoTexto),
          colorTexto: obj.colorTexto
        };
    }
  });

  Promise.all([
    cargaImagen(srcImagenAbaco),
    cargaImagen(srcImagenFicha),
    cargaFuente('larkneuethin', 'https://desarrolloadaptatin.blob.core.windows.net/sistemaejercicios/ejercicios/Nivel-4/fonts/LarkeNeueThin.ttf'),
    ...datosfn.map(x => x.tipo === 'imagen' ? cargaImagen(x.src) : null)
  ]).then(function(imagenes){
    let anchoDivicion = _anchoCanvas / datos.length;
    let imagenAbaco = imagenes[0];
    let imagenFicha = imagenes[1];
    for(let i=3; i<imagenes.length; i++) {
      if(datosfn[i-3].tipo === 'imagen') {
        datosfn[i-3].imagen = imagenes[i];
      }
    }
    
    for(let j = 0, centroX, anchoImg, xImg, yImg; j < datosfn.length; j++) {
      centroX = (j * anchoDivicion) + (anchoDivicion / 2);
      switch(datosfn[j].tipo) {
        case 'abaco':
          anchoImg = imagenAbaco.width * datosfn[j].altoImg / imagenAbaco.height;
          xImg = centroX - (anchoImg/2);
          yImg = altoCanvas/2 - datosfn[j].altoImg/2;
          ctx.drawImage(imagenAbaco, xImg, yImg, anchoImg, datosfn[j].altoImg);
          
          let xCentena = centroX - anchoImg/2 + anchoImg*.135;
          let xDecena = centroX;
          let xUnidad = centroX + anchoImg/2 - anchoImg*.135;

          if(datosfn[j].numerosArriba) {
            let yTextoArriba =  altoCanvas/2 - datosfn[j].altoImg/2 - 5;
            ctx.save();
            ctx.textAlign = 'center';
            ctx.font = `15px larkneuethin`;
            ctx.fillStyle = '#000000';
            ctx.fillText(datosfn[j].unidad, xUnidad, yTextoArriba);
            ctx.fillText(datosfn[j].decena, xDecena, yTextoArriba);
            ctx.fillText(datosfn[j].centena, xCentena, yTextoArriba);
            ctx.restore();
          } else {
            let yInicio = altoCanvas/2 + datosfn[j].altoImg/2 - datosfn[j].altoImg*.125;
            let altoImgFicha = datosfn[j].altoImg * .05;
            let anchoImgFicha = imagenFicha.width * altoImgFicha / imagenFicha.height;
            if(datosfn[j].esAgrupado) {
              let espacioFichas = datosfn[j].altoImg - datosfn[j].altoImg*.125
              let altoDiviciones = espacioFichas / datosfn[j].grupos;
              for(let grupo = 0, centroGrupo, yStartUnidades, yStartDecenas, yStartCentenas; grupo < datosfn[j].grupos; grupo++) {
                centroGrupo = yInicio - altoDiviciones - altoDiviciones*grupo + altoDiviciones/2;
                yStartUnidades = centroGrupo + (datosfn[j].unidad * altoImgFicha)/2;
                yStartDecenas = centroGrupo + (datosfn[j].decena * altoImgFicha)/2;
                yStartCentenas = centroGrupo + (datosfn[j].centena * altoImgFicha)/2;
                for(let u = 0, yUnidad; u < datosfn[j].unidad; u++) {
                  yUnidad = yStartUnidades - altoImgFicha - altoImgFicha*u;
                  ctx.drawImage(imagenFicha, xUnidad-anchoImgFicha/2, yUnidad, anchoImgFicha, altoImgFicha);
                }
                for(let d = 0, yDecena; d < datosfn[j].decena; d++) {
                  yDecena = yStartDecenas - altoImgFicha - altoImgFicha*d;
                  ctx.drawImage(imagenFicha, xDecena-anchoImgFicha/2, yDecena, anchoImgFicha, altoImgFicha);
                }
                for(let c = 0, yCentena; c < datosfn[j].centena; c++) {
                  yCentena = yStartCentenas - altoImgFicha - altoImgFicha*c;
                  ctx.drawImage(imagenFicha, xCentena-anchoImgFicha/2, yCentena, anchoImgFicha, altoImgFicha);
                }
                datosfn[j].agrupar && ctx.ellipse(x, y, radiusX, radiusY, rotation, startAngle, endAngle);
              }
            } else {
              for(let u = 0, yUnidad; u < datosfn[j].unidad; u++) {
                yUnidad = yInicio - altoImgFicha - altoImgFicha*u;
                ctx.drawImage(imagenFicha, xUnidad-anchoImgFicha/2, yUnidad, anchoImgFicha, altoImgFicha);
              }
              for(let d = 0, yDecena; d < datosfn[j].decena; d++) {
                yDecena = yInicio - altoImgFicha - altoImgFicha*d;
                ctx.drawImage(imagenFicha, xDecena-anchoImgFicha/2, yDecena, anchoImgFicha, altoImgFicha);
              }
              for(let c = 0, yCentena; c < datosfn[j].centena; c++) {
                yCentena = yInicio - altoImgFicha - altoImgFicha*c;
                ctx.drawImage(imagenFicha, xCentena-anchoImgFicha/2, yCentena, anchoImgFicha, altoImgFicha);
              }
            }
          }
          break;
        case 'imagen':
          anchoImg = datosfn[j].imagen.width * datosfn[j].altoImg / datosfn[j].imagen.height;
          xImg = centroX - (anchoImg/2);
          yImg = altoCanvas/2 - datosfn[j].altoImg/2;
          ctx.drawImage(datosfn[j].imagen, xImg, yImg, anchoImg, datosfn[j].altoImg);
          ctx.save();
          ctx.textAlign = 'center';
          ctx.font = `${datosfn[j].altoTexto}px larkneuethin`;
          ctx.fillStyle = datosfn[j].colorTexto;
          if(datosfn[j].texto1) {
            ctx.fillText(datosfn[j].texto1, centroX, datosfn[j].yTexto1);
          }
          if(datosfn[j].texto2) {
            ctx.fillText(datosfn[j].texto2, centroX, datosfn[j].yTexto2);
          }
          if(datosfn[j].texto3) {
            ctx.fillText(datosfn[j].texto3, centroX, datosfn[j].yTexto3);
          }
          if(datosfn[j].texto4) {
            ctx.fillText(datosfn[j].texto4, centroX, datosfn[j].yTexto4);
          }
          ctx.save();
          break;
        case 'texto':
          ctx.save();
          ctx.textAlign = 'center';
          ctx.font = `${datosfn[j].altoTexto}px larkneuethin`;
          ctx.fillStyle = datosfn[j].colorTexto;
          if(datosfn[j].texto1) {
            ctx.fillText(datosfn[j].texto1, centroX, datosfn[j].yTexto1);
          }
          if(datosfn[j].texto2) {
            ctx.fillText(datosfn[j].texto2, centroX, datosfn[j].yTexto2);
          }
          if(datosfn[j].texto3) {
            ctx.fillText(datosfn[j].texto3, centroX, datosfn[j].yTexto3);
          }
          if(datosfn[j].texto4) {
            ctx.fillText(datosfn[j].texto4, centroX, datosfn[j].yTexto4);
          }
          ctx.save();
          break;
        default:
          console.log('default');
          break;
      }
    }
  }).catch(function(error){
    console.log(error);
  });
}