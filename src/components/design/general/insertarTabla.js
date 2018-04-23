import React, { Component } from 'react'
import { Editor, Item, Input } from 'components'

export default class InsertarTabla extends Component {
	constructor(props) {
		super(props)
		this.state = props.push ? { active:0, cols:2, rows:2 } : props.params
	}
	render() {
		const { cols, rows } = this.state
		let arr = [], k = 0
		for (let i = 0; i < rows; i++) {
			arr.push([])
			for (let j = 0; j < cols; j++)
				arr[i].push(<div class="form-control" type="text"></div>)
		}
		return (
			<Editor params={this.state} store={this.props} parent={this}>
				<Item id={k++} title="Tabla" parent={this}>
					<Input id="rows" prefix="filas" type="number" parent={this}/>
					<Input id="cols" prefix="columnas" type="number" parent={this}/>
					<table class="table table-condensed config">
						<tbody>
						{
							arr.map((n, k) => 
								<tr key={k}>
								{ 
									arr[k].map((m, i) => <td key={i}>{m}</td>) 
								}
								</tr>
							)
						}
						</tbody>
					</table>
				</Item>
			</Editor>
		)
	}
}