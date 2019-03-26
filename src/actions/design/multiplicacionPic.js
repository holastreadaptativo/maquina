import { regex, cargaImagen, cargaFuente } from '../global/tools';

export function multiplicacionPic(config) {
  const { container, params, variables, versions, vt } = config;
  console.log(params);
  let { datos, _altoCanvas, _anchoCanvas, _repeticiones, _separacion, _sepImgs, _mostrarValores, _separar } = params;
  container.height = Number(_altoCanvas);
  container.width = Number(_anchoCanvas);
  let separacionImg = Number(_sepImgs);
  var ctx = container.getContext('2d');
  let repgrupos = _mostrarValores === 'si' ? Number(_repeticiones)+1 : Number(_repeticiones);
  let separacionElem = Number(_separacion);

  var vars = vt ? variables : versions;

  datos = datos.map(function(dato, index) {
    switch (dato.formaRepeticion) {
      case 'izqDer':
        return {
          formaRepeticion: dato.formaRepeticion,
          src: regex(dato.src, vars, vt),
          alto:  Number(dato.alto),
          cantidad: Number(regex(dato.cantidad, vars, vt)),
          numeroX: Number(dato.numeroX)
        };
      case 'horVert':
        return {
          formaRepeticion: dato.formaRepeticion,
          src: regex(dato.src, vars, vt),
          alto:  Number(dato.alto),
          cantidad: Number(regex(dato.cantidad, vars, vt)),
          srcVert: String(regex(dato.srcVert, vars, vt))
        };
      case 'diagonal':
        return {
          formaRepeticion: dato.formaRepeticion,
          src: regex(dato.src, vars, vt),
          alto:  Number(dato.alto),
          cantidad: Number(regex(dato.cantidad, vars, vt)),
          separacionX: Number(dato.separacionX),
          separacionY: Number(dato.separacionY)
        };
      default:
        console.log('defecto');
        break;
    }
  });

  Promise.all(datos.map(x => cargaImagen(x.src))).then(function(imagenes){
    let altoTotal = separacionElem, anchoElementos = [];
    for(let [index, imagen] of imagenes.entries()) {
      const { formaRepeticion, alto, cantidad } = datos[index];
      datos[index].imagen = imagen;
      datos[index].ancho = imagen.width * alto / imagen.height;
      switch(formaRepeticion) {
        case 'izqDer':
          const { numeroX } = datos[index];
          altoTotal += alto * (cantidad / numeroX) + separacionImg * ((cantidad / numeroX)+1) + separacionElem;
          datos[index].anchoRepeticion = datos[index].ancho * numeroX + separacionImg * (numeroX+1) + separacionElem * 2;
          break;
        case 'horVert':
          altoTotal += cantidad <= 4 ? 
            alto + separacionImg * 2 + separacionElem : 
            alto + separacionImg * 2 + (cantidad - 4) * datos[index].ancho + (cantidad - 4) * separacionImg + separacionElem;
          datos[index].anchoRepeticion = cantidad > 4 ? 
            datos[index].alto + separacionElem * 2 :
            datos[index].ancho * cantidad + separacionImg * (cantidad+1) + separacionElem * 2;
          break;
        case 'diagonal':
          const { separacionX, separacionY } = datos[index];
          altoTotal += alto + separacionY * (cantidad-1) + separacionImg * 2 + separacionElem;
          datos[index].anchoRepeticion = datos[index].ancho + separacionX * (cantidad-1) + separacionImg * 2 + separacionElem * 2;
          break;
        default:
          console.log('degault');
          break;
      }
      anchoElementos.push(datos[index].anchoRepeticion);
    }
    return { repeticiones: datos, altoTotal, anchoMaximo: Math.max(...anchoElementos) };
  }).then(async function(datos){
    const { repeticiones, altoTotal, anchoMaximo } = datos;
    console.log(altoTotal);
    let anchoSeccion = container.width / repgrupos;
    for(var i = 0, centro; i < repgrupos; i++) {
      let yStart = container.height/2 - altoTotal/2;
      centro = (i+1) * anchoSeccion - (anchoSeccion/2);
      if(_separar === 'si') {
        let xRect = centro - (anchoMaximo/2)+separacionElem;
        let yRect = yStart + separacionElem;
        ctx.strokeRect(xRect, yRect, anchoMaximo-(separacionElem*2), altoTotal-(separacionElem*2));
      }
      for(let repeticion of repeticiones) {
        let xStart = centro - repeticion.anchoRepeticion/2;
        switch(repeticion.formaRepeticion) {
          case 'izqDer':
            let fila = 0, columna = 0;
            for(let r = 0, xImg, yImg; r < repeticion.cantidad; r++) {
              xImg = xStart + separacionElem + separacionImg * (fila+1) + repeticion.ancho * fila;
              yImg = yStart + separacionElem + separacionImg * (columna+1) + repeticion.alto * columna;
              ctx.drawImage(repeticion.imagen, xImg, yImg, repeticion.ancho, repeticion.alto);
              if(fila+1 === repeticion.numeroX) {
                fila = 0;
                columna++;
              } else {
                fila++;
              }
              if(r+1 === repeticion.cantidad) {
                yStart += repeticion.alto * (repeticion.cantidad / repeticion.numeroX) + separacionImg * ((repeticion.cantidad / repeticion.numeroX)+1) + separacionElem;
              }
            }
            break;
          case 'horVert':
            let limite = 4;
            let imagen = await cargaImagen(repeticion.srcVert);
            for(let hv = 0, xImg, yImg; hv < repeticion.cantidad; hv++) {
              if(hv < limite) {
                xImg = xStart + separacionElem + separacionImg * (hv+1) + repeticion.ancho * hv;
                yImg = yStart + separacionElem + separacionImg;
                ctx.drawImage(repeticion.imagen, xImg, yImg, repeticion.ancho, repeticion.alto);
              } else {
                xImg = xStart + separacionElem;
                yImg = yStart + separacionElem + repeticion.alto + separacionImg * (hv-limite+2) + repeticion.ancho * (hv-limite);
                ctx.drawImage(imagen, xImg, yImg, repeticion.alto, repeticion.ancho);
              }
              if(hv+1 === repeticion.cantidad) {
                yStart += repeticion.cantidad <= 4 ? 
                  repeticion.alto + separacionImg * 2 + separacionElem : 
                  repeticion.alto + separacionImg * 2 + (repeticion.cantidad - 4) * repeticion.ancho + (repeticion.cantidad - 4) * separacionImg + separacionElem;
              }
            }
            break;
          case 'diagonal':
            for(let d = 0, xImg, yImg; d < repeticion.cantidad; d++) {
              xImg = xStart + separacionElem + separacionImg + repeticion.separacionX * d;
              yImg = yStart + separacionElem + separacionImg + repeticion.separacionY * d;
              ctx.drawImage(repeticion.imagen, xImg, yImg, repeticion.ancho, repeticion.alto);
              if(d+1 === repeticion.cantidad) {
                yStart += repeticion.alto + repeticion.separacionY * (repeticion.cantidad-1) + separacionImg * 2 + separacionElem;
              }
            }
            break;
          default:
            console.log('degault');
            break;
        }
      }
    }
  }).catch(function(error) {
    console.log(error);
  });
}