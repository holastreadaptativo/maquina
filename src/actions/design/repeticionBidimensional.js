import { regex, cargaImagen, cargaFuente } from '../global/tools';

export function repeticionBidimensional(config) {
  const { container, params, variables, versions, vt } = config;
  console.log(params);
  const { _separacion, _altoOpciones, _anchoCanvas, _altoCanvas } = params;
  let { datos } = params;
  let sepElem = Number(_separacion);
  let altoOpciones = Number(_altoOpciones);
  let anchoCanvas = Number(_anchoCanvas);
  let altoCanvas = Number(_altoCanvas)
  container.height = altoCanvas;
  container.width = anchoCanvas;
  
  var ctx = container.getContext('2d');
  var vars = vt ? variables : versions;
  
  datos = datos.map(dato => {//arreglo, imagen, texto
    switch(dato.tipo) {
      case 'arreglo':
        return {
          src: regex(dato.src, vars, vt),
          repX: Number(regex(dato.repX, vars, vt)),
          repY: Number(regex(dato.repY, vars, vt)),
          textoEjeX: regex(dato.textoEjeX, vars, vt),
          textoEjeY: regex(dato.textoEjeY, vars, vt),
          opcion: regex(dato.opcion, vars, vt),
          altoImagen: Number(dato.altoImagen),
          anchoImagen: Number(dato.anchoImagen),
          separacion: Number(dato.separacion),
          tipo: dato.tipo
        };
      case 'imagen':
        return {
          src: regex(dato.src, vars, vt),
          altoImagen: Number(dato.altoImagen),
          separacion: Number(dato.separacion),
          tipo: dato.tipo
        };
      case 'texto':
        return {
          src: regex(dato.src, vars, vt),
          nombreFuente: dato.nombreFuente,
          altoTexto: Number(dato.altoTexto),
          texto: regex(dato.texto, vars, vt),
          separacion: Number(dato.separacion),
          tipo: dato.tipo
        };
      default:
        console.log('defecto');
        break;
    }
  });
  Promise.all(datos.map(arreglo => arreglo.tipo === 'texto' ?
    cargaFuente(arreglo.nombreFuente, arreglo.src) :
    cargaImagen(arreglo.src))
  ).then(function (imagenes) {
    var anchoTotal = sepElem, altoRepeticiones = [];
    imagenes.forEach(function (imagen, index) {
      if (datos[index].tipo === 'arreglo') {
        datos[index].imagen = imagen;
        datos[index].anchoImagen = datos[index].altoImagen * imagen.width / imagen.height;
        altoRepeticiones.push(datos[index].altoImagen * datos[index].repY + datos[index].separacion * (datos[index].repY + 1));
        anchoTotal += (datos[index].anchoImagen * datos[index].repX) + (datos[index].separacion * (datos[index].repX + 1)) + sepElem;
      } else if (datos[index].tipo === 'imagen') {
        datos[index].imagen = imagen;
        datos[index].anchoImagen = datos[index].altoImagen * imagen.width / imagen.height;
        anchoTotal += datos[index].anchoImagen + (datos[index].separacion * 2) + sepElem;
      } else {
        ctx.save();
        ctx.font = `${datos[index].altoTexto}px ${datos[index].nombreFuente}`;
        anchoTotal += datos[index].separacion * 2 + ctx.measureText(datos[index].texto).width + sepElem;
        ctx.restore();
      }
    });
    var xInicio = container.width / 2 - anchoTotal / 2;
    var altoRepeticionMaximo = altoRepeticiones.sort().pop();
    var yStartRepeticiones = container.height / 2 - altoRepeticionMaximo / 2;
    return { datos: datos, xInicio, yStartRepeticiones, altoRepeticionMaximo };
  }).then(function (resultado) {
    const { datos, xInicio, yStartRepeticiones, altoRepeticionMaximo } = resultado;
    for (var i = 0, x = xInicio, y = 0; i < datos.length; i++) { //x => inicio de la repeticion, tiene que acumularse --- y => inicio de la repeticion, se setea en cada repeticion 
      const { imagen, altoImagen, anchoImagen, tipo, separacion } = datos[i];
      if (tipo === 'imagen') {
        x += sepElem + separacion;
        y = container.height / 2 - altoImagen / 2;
        ctx.drawImage(imagen, x, y, anchoImagen, altoImagen);
        x += anchoImagen + separacion;
      } else if (tipo === 'arreglo') {
        const { repX, repY, textoEjeX, textoEjeY, opcion } = datos[i];
        var altoTotalRep = altoImagen * repY + separacion * (repY + 1); //alto total de la repeticion
        var anchoTotalRep = anchoImagen * repX + separacion * (repX + 1); //ancho total de la repeticion
        var xStart = x + sepElem + separacion;
        var yStart = yStartRepeticiones;

        opcion !== '' && mostrarTexto(opcion, xStart + (anchoTotalRep / 2) - separacion, container.height - altoOpciones, 'center', 30, '#000000');
        textoEjeX !== '' && mostrarTexto(textoEjeX, xStart + (anchoTotalRep / 2) - separacion, yStart, 'center', 18, '#000000');
        textoEjeY !== '' && mostrarTexto(textoEjeY, xStart - separacion, yStart + (altoTotalRep / 2), 'right', 18, '#000000');
        for (var filas = 0, yImagen; filas < repY; filas++) {
          yImagen = yStart + separacion * (filas + 1) + altoImagen * filas;
          for (var cols = 0, xImagen; cols < repX; cols++) {
            xImagen = xStart + separacion * cols + anchoImagen * cols;
            ctx.drawImage(imagen, xImagen, yImagen, anchoImagen, altoImagen);
          }
        }
        x += sepElem + separacion * (repX + 1) + anchoImagen * repX;
      } else {
        const { nombreFuente, altoTexto, separacion, texto } = datos[i];
        ctx.save();
        ctx.font = `${altoTexto}px ${nombreFuente}`;
        ctx.fillStyle = '#ff0000';
        ctx.textAlign = 'center';
        var anchoTexto = ctx.measureText(texto).width;
        ctx.fillText(texto, x + sepElem + separacion + anchoTexto / 2, container.height / 2 + altoTexto / 2);
        x += sepElem + separacion * 2 + anchoTexto;
        ctx.restore();
      }
    }

    function mostrarTexto(texto, x, y, aling, fontsize, color) {
      ctx.font = `${fontsize}px opensansregularfont`;
      ctx.textAlign = aling;
      ctx.fillStyle = color;
      ctx.fillText(texto, x, y);
    }
  }).catch(function (error) {
    console.log(error);
  });
}