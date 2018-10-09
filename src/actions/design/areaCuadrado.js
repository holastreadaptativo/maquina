export function areaCuadrada(config) {
  const { container, params, variables, versions, vt } = config;
  container.width = Number(params.canvas) + Number(params.perimetro);
  container.height = Number(params.canvas) + Number(params.perimetro);
  var ctx = container.getContext("2d");
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, container.width, container.height);

  var mitad = Number(params.canvas) / 2;
  var perimetro = Number(params.perimetro);
  var x = mitad,y = mitad;
  var cantidadCuadros = Number(params.cuadros);

  var coordenadasUtilizadas = [];
  var coordenadasPosibles = [{ x: x-perimetro, y: y },
                            { x: x+perimetro, y: y },
                            { x: x,           y: y-perimetro },
                            { x: x,           y: y+perimetro }];

  for(var i = 0; i < cantidadCuadros; i++) {
    dibujaCuadro(ctx, x, y, i);
    var fueAgregada = false; //se debe arreglar la logica para quitar las lineas de aqui
    coordenadasUtilizadas.forEach(element => {
      if(element.x === x  && element.y === y) {
        cantidadCuadros++;
        fueAgregada = true;
      }
    });
    !fueAgregada && coordenadasUtilizadas.push({ x, y });//hasta aqui
    var coordenadasNuevas = obtenerCoordenadasNuevas(x, y);
    var coordenadasPorAgregar = quitaCoordenadasDuplicadasConUtilizadas(coordenadasNuevas);
    var coordenadaSiguiente = obtenerSiguienteCoordenada();
    coordenadasPosibles = coordenadasPosibles.concat(coordenadasPorAgregar);
    x = coordenadaSiguiente.x;
    y = coordenadaSiguiente.y;
  }

  function obtenerCoordenadasNuevas(x, y) {// las nuevas coordenadas en las que se puede dibujar el siguiente cuadro
    return [{ x: x-perimetro, y:y }, 
            { x: x+perimetro, y:y }, 
            { x: x,           y: y-perimetro }, 
            { x: x,           y: y+perimetro }]
  }

  function quitaCoordenadasDuplicadasConUtilizadas(coordenadasNuevas) {
    var coordenadasUnicas = [];
    for(var i = 0; i < coordenadasNuevas.length; i++) { //SIEMPRE LENGHT 4
      var fueUtilizada = false;
      for(var j = 0; j < coordenadasUtilizadas.length; j ++) {
        if(coordenadasUtilizadas[j].x === coordenadasNuevas[i].x && 
            coordenadasUtilizadas[j].y === coordenadasNuevas[i].y) {
          fueUtilizada = true;
        }
      }
      !fueUtilizada && coordenadasUnicas.push(coordenadasNuevas[i]);
    }
    return coordenadasUnicas;
  }

  function obtenerSiguienteCoordenada() {
    var index = Math.trunc(Math.random() * coordenadasPosibles.length);
    var siguiente = coordenadasPosibles[index];
    coordenadasPosibles.splice(index, 1);
    return siguiente;
  }

  function dibujaCuadro(ctx, x, y, i) {
    ctx.strokeStyle = 'blue';
    ctx.rect(x, y, perimetro, perimetro);
    ctx.stroke();
  }
}

