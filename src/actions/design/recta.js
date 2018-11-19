import { regex } from '../../actions/global/tools';
export function recta(config) {
	const { container, params, variables, versions, vt } = config
		const {
		  _altoCanvas,
		  _anchoCanvas,
		  _anchoReacta,
		  _largoLineasFlechas,
		  _posiciones,
		  _marcarPosiciones,
		  _altoPosiciones,
		  _ponerObjeto,
		  _posicionObjeto,
		  _tipoObjeto,
		  _leyenda,
		  _proporcion,
		  _limite,
		  _dibujaFlechas,
		  _escalaFlechas,
		  _dibujaFlechasHasta,
		  _dibujaRango,
		  _rangoCorchete,
		  _textoRango,
		  _fraccion
		} = params;
		var conoImgSrc = 'https://desarrolloadaptatin.blob.core.windows.net/imagenesprogramacion/Eje_1/OA_10/Cono.png';
		var xFinal = _anchoCanvas-(_anchoReacta/2);
		var xInicial = _anchoReacta/2;
		var inicialFinalY = _altoCanvas/2;
		container.height = _altoCanvas;
		container.width = _anchoCanvas;
  
		var ctx = container.getContext('2d');
		
		dibujaRectaPrincipal();
		marcarPosiciones();
		_ponerObjeto === 'si' && dibujaObjetoEnPosicion();
		_leyenda === 'si' && dibujaLeyenda();
		_dibujaFlechas === 'si' && dibujaFlechasCamino();
		dibujaNumeros();
		dibujaElementoRepetitivo();
		_dibujaRango === 'si' && dibujaRango();
		_fraccion !== '' && dibujaFraccion2();
  
	  function dibujaRectaPrincipal() {
		ctx.beginPath();
		ctx.moveTo(xInicial,inicialFinalY);
  
		dibujaFlechas(xInicial,inicialFinalY,true);
  
		ctx.moveTo(xInicial, inicialFinalY);
		ctx.lineTo(xFinal, inicialFinalY);
  
		dibujaFlechas(xFinal,inicialFinalY,false);
  
		ctx.lineCap = 'round';
		ctx.lineJoin = 'round';
		ctx.lineWidth = _anchoReacta;
		ctx.stroke();
		ctx.closePath();
	  }
  
	  function dibujaFlechas(x,y,primera) {
		if(primera) {
		  ctx.lineTo(x+_largoLineasFlechas*Math.cos(Math.PI/4), y-_largoLineasFlechas*Math.sin(Math.PI/4));
		  ctx.moveTo(x,inicialFinalY);
		  ctx.lineTo(x+_largoLineasFlechas*Math.cos(Math.PI/4), y-_largoLineasFlechas*Math.sin(Math.PI/4*-1));
		} else {
		  ctx.lineTo(x-_largoLineasFlechas*Math.cos(Math.PI/4*-1), y-_largoLineasFlechas*Math.sin(Math.PI/4*-1));
		  ctx.moveTo(x, inicialFinalY);
		  ctx.lineTo(x-_largoLineasFlechas*Math.cos(Math.PI/4*-1), y-_largoLineasFlechas*Math.sin(Math.PI/4));
		}
	  }
  
	  function marcarPosiciones() {
		var divicion = _anchoCanvas / _posiciones;
		switch(_marcarPosiciones) {
		  case 'todas':
			for(var i = 1; i < _posiciones; i++) {
			  ctx.beginPath();
			  ctx.moveTo(i*divicion,inicialFinalY-(_altoPosiciones/2));
			  ctx.lineTo(i*divicion,inicialFinalY+(_altoPosiciones/2));
			  ctx.stroke();
			  ctx.closePath();
			}
			break;
		  case 'inicial y final':
			ctx.beginPath();
			ctx.moveTo(divicion,inicialFinalY-(_altoPosiciones/2));
			ctx.lineTo(divicion,inicialFinalY+(_altoPosiciones/2));
			ctx.stroke();
			ctx.closePath();
			ctx.beginPath();
			ctx.moveTo(_anchoCanvas-divicion,inicialFinalY-(_altoPosiciones/2));
			ctx.lineTo(_anchoCanvas-divicion,inicialFinalY+(_altoPosiciones/2));
			ctx.stroke();
			ctx.closePath();
			break;
		  case 'proporcional':
			try {
			  var divicion = _anchoCanvas / _posiciones;
			  var largoRecta = _anchoCanvas - (divicion * 2);
			  var proporcion = regex(_proporcion, vt?variables:versions, vt);
			  proporcion = eval(proporcion);
			  var limite = regex(_limite, vt?variables:versions, vt);
			  limite = eval(limite);
			  var espacio = largoRecta/(limite/proporcion);
			  
			  for(var i = 0, separacion = 0; i < (limite/proporcion)+1; i++) {
				ctx.beginPath();
				var startEndX = (i*espacio)+divicion;
				if(Number.isInteger(separacion)) {
				  var startY = inicialFinalY-(Number(_altoPosiciones)+3/2);
				  var endY = inicialFinalY+(Number(_altoPosiciones)+3/2);
				  ctx.moveTo(startEndX,startY);
				  ctx.lineTo(startEndX,endY);
				} else {
				  ctx.moveTo(startEndX,inicialFinalY-(Number(_altoPosiciones)/2));
				  ctx.lineTo(startEndX,inicialFinalY+(Number(_altoPosiciones)/2));
				}
				ctx.stroke();
				ctx.closePath();
				separacion=separacion+proporcion;
			  }
			} catch(e) {
			  console.log(e);
			}
			break;
		}
	  }
  
	  function dibujaObjetoEnPosicion() {
		var divicion = _anchoCanvas / _posiciones;
		var posiciones = String(Number(regex(_posicionObjeto, vt?variables:versions, vt))).split(',');
		switch(_tipoObjeto) {
		  case 'cono':
			  posiciones.forEach(function(posicion) {
				var x = Number.parseFloat(posicion)
				if(x) {
				  var posicionX = ((_anchoCanvas - (divicion * 2)) * (1/x)) + divicion; 
				  ctx.beginPath();
				  ctx.moveTo(posicionX,inicialFinalY-(_altoPosiciones/2));
				  ctx.lineTo(posicionX,inicialFinalY+(_altoPosiciones/2));
				  ctx.stroke();
				  ctx.closePath();
				  var img = new Image();
				  img.src = conoImgSrc;
				  img.onload = function() {
					var imgX = posicionX-(img.width/2);
					var imgY = inicialFinalY-(_altoPosiciones/2)-img.height-20;
					ctx.drawImage(img, imgX, imgY);
				  }
				  dibujaFraccion(posicionX);
				}
			  });
			break;
		}
	  }
  
	  function dibujaFraccion(posicionX) {
		var denominador = Number(regex(_posicionObjeto, vt?variables:versions, vt));
		var numerador = 1;
		var textHeightFraccion = 20;
		ctx.font = `${textHeightFraccion}px Arial`;
		ctx.fillStyle = 'black';
		var anchoNumerador = ctx.measureText(String(numerador)).width;
		var anchoDenominador = ctx.measureText(String(denominador)).width;
		
		var numeradorX = posicionX-(anchoNumerador/2);
		var numeradorY = inicialFinalY+(_altoPosiciones/2)+20+textHeightFraccion;
		ctx.fillText(String(numerador), numeradorX, numeradorY);
  
		ctx.beginPath();
		var lineaX = posicionX-10;
		var lineaY =inicialFinalY+(_altoPosiciones/2)+20+(textHeightFraccion + 5)
		ctx.moveTo(lineaX, lineaY);
		ctx.lineTo(lineaX+20, lineaY);
		ctx.lineWidth = 2;
		ctx.stroke();
		ctx.closePath();
  
		var denominadorX = posicionX-(anchoDenominador/2);
		var denominadorY = inicialFinalY+(_altoPosiciones/2)+25+(textHeightFraccion*2);
		ctx.fillText(String(denominador), denominadorX, denominadorY);
	  }
  
	  function dibujaFraccion2() {
		switch(_escalaFlechas) {
		  case 'principal':
			break;
		  case 'secundaria':
			try {
			  var numeros = String(regex(_fraccion, vt?variables:versions, vt)).split(',');
			  var divicion = _anchoCanvas / _posiciones;
			  var largoRecta = _anchoCanvas - (divicion * 2);
			  var proporcion = regex(_proporcion, vt?variables:versions, vt);
			  proporcion = eval(proporcion);
			  var limite = regex(_limite, vt?variables:versions, vt);
			  limite = eval(limite);
			  var largo = regex(_rangoCorchete, vt?variables:versions, vt);
			  largo = eval(largo);
			  var espacios = limite/proporcion;
			  var largoSeparacion = largoRecta/espacios;
			 
			  if(numeros.length === 2) {
  
			  } else if (numeros.length === 3) {
				var entero = Number(numeros[0]),
				numerador = Number(numeros[1]),
				denominador = Number(numeros[2]);
				
				var espacioFraccion = denominador * entero + numerador;
				var x = largoSeparacion * espacioFraccion + divicion;
				var y = inicialFinalY + Number(_altoPosiciones);
				
				ctx.fillStyle = 'black';
				ctx.font = '25px Arial';
				var enteroWidth = ctx.measureText(String(entero)).width;
  
				ctx.font = '15px Arial';
				var numeradorWidth = ctx.measureText(String(numerador)).width;
				var denominadorWidth = ctx.measureText(String(denominador)).width;
				
				var widthFraccion = enteroWidth + 25;//20 linea de separacion y 5 entre entero y la linea
				var enteroX = x-(widthFraccion/2);
				ctx.font = '25px Arial';
				ctx.fillText(String(entero), enteroX, y+40);
				
				ctx.font = '20px Arial';
				var numeradorX = x+(widthFraccion/2)-numeradorWidth-8;
				ctx.fillText(String(numerador), numeradorX, y+28);
  
				var inicioDivicionX = x-(widthFraccion/2)+enteroWidth+5;
				ctx.beginPath();
				ctx.moveTo(inicioDivicionX, y+32);
				ctx.lineTo(inicioDivicionX+20, y+32);
				ctx.stroke();
				ctx.closePath();
  
				var denominadorX = x+(widthFraccion/2)-denominadorWidth-8;
				ctx.fillText(String(denominador), denominadorX, y+51);
			  }
			}catch(e){
			  console.log(e);
			}
			break;
		}
	  }
  
	  function dibujaLeyenda() {
		var divicion = _anchoCanvas / _posiciones;
		ctx.font = `${15}px Arial`;
		ctx.fillStyle = 'black';
		var anchoTexto = ctx.measureText('Borde de').width;
		var textoX = divicion-(anchoTexto/2);
		var textoY = inicialFinalY-(_altoPosiciones/2)-40;
		ctx.fillText('Borde de', textoX, textoY);
		
		anchoTexto = ctx.measureText('la cancha').width;
		textoX = divicion-(anchoTexto/2);
		textoY = inicialFinalY-(_altoPosiciones/2)-25;
		ctx.fillText('la cancha', textoX, textoY);
  
		anchoTexto = ctx.measureText('1m').width;
		textoX = _anchoCanvas-divicion-(anchoTexto/2);
		textoY = inicialFinalY+(_altoPosiciones/2)+30;
		ctx.fillText('1m', textoX, textoY);
	  }
  
	  function dibujaFlechasCamino() {
		switch(_escalaFlechas) {
		  case 'principal':
			break;
		  case 'secundaria':
			try {
			  var divicion = _anchoCanvas / _posiciones;
			  var largoRecta = _anchoCanvas - (divicion * 2);
			  var proporcion = regex(_proporcion, vt?variables:versions, vt);
			  proporcion = eval(proporcion);
			  var limite = regex(_limite, vt?variables:versions, vt);
			  limite = eval(limite);
			  var espacios = limite/proporcion;
			  var largoSeparacion = largoRecta/espacios;
			  var cantidadFlechas = regex(_dibujaFlechasHasta, vt?variables:versions, vt);
			  
			  for(var i = 0; i < Number(cantidadFlechas); i++) {
				ctx.lineWidth = 2;
				ctx.beginPath();
				var centroX = (i*largoSeparacion)+divicion+(largoSeparacion/2),
				  centroY = inicialFinalY,
				  startAngle = Math.PI * 1.2,
				  endAngle = Math.PI * 1.8,
				  r = largoSeparacion/2;
				ctx.arc(centroX, centroY, r, startAngle, endAngle, false);
				ctx.stroke();
				var sx = Math.cos(endAngle)*r+centroX,
				  sy = Math.sin(endAngle)*r+centroY;
				ctx.lineTo(sx, sy-10);
				ctx.moveTo(sx, sy);
				ctx.lineTo(sx-10, sy);
				ctx.stroke();
				ctx.closePath();
			  }
			}catch(e){
			  console.log(e);
			}
			break;
		}
	  }
  
	  function dibujaNumeros() {
		var divicion = _anchoCanvas / _posiciones;
		switch(_marcarPosiciones) {
		  case 'todas':
			break;
		  case 'inicial y final':
			break;
		  case 'proporcional':
			try {
			  var divicion = _anchoCanvas / _posiciones;
			  var largoRecta = _anchoCanvas - (divicion * 2);
			  var proporcion = regex(_proporcion, vt?variables:versions, vt);
			  proporcion = eval(proporcion);
			  var limite = regex(_limite, vt?variables:versions, vt);
			  limite = eval(limite);
			  var espacio = largoRecta/(limite/proporcion);
			  ctx.font = `${15}px Arial`;
			  ctx.fillStyle = 'black';
			  for(var i = 0, separacion = 0; i < (limite/proporcion)+1; i++) {
				ctx.beginPath();
				var x = (i*espacio)+divicion;
				if(Number.isInteger(separacion)) {
				  var endY = inicialFinalY+(Number(_altoPosiciones)+40/2);
				  var width = ctx.measureText(String(separacion)).width;
				  ctx.fillText(String(separacion), x-(width/2), endY);
				} 
				ctx.stroke();
				ctx.closePath();
				separacion=separacion+proporcion;
			  }
			} catch(e) {
			  console.log(e);
			}
			break;
		}
	  }
  
	  function dibujaElementoRepetitivo() {
		switch(_escalaFlechas) {
		  case 'principal':
			break;
		  case 'secundaria':
			try {
			  var divicion = _anchoCanvas / _posiciones;
			  var largoRecta = _anchoCanvas - (divicion * 2);
			  var proporcion = regex(_proporcion, vt?variables:versions, vt);
			  proporcion = eval(proporcion);
			  var limite = regex(_limite, vt?variables:versions, vt);
			  limite = eval(limite);
			  var espacios = limite/proporcion;
			  var largoSeparacion = largoRecta/espacios;
			  var cantidadFlechas = regex(_dibujaFlechasHasta, vt?variables:versions, vt);
			  var img = new Image();
			  img.src = conoImgSrc;
			  img.onload = function() {
				for(var i = 1; i < Number(cantidadFlechas)+1; i++) {
				  var imgX = (i*largoSeparacion)+divicion-(img.width/2);
				  var imgY = inicialFinalY-(largoSeparacion/2)-10-img.height;
				  ctx.drawImage(img, imgX, imgY);
				}
			  }
			}catch(e){
			  console.log(e);
			}
		  break;
		}
	  }
  
	  function dibujaRango() {
		switch(_escalaFlechas) {
		  case 'principal':
			break;
		  case 'secundaria':
			try {
			  var divicion = _anchoCanvas / _posiciones;
			  var largoRecta = _anchoCanvas - (divicion * 2);
			  var proporcion = regex(_proporcion, vt?variables:versions, vt);
			  proporcion = eval(proporcion);
			  var limite = regex(_limite, vt?variables:versions, vt);
			  limite = eval(limite);
			  var largo = regex(_rangoCorchete, vt?variables:versions, vt);
			  largo = eval(largo);
			  var espacios = limite/proporcion;
			  var largoSeparacion = largoRecta/espacios;
			  var inicioFinalRango = inicialFinalY+50;
			  ctx.beginPath();
			  ctx.arc(divicion+10, inicioFinalRango-10, 10, Math.PI * 0.5, Math.PI);
			  ctx.moveTo(divicion+10, inicioFinalRango);
			  var terminoX = (largoSeparacion*Number(largo))+divicion;
			  ctx.lineTo((terminoX/2)-10+(divicion/2), inicioFinalRango);
			  ctx.arc((terminoX/2)-10+(divicion/2), inicioFinalRango+10, 10, Math.PI * 1.5, Math.PI * 2);
			  ctx.arc((terminoX/2)+10+(divicion/2), inicioFinalRango+10, 10, Math.PI, Math.PI * 1.5);
			  ctx.moveTo((terminoX/2)+10+(divicion/2), inicioFinalRango);
			  ctx.lineTo(terminoX-10, inicioFinalRango);
			  ctx.arc(terminoX-10, inicioFinalRango-10, 10, Math.PI * 0.5, 0, true);
			  ctx.stroke();
			  ctx.closePath();
			  var texto = regex(_textoRango, vt?variables:versions, vt);
			  var anchoTexto = ctx.measureText(texto).width;
			  var textoX = (terminoX+divicion-anchoTexto)/2;
			  var textoY = inicioFinalRango+30;
			  ctx.fillText(texto, textoX, textoY);
			}catch(e){
			  console.log(e);
			}
			break;
		}
	  }
}