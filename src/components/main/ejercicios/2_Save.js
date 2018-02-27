import React, { Component } from 'react'

export default class Save extends Component {
	render() {
		const { add, update, params, push } = this.props
		let onSave = push ? add : update
        return (
			<button id="btn-save" class="react-submit" onClick={onSave(params)}>Guardar</button>
		)
	}
}