import React, { Component } from 'react'
import $, { focus } from 'actions'
import { data } from 'stores'

export default class Table extends Component {
	handlerCreate(e) {
		e.preventDefault()
		data.child(`${this.props.code}/variables`).push({ var:'', val:'', type:'numero', vt:'', res:'' })
		.then(() => { this.props.checkAll() })
	}
	handlerUpdate(input, id) {
		data.child(`${this.props.code}/variables/${id}`).update({ [input]:$(`${input}-${id}`).value.toLowerCase().trim() })
		.then(() => { this.props.checkAll() })
	}
	handlerRemove(id) {
		data.child(`${this.props.code}/variables/${id}`).remove().then(() => { this.props.checkAll() })
	}
	render() {
		let error = this.props.checked[1]
		return (
			<form>
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
						this.props.variables.map((m, i) => { return (
							<tr key={i} class={focus(!error[i], 'error')}>
								<td>{i+1}</td>
								<td>
									<input id={`var-${m.id}`} type="text" class="form-control vr" 
									onChange={this.handlerUpdate.bind(this, 'var', m.id)} defaultValue={m.var}></input>
								</td>
								<td>
									<select id={`type-${m.id}`} class="form-control" defaultValue={m.type} 
									onChange={this.handlerUpdate.bind(this, 'type', m.id)}>
										<option value="numero">Número</option>
										<option value="funcion">Función</option>
										<option value="texto">Texto</option>
									</select>
								</td>
								<td>
									<input id={`val-${m.id}`} type="text" class="form-control" 
									onChange={this.handlerUpdate.bind(this, 'val', m.id)} defaultValue={m.val}></input>
								</td>
								<td>
									<input id={`res-${m.id}`} type="text" class="form-control" 
									onChange={this.handlerUpdate.bind(this, 'res', m.id)} defaultValue={m.res}></input>
								</td>
								<td>
									<input id={`vt-${m.id}`} type="text" class="form-control vt" 
									onChange={this.handlerUpdate.bind(this, 'vt', m.id)} defaultValue={m.vt}></input>
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
			</form>
		)
	}
}