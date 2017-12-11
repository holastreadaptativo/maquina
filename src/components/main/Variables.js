import React, { Component } from 'react'
import { data } from 'stores'
import $ from 'actions'

export default class Variables extends Component {
	constructor(props) {
		super(props); this.state = { variables:[], count:0 }
	}
	componentDidMount() {
		data.child(`${this.props.code}/variables`).orderByChild('var').on('value', snap => {
			let variables = [], count = 0
			snap.forEach(v => {
				variables.push({ id:v.key, var:v.val().var, type:v.val().type, val:v.val().val, count:++count, vt:v.val().vt, res:v.val().res })
				this.setState({ variables:variables, count:count })
			})
			if (count == 0) {
				let key = data.child(`${this.props.code}/variables`).push({ var:'', val:'', type:'numero', vt:'', res:'' })
				variables.push({ id:key, var:'', type:'numero', val:'', vt:'', res:'', count:++count })
				this.setState({ variables:variables, count:count })
			}
		})		
	}
	componentwillUnmount() {
		data.child(`${this.props.code}/variables`).off()
	}
	handlerCreate(e) {
		e.preventDefault()
		data.child(`${this.props.code}/variables`).push({ var:'', val:'', type:'numero', vt:'', res:'' })
	}
	handlerRemove(id) {
		data.child(`${this.props.code}/variables/${id}`).remove()
	}
	handlerUpdate(input, id) {
		data.child(`${this.props.code}/variables/${id}`).update({ [input]:$(`${input}-${id}`).value.toLowerCase().trim() })
	}
	setFormat(val) {
		let aux = val.toLowerCase(), arr = []
		if (aux.includes('..')) {
			arr = aux.split(',')
			for (let i = 0; i < arr.length; i++) {
				let k = arr[i].split('..')
				for (let j = 0; j < k.length; j++) {
					k[j] = k[j].replace('.', '')
				}
				arr[i] = k.filter(n => n).join('..')
			}
			aux = `[${arr.join(', ')}]`
		}
		else if (aux.includes('+') || aux.includes('-') || aux.includes('*') || aux.includes('/')) {
			arr = aux.split('')
			for (let i = 0; i < arr.length; i++)
				if (arr[i].charCodeAt(0) >= 97 && arr[i].charCodeAt(0) <= 122) {
					arr[i] = `$${arr[i].trim()}`
				}
			aux = arr.filter(n => n).join('').split('+').join(' + ').split('-').join(' - ')
		}
		return aux
	}
	check(val) {
		const { variables } = this.state
		switch(val) {
			case 0: if (variables.length > 0) return 'ok'
			case 1: for (let i = 0; i < variables.length; i++) {
						let val = variables[i].val, type = variables[i].type
						if (val.includes('..') && type != 'numero') return 'remove'
						if (val.includes('+') || val.includes('-') || val.includes('*') || val.includes('/')) {
							if (type != 'funcion') return 'remove'
						} else {
							if (type == 'funcion') return 'remove'
						}
						if (val.includes(',')) {
							let aux = val.split(','), number = true
							for (let j = 0; j < aux.length; j++) {
								if (!Number.isInteger(parseInt(aux[j].trim()))) { number = false; break }
							}
							if ((type == 'numero' && number == true) || (type == 'texto' && number == false)) {}
							else return 'remove'
						}
						else if (Number.isInteger(parseInt(val.trim())) && type != 'numero') return 'remove'
					}
					return 'ok'
			case 2: for (let i = 0; i < variables.length; i++) {
						let aux = variables[i].val
						if (aux.includes('+') || aux.includes('-') || aux.includes('*') || aux.includes('/')) {
							let arr = aux.split('')
							for (let k = 0; k < arr.length; k++)
								if (arr[k].charCodeAt(0) >= 97 && arr[k].charCodeAt(0) <= 122) {
									let ok = false
									for (let j = 0; j < variables.length; j++) {
										if (arr[k].trim() == variables[j].var) {
											ok = true; break
										}
									}
									if (!ok) return 'remove'
								}
						}
					}
					return 'ok'
			case 3: for (let i = 0; i < variables.length; i++)
						if (variables[i].res && variables[i].res.trim() != '' && !variables[i].res.includes(variables[i].var))
							return 'remove'
					return 'ok'
			case 4: for (let i = 0; i < variables.length; i++)
						if (variables[i].vt.trim() == '')
							return 'remove'
					return 'ok'
			case 5: for (let i = 0; i < variables.length; i++) 
						for (let j = i + 1; j < variables.length; j++) 
							if (variables[i].var == variables[j].var)
								return 'remove'
					return 'ok'
			default: return 'remove'
		}
	}
	render() {
		let code = this.props.params.id
		const { variables } = this.state
		return (
			<div class="variables">
				<div class="container">
					<h3>Ingreso de Variables
						<span class="glyphicon glyphicon-option-vertical"/>
						<span class="glyphicon glyphicon-info-sign">
							<div class="info">Información sobre el funcionamiento de esta sección y el uso de variables</div>
						</span>
					</h3>				
					<div class="row">
						<div class="col-md-3 resume">
							<h5><b>Resumen</b></h5>
							<h6><b>Ejercicio:</b></h6>
							<h6>Id: {code}</h6>
							<h6>Nivel: {code.substring(0,2)}</h6>
							<h6>Eje: {code.substring(2,4)}</h6>
							<h6>OA: {code.substring(4,6)}</h6>
							<h6>IE: {code.substring(6,8)}</h6>
							<h6>Tipo: {code.substring(8,10)}</h6>
							<h6 class="code">Ejercicio: {code.substring(10,15)}</h6>
							<h6><b>Variables:</b></h6>
							<ul> 
							{
								variables.map(m => { 
									if (m.var != '' && m.val != '') return (
										<h6 key={m.id}>${m.var.toLowerCase()} = {this.setFormat(m.val)};</h6>
									)
								})
							}
							</ul>
						</div>	
						<form class="col-md-9">
							<table class="table table-condensed table-striped table-hover">
								<thead>
									<tr>
										<th>#</th>
										<th>Variable</th>
										<th>Tipo</th>
										<th>Valores</th>
										<th>Restricción</th>
										<th>VT</th>
										<th></th>
									</tr>
								</thead>
								<tbody>
								{
									variables.map(m => { return (
										<tr key={m.id}>
											<td>{m.count}</td>
											<td>
												<input id={`var-${m.id}`} type="text" class="form-control" onChange={this.handlerUpdate.bind(this, 'var', m.id)} defaultValue={m.var}></input>
											</td>
											<td>
												<select id={`type-${m.id}`} class="form-control" defaultValue={m.type} onChange={this.handlerUpdate.bind(this, 'type', m.id)}>
													<option value="numero">Número</option>
													<option value="funcion">Función</option>
													<option value="texto">Texto</option>
												</select>
											</td>
											<td>
												<input id={`val-${m.id}`} type="text" class="form-control" onChange={this.handlerUpdate.bind(this, 'val', m.id)} defaultValue={m.val}></input>
											</td>
											<td>
												<input id={`res-${m.id}`} type="text" class="form-control" onChange={this.handlerUpdate.bind(this, 'res', m.id)} defaultValue={m.res}></input>
											</td>
											<td>
												<input id={`vt-${m.id}`} type="text" class="form-control vt" onChange={this.handlerUpdate.bind(this, 'vt', m.id)} defaultValue={m.vt}></input>
											</td>
											<td>
												<span class="glyphicon glyphicon-remove" onClick={this.handlerRemove.bind(this, m.id)} title="Eliminar"/>
											</td>
										</tr>
									)})
								}
								</tbody>
							</table>
							<div class="add">		
								<button class="btn btn-default" onClick={this.handlerCreate.bind(this)}>Agregar</button>
							</div>
							<ul class="checklist">
								<li class="title"><b>Requisitos</b></li>
								<li title="Crear al menos una variable, esta debe cumplir con todas las condiciones que suceden a esta">
									<span class={`glyphicon glyphicon-${this.check(0)}`}/>Ingresar al menos una variable para el desarrollo del ejercicio
								</li>
								<li title="Para cada variable seleccionar si es número, función o texto, e ingresar sus posibles valores">
									<span class={`glyphicon glyphicon-${this.check(1)}`}/>Ingresar correctamente el tipo de variable y sus posibles valores
								</li>
								<li title="Todas las variables usadas en las ecuaciones deben existir, es decir, deben ser creadas en otra fila">
									<span class={`glyphicon glyphicon-${this.check(2)}`}/>Ingresar una variable por cada variable usada en las ecuaciones
								</li>
								<li title="Si en una fila se crea la variable $a, y una restricción, esta debe incluir la variable $a">
									<span class={`glyphicon glyphicon-${this.check(3)}`}/>Ingresar restricciones que incluyan la variable referenciada
								</li>
								<li title="Para cada variable creada se debe ingresar los valores usados en el ejercicio del video tutorial">
									<span class={`glyphicon glyphicon-${this.check(4)}`}/>Ingresar para cada variable el valor del el video tutorial
								</li>
								<li title="Si en una fila se crea la variable $a, esta variable no debe volver a definirse en otra fila">
									<span class={`glyphicon glyphicon-${this.check(5)}`}/>Ingresar variables distintas, no repetir la letra
								</li>
							</ul>
						</form>
					</div>
				</div>
			</div>
		)
	}
}