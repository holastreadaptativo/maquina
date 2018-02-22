import React, { Component } from 'react'

export default class Save extends Component {
	render() {
		const { add, update, params, push } = this.props
		let onSave = push ? add : update
        return (
			<div class="button">
				<button id="btn-save" onClick={onSave(params)}>Guardar</button>
			</div>
		)
	}
}