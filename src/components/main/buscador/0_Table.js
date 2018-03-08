import React, { Component } from 'react'
import { browserHistory } from 'react-router'
import $, { show, random } from 'actions'
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
							<th>Estado</th>
						</tr>
					</thead>
					<tbody>
					{
						search.map((m, i) => { 
							return (
							<tr key={i} onClick={() => this.setCode(m)}>
								<td>{i}</td>
								<td id={`${i}-code`}>{ m }</td>
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