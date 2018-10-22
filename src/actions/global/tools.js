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
    var result = theInput.toString().replace(/(\s|\>)(\$[a-z])(\s|.|\<)/g, function(coincidencia) { //coincidencia => ' $a.'
        var variable = theVariables.find(item => item.var == coincidencia[2]);
        return isTutorial ? 
            `${coincidencia[0]}${variable.vt}${coincidencia[3]}` : 
            `${coincidencia[0]}${variable.val}${coincidencia[3]}`;
    });
    return result;
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