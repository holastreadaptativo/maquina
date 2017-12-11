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
		data.child(`${this.props.code}/variables/${id}`).update({ [input]:$(`${input}-${id}`).value.trim() })
	}
	render() {
		let code = this.props.params.id
		const { variables } = this.state
		return (
			<div class="variables">
				<div class="container">
					<h3>Ingreso de Variables</h3>				
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
									if (m.var == '' || m.val == '') return

									let val = m.val, aux = []
									if (val.includes('..')) val = `[${m.val}]`
									if (val.includes('-')) {
										aux = val.split('-'); //
										for (let i = 0; i < aux.length; i++) {
											if (!aux[i].startsWith('$'))
												aux[i] = '$' + aux[i].trim()
										}
										val = aux.join(' - ')
									}
									if (val.includes('+')) {
										aux = val.split('+'); //
										for (let i = 0; i < aux.length; i++) {
											if (!aux[i].startsWith('$'))
												aux[i] = '$' + aux[i].trim()
										}
										val = aux.join(' + ')
									}							
									return (
										<h6 key={m.id}>${m.var} = {val};</h6>
								)})
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
												<span class="glyphicon glyphicon-remove" onClick={this.handlerRemove.bind(this, m.id)}/>
											</td>
										</tr>
									)})
								}
								</tbody>
							</table>
							<div class="add">		
								<button class="btn btn-default" onClick={this.handlerCreate.bind(this)}>Agregar</button>
							</div>
						</form>
					</div>
				</div>
			</div>
		)
	}
}