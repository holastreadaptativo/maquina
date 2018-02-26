import React, { Component } from 'react'
import { browserHistory } from 'react-router'
import $, { random, show } from 'actions'
import { DEFAULT } from 'stores'

export default class Table extends Component {
	setCode(id) {
		this.props.setCode($(`${id}-code`).innerText)
		browserHistory.push('/variables')
	}
	handleClear(e) {
		e.preventDefault()
		this.props.setState({ code:DEFAULT, search:[] })
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
							<th>Estado</th>
						</tr>
					</thead>
					<tbody>
					{
						search.map((m, i) => { 
							let aux = '' + m.id; while (aux.length < 15) aux += random(0, 10)
							return (
							<tr key={i} onClick={this.setCode.bind(this, m.id)}>
								<td>{m.id}</td>
								<td id={`${m.id}-code`}>{ aux }</td>
								<td>{ random(5, 20) }</td>
								<td>-</td>
							</tr>
						)})
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