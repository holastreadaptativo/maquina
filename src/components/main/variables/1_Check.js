import React, { Component } from 'react'
import { browserHistory } from 'react-router'
import { show } from 'actions'

export default class Check extends Component {
	handlerSubmit(e) {
		e.preventDefault()
		this.props.setActive(2)
		browserHistory.push('/ejercicios')
	}
	render() {
		const checked = this.props.checked[0]
		return (
			<form>
				<ul class="checklist">
					<li class="title"><b>Requisitos</b></li>
					<li title="Crear al menos una variable, esta debe cumplir con todas las condiciones que suceden a esta">
						<span class={`glyphicon glyphicon-${checked[0] ? 'ok' : 'remove'}`}/>Ingresar al menos una variable para el desarrollo del ejercicio
					</li>
					<li title="Para cada variable seleccionar si es número, función o texto, e ingresar sus posibles valores">
						<span class={`glyphicon glyphicon-${checked[1] ? 'ok' : 'remove'}`}/>Ingresar correctamente el tipo de variable y sus posibles valores
					</li>
					<li title="Todas las variables usadas en las ecuaciones deben existir, es decir, deben ser creadas en otra fila">
						<span class={`glyphicon glyphicon-${checked[2] ? 'ok' : 'remove'}`}/>Ingresar una variable por cada variable usada en las ecuaciones
					</li>
					<li title="Si en una fila se crea la variable $a, y una restricción, esta debe incluir la variable $a">
						<span class={`glyphicon glyphicon-${checked[3] ? 'ok' : 'remove'}`}/>Ingresar restricciones que incluyan la variable referenciada
					</li>
					<li title="Para cada variable creada se debe ingresar los valores usados en el ejercicio del video tutorial">
						<span class={`glyphicon glyphicon-${checked[4] ? 'ok' : 'remove'}`}/>Ingresar para cada variable el valor del el video tutorial
					</li>
					<li title="Si en una fila se crea la variable $a, esta variable no debe volver a definirse en otra fila">
						<span class={`glyphicon glyphicon-${checked[5] ? 'ok' : 'remove'}`}/>Ingresar variables distintas, no repetir la letra
					</li>
				</ul>
				<div class="add">
					<button class={show(checked[6], 'btn btn-success')} onClick={this.handlerSubmit.bind(this)}>Continuar</button>
				</div>
			</form>
		)
	}
}