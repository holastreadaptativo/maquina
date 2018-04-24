import React, { Component } from 'react'
import { Editor, Item, Input } from 'components'

export default class InsertarTabla extends Component {
	constructor(props) {
		super(props)
		this.state = props.push ? { active:0, cols:2, rows:2 } : props.params
	}
	componentWillMount() {
		if (this.props.push) {
			this.setState({ table:this.getTable() })
		}
	}
	getTable() {
		const { cols, rows } = this.state
		let table = []
		for (let i = 0; i < rows; i++) {
			table.push([])
			for (let j = 0; j < cols; j++) {
				table[i].push(<div class={`form-control ${1}`} type="text" onClick={''}></div>)
			}
		}
		return table
	}
	render() {
		let k = 0, table = this.getTable()
		return (
			<Editor params={this.state} store={this.props} parent={this}>
				<Item id={k++} title="Tabla" parent={this}>
					<Input id="rows" prefix="filas" type="number" parent={this}/>
					<Input id="cols" prefix="columnas" type="number" parent={this}/>
					<table class="table table-condensed config">
						<tbody>
						{
							table.map((n, j) => 
								<tr key={j}>
								{ 
									table[j].map((m, i) => <td key={i}>{m}</td>) 
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