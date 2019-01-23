import { regex } from '../global/tools';

export function igualPerimetro(config) {
  const { container, params, variables, versions, vt } = config;

  container.width = params.cuadro * 10;
  container.height = params.cuadro * 5;
  container.style.border = params.borderWidth+'px solid  #000';
  
  var ctx = container.getContext('2d');
  var vars = vt ? variables : versions;
  for(var i = 1; i < 10; i++) { //lineas verticales
    ctx.beginPath();
    ctx.moveTo(i * params.cuadro, container.height);
    ctx.lineTo(i * params.cuadro, 0);
    ctx.strokeStyle = 'black';
    ctx.lineWidth=2;
    ctx.stroke();
    ctx.closePath();
  }

  for(var i = 1; i < 5; i++) {
    ctx.beginPath();
    ctx.moveTo(container.width, i * params.cuadro);
    ctx.lineTo(0, i * params.cuadro);
    ctx.strokeStyle = 'black';
    ctx.lineWidth=2;
    ctx.stroke();
    ctx.closePath();
  }
  var alto, ancho;
  try {
    alto = regex(`$${params.alto}`, vars, vt);
    ancho = regex(`$${params.ancho}`, vars, vt);
    dibujaRectangulo(ctx, ancho * params.cuadro, alto * params.cuadro, params.cuadro);
  } catch(error) {
    console.log(error);
  }

  function dibujaRectangulo(ctx, largox, largoy, lado) {
    ctx.translate(0,0);
    var x,y;
    y = largoy / lado === 1 ? 2 * lado : lado;
    x = (10 * lado)/2 - (Math.trunc((largox / lado) / 2) * lado);
    ctx.beginPath();
    ctx.rect(x, y, largox, largoy);
    ctx.strokeStyle = 'red';
    ctx.lineWidth=4;
    ctx.stroke();
  }
}