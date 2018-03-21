import React, { Component } from 'react'
import $, { focus, show } from 'actions'
import { data, DEFAULT } from 'stores'

export default class Table extends Component {
	constructor() {
		super()
		this.state = { backup:null }
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
						this.props.variables.map((m, i) =>
							<tr key={i} class={focus(!error[i], 'error')}>
								<td>{i+1}</td>
								<td>
									<input id={`var-${m.id}`} type="text" class="form-control vr" 
									onChange={() => this.handleUpdate('var', m.id)} defaultValue={m.var}></input>
								</td>
								<td>
									<select id={`type-${m.id}`} class="form-control" defaultValue={m.type} 
									onChange={() => this.handleUpdate('type', m.id)}>
										<option value="numero">Número</option>
										<option value="funcion">Función</option>
										<option value="texto">Texto</option>
									</select>
								</td>
								<td>
									<input id={`val-${m.id}`} type="text" class="form-control" 
									onChange={() => this.handleUpdate('val', m.id)} defaultValue={m.val}></input>
								</td>
								<td>
									<input id={`res-${m.id}`} type="text" class="form-control" 
									onChange={() => this.handleUpdate('res', m.id)} defaultValue={m.res}></input>
								</td>
								<td>
									<input id={`vt-${m.id}`} type="text" class="form-control vt" 
									onChange={() => this.handleUpdate('vt', m.id)} defaultValue={m.vt}></input>
								</td>
								<td>
									<span class="glyphicon glyphicon-remove" onClick={() => this.handleRemove(m)} title="Eliminar"/>
								</td>
							</tr>
						)
					}
					</tbody>
				</table>
				<div class="add">
					<i class={show(this.state.backup, 'btn-restore')} onClick={::this.handleRestore}>restore</i>
					<button class="btn btn-default" onClick={this.handleCreate.bind(this)}>Agregar</button>
				</div>
			</form>
		)
	}
}