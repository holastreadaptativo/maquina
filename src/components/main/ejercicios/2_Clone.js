import React, { Component } from 'react'
import { action } from 'actions'

export default class Clone extends Component {
	render() {
		let p = this.props, f = [p.functions, p.answers, p.feedback], t = ['E', 'R', 'G']
		return (
			<div class="clone">
				<select ref="clone" class="form-control" defaultValue="-1">
					<option value="0" disabled>Selecciona una función</option>
					{
						f.map((m, i) => 
							m.map((n, j) => <option key={j} value={n.json}>{`${t[i]} ${n.function}-${n.id.substring(4, 7)}`}</option>)
						)
					}
				</select>
				<button class="btn" onClick={::this.handleClone}>Clonar</button>
			</div>
		)
	}
	handleClone() {
		let val = this.refs.clone.value
		if (val != 0 && val != 1)
			action.ejercicios('CLONE', { ...this.props, clone:val })
	}
}