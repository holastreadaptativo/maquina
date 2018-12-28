import React, { Component } from 'react'
import { replace, show } from 'actions'

export default class InputEditor extends Component {
	render () {
		const { inputSize, inputType } = this.props.params
		return (
			<form>
				<h5>Tipo de respuesta: <b>{inputType}</b></h5>
				<h6>{ this.getInfo(inputType) }</h6>
				<div>{ this.getInput(inputType, inputSize)}</div>
				<div>{ this.getVariables(inputType) }</div>
				<div>{ this.getError(inputType) }</div>
				<div>{ this.getFeed(inputType) }</div>
			</form>
		)
	}	
	getInfo(type) {
		switch(type) {
			case 'input': { return 'Permite ingresar un texto o un número' }
			case 'checkbox': { return 'Permite seleccionar múltiples alternativas' }
			case 'radio': { return 'Permite seleccionar solo una alternativa' }
			case 'textarea': { return 'Permite ingresar una respuesta extensa' }
		}
	}
	getInput(type, inputSize) {
		const { value1, value2, value3, value4 } = this.props.params, { variables } = this.props.store;
		var arr = [value1, value2];
		if(inputSize > 2) { arr[2] = value3; }
		if(inputSize > 3) { arr[3] = value4; }
		switch(type) {
			case 'input': { return <input type="text" placeholder="Respuesta"></input> }
			case 'radio': 
				console.log(n);
				return arr.map((m, i) => { 
					let n = replace(m, variables, true)
					return ( <li key={i}><input name="answer" value={n} type="radio"/><label>{n}</label></li> 
				)})
			case 'checkbox': { return arr.map((m, i) => { let n = replace(m, variables, true)
				return ( <li key={i}><input name="answer" value={n} type="checkbox"/><label>{n}</label></li> )}	
			)}	
			case 'select': { return <select>{ arr.slice(0, 3).map((m, i) => { let n = replace(m, variables, true)
				return ( <option key={i} value={n}>{n}</option> )} )}</select> 
			}
			case 'textarea': { return <textarea placeholder="Respuesta"></textarea> }
		}
	}
	getError(type) {
		const { error0, error2, error3, error4, defaultError } = this.props.params
		return (
			<div class="feed">
				<h5>Errores asociados:</h5>
				<h6><b>Genérico: </b> 
					{ error0 == '' ? 'Sin error genérico' : error0 }
				</h6>
				<h6><b>Error 2: </b> 
					{ error2 == '' ? 'Sin error frecuente asociado' : error2 }
				</h6>
				<h6><b>Error 3: </b> 
					{ error3 == '' ? 'Sin error frecuente asociado' : error3 }
				</h6>
				<h6><b>Error 4: </b> 
					{ error4 == '' ? 'Sin error frecuente asociado' : error4 }
				</h6>
				{ type === 'input' && <h6><b>Defecto:</b> { defaultError == '' ? 'Sin error por defecto' : defaultError }</h6> }
			</div>
		)
	}
	getFeed(type) {
		const { feed0, feed1, feed2, feed3, feed4, defaultFeed } = this.props.params
		return (
			<div class="feed">
				<h5>Feedback:</h5>
				<h6><b>Genérico: </b>{ feed0 ? feed0 : 'Ingresa un feedback general para los errores' }</h6>
				<h6><b>Correcto: </b>{ feed1 ? feed1 : 'Ingresa un feedback para la respuesta correcta' }</h6>
				<h6><b>Opción 2: </b>{ feed2 ? feed2 : 'No hay feedback' }</h6>
				<h6><b>Opción 3: </b>{ feed3 ? feed3 : 'No hay feedback' }</h6>
				<h6><b>Opción 4: </b>{ feed4 ? feed4 : 'No hay feedback' }</h6>
				{ type === 'input' && <h6><b>Defecto:</b> { defaultFeed == '' ? 'Sin feed por defecto' : defaultFeed }</h6> }
			</div>
		)
	}
	getVariables() {
		const { value1, value2, value3, value4 } = this.props.params, { variables } = this.props.store;
		return (
			<div class="feed">
				<h5>Respuestas</h5>
				<h6><b>Correcta: </b>{ value1 === '' ? 'Ingresa Respuesta Correcta' : replace(value1, variables, true) }</h6>
				<h6><b>Respuesta 2: </b>{ value2 === '' ? 'Ingresa respuesta 2' : replace(value2, variables, true) }</h6>
				<h6><b>Respuesta 3: </b>{ value3 === '' ? 'Ingresa respuesta 3' : replace(value3, variables, true) }</h6>
				<h6><b>Respuesta 4: </b>{ value4 === '' ? 'Ingresa respuesta 4' : replace(value4, variables, true) }</h6>
			</div>
		);
	}
}