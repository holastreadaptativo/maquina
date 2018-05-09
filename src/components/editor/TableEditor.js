import React, { Component } from 'react'

export default class TableEditor extends Component {
	render () {
		const { table } = this.props.params
		return (
			<table class="table table-condensed">
				<tbody>
				{
					table.map((m, i) => 
						<tr key={i}>
						{ 
							m.value.map((n, j) => 
								<td key={j}>
									<input class={`form-control ${n.type}`} type="text" placeholder={this.getPlaceholder(n.type)} 
									value={this.getValue(n.type, n.value)}/>
								</td>
							)
						}
						</tr>
					)
				}
				</tbody>
			</table>
		)
	}
	getPlaceholder(type) {
		switch(type) {
			case 'input': { return 'Respuesta' }
			case 'image': { return 'URL de la imagen' }
			case 'text': { return 'Completar texto' }
		}
	}
	getValue(type, value) {
		switch(type) {
			case 'input': { return value.answer }
			case 'image': { return value.url }
			case 'text': { return value.text }
		}
	}
}