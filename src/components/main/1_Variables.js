import React, { Component } from 'react'
import $, { checkAll, focus, setFormat, show } from 'actions'
import { Section, Panel, Well } from 'components'
import { data, DEFAULT, LABELS } from 'stores'

export default class Variables extends Component {
	constructor() {
		super()
		this.state = { variables:[], clicked:false, checked:[[], []] }
	}
	componentWillMount() {
		data.child(`${this.props.code}/variables`).on('value', snap => {
			let variables = []
			snap.forEach(v => {
				variables.push({ id:v.key, var:v.val().var, type:v.val().type, val:v.val().val, vt:v.val().vt, res:v.val().res })
				this.setState({ variables:variables })
			})
			if (variables.length == 0) {
				let key = data.child(`${this.props.code}/variables`).push(DEFAULT.EMPTY).key
				variables.push({ id:key, ...DEFAULT.EMPTY })
				this.setState({ variables:variables })
			}
			this.setState({ checked:checkAll(variables) })
		})	
	}
	componentWillUnmount() {
		data.child(`${this.props.code}/variables`).off()
	}
	handleClick() {
		this.setState({ clicked:!this.state.clicked })
	}
	checkAll() {
		this.setState({ checked:checkAll(this.state.variables) })
		this.props.setNotification(!this.state.checked[0][6] ? 'Error en el ingreso de variables' : null, 'danger')
	}
	render() {
		const { variables, checked } = this.state
		const { code, setActive } = this.props
		return (
			<Section style="variables" condition={checked[0][6]} {...this.props}>
				<div class="row">
					<Resume code={code} variables={variables}/>
					<Panel container="table">
						<Table code={code} checked={checked} variables={variables} checkAll={::this.checkAll}/>
						<Check checked={checked} variables={variables} setActive={setActive}/>
					</Panel>
				</div>
			</Section>
		)
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
		return `glyphicon glyphicon-${this.props.checked[0][condition] ? 'ok' : 'remove'}`
	}
}

class Resume extends Component {
	render() {
		return (
			<Well title="Resumen">
				<h5 class="title">Ejercicio</h5>
				{
					LABELS.CODE.map((m, i) => { let x = i < 5 ? 2 : 5; return (
						<h5 key={i}>{m}: {this.props.code.length >= 2*i + x ? this.props.code.substring(2*i, 2*i + x) : '-' }</h5>
					)})
				}
				<h6 class="br"/>
				<h5 class="title">Variables</h5>
				<ul> 
				{
					this.props.variables.map(m => { 
						if (m.var != '' && m.val != '') return (
							<h5 key={m.id}>${m.var.trim()} = {setFormat(m.val)};</h5>
						)
					})
				}
				</ul>
			</Well>
		)
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
								<h6><span class="glyphicon glyphicon-remove" onClick={() => this.handleRemove(m)} title="Eliminar"/></h6>
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
		data.child(`${this.props.code}/variables`).push(DEFAULT.EMPTY).then(() => { this.props.checkAll() })
	}
	handleUpdate(input, id) {
		data.child(`${this.props.code}/variables/${id}`).update({ 
			[input]:$(`${input}-${id}`).value.trim() }).then(() => { this.props.checkAll() })
	}
	handleRemove(item) {
		let id = item.id
		if (this.props.variables.length > 1)
			data.child(`${this.props.code}/variables/${id}`).remove().then(() => { this.props.checkAll() })
		else {
			$(`var-${id}`).value = $(`val-${id}`).value = $(`res-${id}`).value = $(`vt-${id}`).value = ''
			data.child(`${this.props.code}/variables/${id}`).remove().then(() => { this.props.checkAll() })
		}
		this.setState({ backup:item })
	}
	handleRestore() {
		const { backup } = this.state
		data.child(`${this.props.code}/variables/${backup.id}`).update({ 
			var:backup.var, val:backup.val, type:backup.type, vt:backup.vt, res:backup.res 
		})
		this.setState({ backup:null })
	}
}