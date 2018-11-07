export function igualPerimetro(config) {
  const { container, params, variables, versions, vt } = config;

  container.width = params.cuadro * 10;
  container.height = params.cuadro * 5;
  container.style.border = params.borderWidth+'px solid  #000';
  
  var ctx = container.getContext('2d');
  
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

  try {
    var varAncho, varAlto;
    if(vt) {
      varAlto = variables.find(function(item) {
        return item.var === params.alto
      });
      varAncho = variables.find(function(item) {
        return item.var === params.ancho
      });
    } else {
      varAlto = versions.find(function(item) {
        return item.var === params.alto
      });
      varAncho = versions.find(function(item) {
        return item.var === params.ancho
      });
    }
    
    var alto = vt ? varAlto.vt : varAlto.val;
    var ancho = vt ? varAncho.vt : varAncho.val;
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