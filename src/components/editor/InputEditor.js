import React, { Component } from 'react'
import { replace, show } from 'actions'

export default class InputEditor extends Component {
	render () {
		const { inputSize, inputType } = this.props.params
		return (
			<form>
				<h5>Tipo de respuesta: <b>{inputType}</b></h5>
				<h6>{ this.getInfo(inputType) }</h6>
				<div>{ this.getInput(inputType) }</div>
				<div>{ this.getError(inputSize) }</div>
				<div>{ this.getFeed(inputSize) }</div>
			</form>
		)
	}	
	getInfo(type) {
		switch(type) {
			case 'input': { return 'Permite ingresar un texto o un número' }
			case 'checkbox': { return 'Permite seleccionar múltiples alternativas' }
			case 'radio 3': case 'radio 4': case 'select': { return 'Permite seleccionar solo una alternativa' }
			case 'textarea': { return 'Permite ingresar una respuesta extensa' }
		}
	}
	getInput(type) {
		const { value1, value2, value3, value4 } = this.props.params, { variables } = this.props.store, arr = [value1, value2, value3, value4]
		switch(type) {
			case 'input': { return <input type="text" placeholder="Respuesta"></input> }
			case 'radio 3': { return arr.map((m, i) => { let n = replace(m, variables, true)
				return ( <li key={i}><input name="answer" value={n} type="radio"/><label>{n}</label></li> )}					 
			)}
			case 'radio 4': { return arr.map((m, i) => { let n = replace(m, variables, true)
				return ( <li key={i}><input name="answer" value={n} type="radio"/><label>{n}</label></li> )}					 
			)}
			case 'checkbox': { return arr.map((m, i) => { let n = replace(m, variables, true)
				return ( <li key={i}><input name="answer" value={n} type="checkbox"/><label>{n}</label></li> )}	
			)}	
			case 'select': { return <select>{ arr.slice(0, 3).map((m, i) => { let n = replace(m, variables, true)
				return ( <option key={i} value={n}>{n}</option> )} )}</select> 
			}
			case 'textarea': { return <textarea placeholder="Respuesta"></textarea> }
		}
	}
	getError(size) {
		const { error2, error3, error4 } = this.props.params
		return (
			<div class={show(size > 2, 'error')}>
				<h5 >Errores asociados:</h5>
				<h6><b>Opción 2: </b> 
					{ error2 == 0 ? 'Sin error frecuente asociado' : 'Código de error' } { error2 != 0 && <b>{error2}</b> }
				</h6>
				<h6><b>Opción 3: </b> 
					{ error3 == 0 ? 'Sin error frecuente asociado' : 'Código de error' } { error3 != 0 && <b>{error3}</b> }
				</h6>
				<h6 class={show(size > 3)}><b>Opción 4: </b> 
					{ error4 == 0 ? 'Sin error frecuente asociado' : 'Código de error' } { error4 != 0 && <b>{error4}</b> }
				</h6>
			</div>
		)
	}
	getFeed(size) {
		const { feed0, feed1, feed2, feed3, feed4 } = this.props.params
		return (
			<div class="feed">
				<h5>Feedback:</h5>
				<h6><b>Genérico: </b>{ feed0 ? feed0 : 'Ingresa un feedback general para los errores' }</h6>
				<h6><b>Correcto: </b>{ feed1 ? feed1 : 'Ingresa un feedback para la respuesta correcta' }</h6>
				<h6 class={show(size > 2)}><b>Opción 2: </b>{ feed2 ? feed2 : 'No hay feedback' }</h6>
				<h6 class={show(size > 2)}><b>Opción 3: </b>{ feed3 ? feed3 : 'No hay feedback' }</h6>
				<h6 class={show(size > 3)}><b>Opción 4: </b>{ feed4 ? feed4 : 'No hay feedback' }</h6>
			</div>
		)
	}
}