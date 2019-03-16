// Etiqueta sólamente el elemento JSX que tiene el ID ElementId indicado como JQuery
export function $(ElementId) { return document.getElementById(ElementId) }

// Compara 2 strings que sean iguales
export function compare(a, b) { return a.localeCompare(b) == 0 }

// retorna fecha en localstring
export function date() { return (new Date()).toLocaleString() } 

// Si cumple una condición theCondition dada agrega una clase theClass
export function focus(theCondition, theClass) { return `${theCondition ? theClass : ''}` }

// retorna el nombre del ícono iconName a ícono de glyphicon
export function glyph(iconName) { return `glyphicon glyphicon-${iconName}` }

// Transforma un número m a formato moneda, agrega el signo $ y agrega punto y coma al dígito
export function money(m) {
    return '$' + parseInt(m).toFixed(0).replace(/./g, (c, i, a) => {
        return i > 0 && c !== ',' && (a.length - i) % 3 === 0 ? '.' + c : c
    })
}

// retorna un numero random entre minNumber y maxNumber
export function random(minNumber, maxNumber) { return Math.floor(Math.random(0, 1) * (maxNumber - minNumber) + minNumber) }


// Reemplaza las variables por las variables tutoriales, isTutorial es booleano
export function replace(theInput, theVariables, isTutorial) {
	for (let k = 0; k < 10; k++)
        theVariables.forEach(aVariable => { 
            theInput = theInput.toString().replace(`$${aVariable.var}`, `${isTutorial ? aVariable.vt : aVariable.val}`) 
        })
	return theInput
}

export function regex(theInput, theVariables, isTutorial) {
    try {
        var result = theInput.toString().replace(/\$[a-z]/g, function(coincidencia) { //coincidencia => '$a'
            var variable = theVariables.find(item => item.var == coincidencia[1]);
            return isTutorial ? variable.vt : variable.val;
        });
        return result;
    } catch(error) {
        console.log(error.message);
    }
}

export function regexFunctions(text) {
    var result = text.replace(/(?=\{).*?(\})/g, function(coincidencia){ //coincidencia => '{funcion()}'
        var final = coincidencia.length - 2;
        var funcion = coincidencia.substr(1,final);
        try {
            return eval(funcion);
        } catch(error) {
            return coincidencia;
        }
    });
    return result;
}

function fraccion(entero, numerador, denominador) {
    return `<table style="margin:0 4px;display: inline-block;vertical-align: middle;">
                <tbody>
                    <tr>
                        ${entero > 0 ? `<td rowspan="2">
                            <span style="font-size:25px;">${entero}</span>
                        </td>` : ''}
                        <td style="border-bottom: 2px solid black;">
                            <span style="font-size:18px;">&nbsp;${numerador}&nbsp;</span>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <span style="font-size:18px;">&nbsp;${denominador}&nbsp;</span>
                        </td>
                    </tr>
                </tbody>
            </table>`;
}

export function espacioMiles(stringNumero) {
    if(stringNumero.length >= 4) {
        var arrayReverse = String(stringNumero).split("").reverse();
        for(var i=0,count=0,valor=''; i < arrayReverse.length; i++) {
            count++;
            if(count === 3 && arrayReverse[i+1]) {
                valor=' '+arrayReverse[i]+valor;
                count=0;
            } else {
                valor=arrayReverse[i]+valor;
            }
        } 
        return valor;
    } else {
        return stringNumero;
    }
}

function cardinalAOrdinal(numero) {
    switch(numero){
        case '1':
            return 'primer';
        case '2':
            return 'segundo';
        case '3':
            return 'tercer';
        case '4':
            return 'cuarto';
        case '5':
            return 'quinto';
        case '6':
            return 'sexto';
        case '7':
            return 'séptimo';
        case '8':
            return 'octavo';
        case '9':
            return 'noveno';
        case '10':
            return 'décimo';
        default:
            return '';
    }
}

// Si cumple una condición theCondition dada agrega una clase theClass, si theCondition es false no muestra el elemento
export function show(theCondition, theClass) { return `${theCondition ? theClass ? theClass : '' : 'hidden'}` }

// Desordena un arreglo theArray dado, iterationNumber número de iteraciones
export function shuffle(theArray, iterationNumber = 10) {
    for (let i = 0; i < iterationNumber; i++)
        theArray = theArray.sort(() => (.5 - Math.random()))
    return theArray
}

// Reemplaza las comillas dobles por las simples del JSON para guardarlas en el HTML 
export function stringify(theJSON) { return JSON.stringify(theJSON).replace(/[\"]/g,'\'') }

export function cargaImagen(src) {
    return new Promise(function(resolve, reject){
        var img = new Image();
        img.src = src;
        img.onload = function() {
            resolve(img);
        }
        img.onerror = function() {
            reject('no pasa nada con ', src);
        }
    });
}

export function cargaFuente(nombre, src) {
    return new Promise(function(resolve, reject){
        var font = new FontFace(nombre, `url('${src}')`, {});
        font.load().then(function(loadedFont) {
            document.fonts.add(loadedFont);
            resolve(nombre);
        }).catch(function(error){
            reject(error);
        });
    });
}