import React, { Component } from 'react'
import { browserHistory } from 'react-router'
import $, { show } from 'actions'
import { DEFAULT } from 'stores'

export default class Table extends Component {
	setCode(code) {
		this.props.setCode(code)
		browserHistory.push('/variables')
	}
	handleClear(e) {
		e.preventDefault()
		this.props.setState({ code:DEFAULT.CODE, search:[] })
		$('search-code').value = ''
	}
	render() {
		const { search, selected } = this.props
		return (
			<div>
				<table class={show(selected, 'table table-condensed table-striped table-hover')}>
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
						search.map((m, i) => 
							<tr key={i} onClick={() => this.setCode(m.id)}>
								<td>{i + 1}</td>
								<td>{ m.id }</td>
								<td>{ m.versions }/{ m.limit }</td>
								<td>{ m.total }</td>
								<td>-</td>
							</tr>
						)
					}
					</tbody>
				</table>
				<section>
					<button class={show(selected, 'btn btn-default clean')} onClick={::this.handleClear}>Limpiar</button>
				</section>
			</div>
		)
	}
}