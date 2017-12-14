import React, { Component } from 'react'
import { browserHistory } from 'react-router'
import { data } from 'stores'
import $ from 'actions'

export default class Variables extends Component {
	constructor(props) {
		super(props)
		this.state = { variables:[], count:0, clicked:false, checked:[false, false, false, false, false, false, false], 
			advanced:false, length:0, js:'' }
		this.setClicked = this.setClicked.bind(this)
		this.checkAll = this.checkAll.bind(this)
	}
	componentDidMount() {
		data.child(`${this.props.code}`).once('value').then(snap => { this.setState({ advanced:snap.val().advanced, js:snap.val().jsvars, length:snap.val().jsvars.length }) })
		data.child(`${this.props.code}/variables`).orderByChild('var').on('value', snap => {
			let variables = [], count = 0
			snap.forEach(v => {
				variables.push({ id:v.key, var:v.val().var, type:v.val().type, val:v.val().val, count:++count, vt:v.val().vt, res:v.val().res })
				this.setState({ variables:variables, count:count })
			})
			if (count == 0) {
				let key = data.child(`${this.props.code}/variables`).push({ var:'', val:'', type:'numero', vt:'', res:'' })
				variables.push({ id:key, var:'', type:'numero', val:'', count:++count, vt:'', res:'' })
				this.setState({ variables:variables, count:count })
			}
			this.checkAll()
		})		
	}
	componentWillUnmount() {
		data.child(`${this.props.code}/variables`).off()
	}
	handlerCreate(e) {
		e.preventDefault()
		data.child(`${this.props.code}/variables`).push({ var:'', val:'', type:'numero', vt:'', res:'' }).then(() => { this.checkAll() })
	}
	handlerRemove(id) {
		data.child(`${this.props.code}/variables/${id}`).remove().then(() => { this.checkAll() })
	}
	handlerUpdate(input, id) {
		data.child(`${this.props.code}/variables/${id}`).update({ [input]:$(`${input}-${id}`).value.toLowerCase().trim() }).then(() => { this.checkAll() })
	}
	setClicked() {
		this.setState({ clicked:!this.state.clicked })
	}
	setAdvanced() {
		let advanced = !this.state.advanced
		data.child(`${this.props.code}`).update({ advanced:advanced })
		this.setState({ advanced:advanced })
	}
	setFormat(value) {
		let aux = value.toLowerCase(), arr = []
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
		else if (aux.includes('+') || aux.includes('-') || aux.includes('*') || aux.includes('/') || aux.length == 1) {
			arr = aux.split('')
			for (let i = 0; i < arr.length; i++)
				if (arr[i].charCodeAt(0) >= 97 && arr[i].charCodeAt(0) <= 122) {
					arr[i] = `$${arr[i].trim()}`
				}
			aux = arr.filter(n => n).join('').split('+').join(' + ').split('-').join(' - ')
		}
		return aux
	}
	checkAll() {
		const { variables } = this.state
		let aux = [variables.length > 0 && variables[0].var != '' && variables[0].val != '', true, true, true, true, true, true]
		for (let i = 0; i < variables.length; i++) {
			let val = variables[i].val, res = variables[i].res, type = variables[i].type
			if (val.length == 1) {
				if (val.charCodeAt(0) >= 97 && val.charCodeAt(0) <= 122 && type == 'funcion') {}
				else if (Number.isInteger(parseInt(val)) && type == 'numero') {} else aux[1] = false
			} else {
				if (val == '') {
					aux[1] = false
				} else if (val.includes('+') || val.includes('-') || val.includes('*') || val.includes('/')) {
					if (type == 'numero' || type == 'texto') aux[1] = false
				} else if (val.includes('..')) {
					if (type == 'funcion' || type == 'texto') aux[1] = false
				} else if (val.includes(',')) {
					if (type == 'funcion') aux[1] = false
					else {
						let ref = val.split(','), number = true
						for (let j = 0; j < ref.length; j++) {
							if (!Number.isInteger(parseInt(ref[j].trim()))) { number = false; break }
						}
						if ((type == 'numero' && number == true) || (type == 'texto' && number == false)) {}
						else aux[1] = false
					}
				}
			}
			if (val.includes('+') || val.includes('-') || val.includes('*') || val.includes('/') || val.length == 1) {
				let arr = val.split('')
				for (let k = 0; k < arr.length; k++) {
					if (arr[k].charCodeAt(0) >= 97 && arr[k].charCodeAt(0) <= 122) {
						let ok = false
						for (let j = 0; j < variables.length; j++) {
							if (arr[k].trim() == variables[j].var) {
								ok = true; break
							}
						} if (!ok) {
							aux[2] = false; break
						}
					}
				}	
			}
			if (res && res.trim() != '' && !res.includes(variables[i].var)) {
				aux[3] = false
			}
			if (variables[i].vt.trim() == '') {
				aux[4] = false
			}
			for (let j = i + 1; j < variables.length; j++) {
				if (variables[i].var == variables[j].var) {
					aux[5] = false; break
				}
			}
		}
		for (let i = 0; i < aux.length - 1; i++) {
			if (aux[i] == false) { aux[6] = false; break }
		}
		this.setState({ checked:aux })
	}
	handlerSubmit(e) {
		e.preventDefault()
		 this.props.setActive(2)
		 browserHistory.push('/ejercicios')
	}
	updateContent() {
		let jsvars = $('js-mode').value
		this.setState({ length:$('js-mode').value.length, js:jsvars })
		data.child(`${this.props.code}`).update({ jsvars:jsvars })
	}
	render() {
		const { variables, checked, advanced, length, js } = this.state
		const { code } = this.props
		return (
			<div class="variables">
				<div class="container">
					<h3>Ingresar variables
						<span class="glyphicon glyphicon-option-vertical" onClick={this.setClicked}>
							<div class={`options ${this.state.clicked ? 'clicked' : ''}`}>
								<ul>
									<li onClick={this.setAdvanced.bind(this)}><a>{!advanced ? 'Modo avanzado' : 'Modo normal' }</a></li>
									<li onClick={() => { this.props.setActive(0); browserHistory.push('/') }}><a>Cambiar código</a></li>
									<li><a>Crear variables</a></li>
								</ul>
							</div>
						</span>
						<span class="glyphicon glyphicon-info-sign">
							<div class="info">Información sobre el funcionamiento de esta sección y el uso de variables</div>
						</span>
						{ advanced ? <span class="mode">Modo Avanzado</span> : '' }
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
							{ !advanced ? <h6><b>Variables:</b></h6> : '' }
							{ 
								!advanced ? 
								<ul> 
								{
									variables.map(m => { 
										if (m.var != '' && m.val != '') return (
											<h6 key={m.id}>${m.var.toLowerCase()} = {this.setFormat(m.val)};</h6>
										)
									})
								}
								</ul> : '' 
							}
						</div>	
						{
							!advanced ? 
							<form class="col-md-9">
								<table class="table table-condensed table-hover">
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
									<button class={`${checked[6] ? 'btn btn-success' : 'hidden'}`} onClick={this.handlerSubmit.bind(this)}>Continuar</button>
								</div>
							</form>
							:
							<form class="col-md-9">
								<textarea id="js-mode" class="js" placeholder="Ingresar código JS..." onChange={this.updateContent.bind(this)} defaultValue={js}/>
								<h6>{length > 0 ? length : ''}</h6>
							</form>
						}
					</div>
				</div>
			</div>
		)
	}
}