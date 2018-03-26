import React, { Component } from 'react'
import { data, DEFAULT, LABELS } from 'stores'
import $, { focus, show } from 'actions'

export default class Table extends Component {
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