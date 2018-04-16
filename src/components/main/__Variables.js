import React, { Component } from 'react'
import { action, glyph, focus, show } from 'actions'
import { Item, Section } from 'components'
import { data, LABELS } from 'stores'

export default class Variables extends Component {
	constructor() {
		super()
		this.state = { active:0, checked:[[], []], variables:[] }
	}
	componentWillMount() {
		const { code } = this.props
		data.child(`${code}/variables`).on('value', () => {
			action.var('READ', { code, check:true, update:(::this.setState) })
		})
	}
	componentWillUnmount() {
		data.child(`${this.props.code}/variables`).off()
	}
	render() {
		const { checked, variables } = this.state
		const { code, setActive } = this.props
		return (
			<Section style="variables" condition={false} {...this.props}>
				<section class="editor">
					<main class="config">
						<div class="title">
							<h3>Resumen</h3>
						</div>
						<Item id={0} parent={this} title="Ejercicio">
						{
							LABELS.CODE.map((m, i) => { let x = i < 5 ? 2 : 5; return (
								<h4 key={i}>{m}: {code.length >= 2*i + x ? code.substring(2*i, 2*i + x) : '-' }</h4>
							)})
						}
						</Item>
						<div class={show(variables.length)}>
							<Item id={1} parent={this} title="Variables">
							{
								variables.map(m => { 
									if (m.var != '' && m.val != '') return (
										<h4 key={m.id}>{action.var('FORMAT', { code, m })}</h4>
									)
								})
							}
							</Item>
						</div>
					</main>
					<main class="preview">
						<Table code={code} checked={checked} variables={variables} check={::this.check}/>
						<Check checked={checked} variables={variables} setActive={setActive}/>
					</main>
				</section>
			</Section>
		)
	}
	check() {
		const { code } = this.props, { variables } = this.state
		action.var('CHECK', { code, update:(::this.setState), variables })
		// this.props.setNotification(!this.state.checked[0][6] ? 'Error en el ingreso de variables' : null, 'danger')
	}
}

class Check extends Component {
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
	check(condition) {
		return glyph(this.props.checked[0][condition] ? 'ok' : 'remove')
	}
}

class Table extends Component {
	constructor() {
		super()
		this.state = { backup:null }
	}
	render() {
		let error = this.props.checked[1]
		return (	
			<table class="table table-condensed table-hover">
				<thead>
					<tr>{ LABELS.VARS.map((m, i) => <th key={i}>{m}</th>) }</tr>
				</thead>
				<tbody>
				{
					this.props.variables.map((m, i) =>
						<tr key={i} class={focus(!error[i], 'error')}>
							<td><h6>{i+1}</h6></td>
							{
								LABELS.TYPE.map((n, j) => 
									<td key={j} class={n}>
									{
										n != 'type' ?									
										<input id={`${n}-${m.id}`} class="form-control" defaultValue={m[n]}
											onChange={() => this.handleUpdate(n, m.id)} type="text"></input>
										: 
										<select id={`${n}-${m.id}`} class="form-control" defaultValue={m[n]}
											onChange={() => this.handleUpdate(n, m.id)}>
											<option value="numero">Número</option>
											<option value="funcion">Función</option>
											<option value="texto">Texto</option>
										</select>
									}
									</td>
								)
							}
							<td>
								<h6><span class={glyph('remove')} onClick={() => this.handleRemove(m)} title="Eliminar"/></h6>
							</td>
						</tr>
					)
				}
				</tbody>
				<tfoot>
					<tr>
						<td>
							<i class={show(this.state.backup)} onClick={::this.handleRestore}>restore</i>
							<button class="btn btn-default" onClick={::this.handleCreate}>Agregar</button>
						</td>
					</tr>
				</tfoot>
			</table>
		)
	}
	handleCreate(e) {
		e.preventDefault()
		const { code, check } = this.props
		action.var('READ', { check, code })
	}
	handleUpdate(input, id) {
		const { code, check } = this.props
		action.var('UPDATE', { check, code, id, input })
	}
	handleRemove(item) {
		const { code, check, variables } = this.props, id = item.id
		action.var('DELETE', { code, check, id, variables })
		this.setState({ backup:item })
	}
	handleRestore() {
		const { code, check } = this.props, { backup } = this.state
		action.var('RESTORE', { backup, code, check })
		this.setState({ backup:null })
	}
}