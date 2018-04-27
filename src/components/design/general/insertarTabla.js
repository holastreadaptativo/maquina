import React, { Component } from 'react'
import { Editor, Item, Input } from 'components'

export default class InsertarTabla extends Component {
	constructor(props) {
		super(props)
		this.state = props.push ? { active:0, cols:2, rows:2 } : props.params
	}
	componentWillMount() {
		if (this.props.push) {
			const { cols, rows } = this.state
			let table = []
			for (let i = 0; i < rows; i++) {
				table.push({ id:i, value:[] })
				for (let j = 0; j < cols; j++) {
					table[i].value.push({ id:j, value:'', type:'text' })
				}
			}
			this.setState({ table })
		}
	}
	update(state, id) {
		let table = this.state.table, diff = state[id] - this.state[id]
		const { cols, rows } = this.state
		if (id == 'rows') {
			if (diff > 0) {
				for (let k = 0; k < diff; k++) {
					let i = table.length
					table.push({ id:table.length, value:[] })
					for (let j = 0; j < cols; j++) {
						table[i].value.push({ id:j, value:'', type:'text' })
					}
				}
			} else {
				table = table.slice(0, table.length + diff)
			}
		} else {
			if (diff > 0) {
				for (let i = 0; i < rows; i++) {
					let j = table[i].value.length
					for (let k = 0; k < diff; k++)
						table[i].value.push({ id:j + k, value:'', type:'text' })
				}
			} else {
				for (let i = 0; i < rows; i++) {
					table[i].value = table[i].value.slice(0, table[i].value.length + diff)
				}
			}
		}
		this.setState({ ...state, table })
	}
	changeType(i, j) {
		let table = this.state.table
		switch(table[i].value[j].type) {
			case 'text': {
				table[i].value[j].type = 'image'
				break
			}
			case 'image': {
				table[i].value[j].type = 'input'
				break
			}
			case 'input': {
				table[i].value[j].type = 'text'
				break
			}
		}
		this.setState({ table })
	}
	render() {
		let k = 0; const { table } = this.state
		return (
			<Editor params={this.state} store={this.props} parent={this}>
				<Item id={k++} title="Tabla" parent={this}>
					<Input id="rows" prefix="filas" type="number" update={s => ::this.update(s, 'rows')} parent={this}/>
					<Input id="cols" prefix="columnas" type="number" update={s => ::this.update(s, 'cols')} parent={this}/>
					<table class="table table-condensed config">
						<tbody>
						{
							table.map((m, i) => 
								<tr key={i}>
								{ 
									m.value.map((n, j) => 
										<td key={j}>
											<div class={`form-control ${n.type}`} onClick={() => ::this.changeType(i, j)}></div>
										</td>
									)
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