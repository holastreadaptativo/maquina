export function igualPerimetro(config) {
  const { container, params, variables, versions, vt } = config;

  container.width = params.cuadro * 10;
  container.height = params.cuadro * 5;
  container.style.border = params.borderWidth+"px solid  #000";
  
  var ctx = container.getContext('2d');
  
  for(var i = 1; i < 10; i++) { //lineas verticales
    ctx.beginPath();
    ctx.moveTo(i * params.cuadro, container.height);
    ctx.lineTo(i * params.cuadro, 0);
    ctx.strokeStyle = "black";
    ctx.lineWidth=2;
    ctx.stroke();
    ctx.closePath();
  }

  for(var i = 1; i < 5; i++) {
    ctx.beginPath();
    ctx.moveTo(container.width, i * params.cuadro);
    ctx.lineTo(0, i * params.cuadro);
    ctx.strokeStyle = "black";
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
    
    switch(Number(alto)) {
      case 1:
        ctx.beginPath();
        ctx.rect(params.cuadro, params.cuadro * 2, ancho * params.cuadro, alto * params.cuadro);
        ctx.strokeStyle = "red";
        ctx.lineWidth=4;
        ctx.stroke();
        break;
      case 2:
        ctx.beginPath();
        ctx.rect(params.cuadro, params.cuadro * 2, ancho * params.cuadro, alto * params.cuadro);
        ctx.strokeStyle = "red";
        ctx.lineWidth=4;
        ctx.stroke();
        break;
      case 3:
        ctx.beginPath();
        ctx.rect(params.cuadro, params.cuadro * 2, ancho * params.cuadro, alto * params.cuadro);
        ctx.strokeStyle = "red";
        ctx.lineWidth=4;
        ctx.stroke();
        break;
      default:
        console.log('no hizo nada');
        break;
    }
  } catch(error) {
    console.log('explota');
  }
  
}