import React, { Component } from 'react'
import { Editor, Item, Input } from 'components'

export default class InsertarTabla extends Component {
	constructor(props) {
		super(props)
		this.state = props.push ? { active:0, cols:2, rows:2 } : props.params
	}
	render() {
		let k = 0
		return (
			<Editor params={this.state} store={this.props} parent={this}>
				<Item id={k++} title="Tabla" parent={this}>
					<Input id="rows" prefix="filas" type="number" parent={this}/>
					<Input id="cols" prefix="columnas" type="number" parent={this}/>
				</Item>
			</Editor>
		)
	}
}