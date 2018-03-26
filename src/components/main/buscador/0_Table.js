import React, { Component } from 'react'
import $, { show } from 'actions'
import { DEFAULT } from 'stores'

export default class Table extends Component {
	render() {
		return (
			<table class={show(this.props.selected, 'table search table-condensed table-striped table-hover')}>
				<thead>
					<tr>
						<th>#</th>
						<th>Código del Ejercicio</th>
						<th>Versiones</th>
						<th>Generados</th>
						<th>Estado</th>
					</tr>
				</thead>
				<tbody>
				{
					this.props.search.map((m, i) => 
						<tr key={i} onClick={() => this.props.setCode(m.id)}>
							<td>{i + 1}</td>
							<td>{ m.id }</td>
							<td>{ m.versions }/{ m.limit }</td>
							<td>{ m.total }</td>
							<td>-</td>
						</tr>
					)
				}
				</tbody>
				<tfoot>
					<tr>
						<td>
							<button class="btn btn-default clean" onClick={::this.handleClear}>Limpiar</button>
						</td>
					</tr>
				</tfoot>
			</table>
		)
	}
	handleClear(e) {
		e.preventDefault()
		this.props.setState(DEFAULT.SEARCH)
		$('search-code').value = ''
	}
}