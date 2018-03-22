import React, { Component } from 'react'

export default class Check extends Component {
	check(condition) {
		return `glyphicon glyphicon-${this.props.checked[0][condition] ? 'ok' : 'remove'}`
	}
	render() {
		return (
			<section>
				<ul class="checklist">
					<li class="title"><b>Requisitos</b></li>
					<li title="Crear al menos una variable, esta debe cumplir con todas las condiciones que suceden a esta">
						<span class={this.check(0)}/>Ingresar al menos una variable para el desarrollo del ejercicio
					</li>
					<li title="Para cada variable seleccionar si es número, función o texto, e ingresar sus posibles valores">
						<span class={this.check(1)}/>Ingresar correctamente el tipo de variable y sus posibles valores
					</li>
					<li title="Todas las variables usadas en las ecuaciones deben existir, es decir, deben ser creadas en otra fila">
						<span class={this.check(2)}/>Ingresar una variable por cada variable usada en las ecuaciones
					</li>
					<li title="Si en una fila se crea la variable $a, y una restricción, esta debe incluir la variable $a">
						<span class={this.check(3)}/>Ingresar restricciones que incluyan la variable referenciada
					</li>
					<li title="Para cada variable creada se debe ingresar los valores usados en el ejercicio del video tutorial">
						<span class={this.check(4)}/>Ingresar para cada variable el valor del el video tutorial
					</li>
					<li title="Si en una fila se crea la variable $a, esta variable no debe volver a definirse en otra fila">
						<span class={this.check(5)}/>Ingresar variables distintas, no repetir la letra
					</li>
				</ul>
			</section>
		)
	}
}