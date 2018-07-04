import React, { Component } from 'react'
import { Editor, Item, Input } from 'components'
import { show } from 'actions'

export default class InsertarTabla extends Component {
	constructor(props) {
		super(props)
		this.state = props.push ? { active:0, cols:2, rows:2, x:null, y:null } : props.params
	}
	componentWillMount() {
		if (this.props.push) {
			const { cols, rows } = this.state
			let table = []
			for (let i = 0; i < rows; i++) {
				table.push({ id:i, value:[] })
				for (let j = 0; j < cols; j++) {
					table[i].value.push({ id:j, value:{ text:'-' }, type:'text' })
				}
			}
			this.setState({ table })
		}
	}
	changeType(e, i, j) {
		e.preventDefault()
		let table = this.state.table
		switch(table[i].value[j].type) {
			case 'text': {
				table[i].value[j].type = 'image'
				table[i].value[j].value = { url:'-', height:20, width:20 }
				break
			}
			case 'image': {
				table[i].value[j].type = 'input'
				table[i].value[j].value = { answer:'-' }
				break
			}
			case 'input': {
				table[i].value[j].type = 'text'
				table[i].value[j].value = { text:'-' }
				break
			}
		}
		this.setState({ table })
	}
	handleChange(e, i, j) {
		let table = this.state.table
		table[i].value[j].value[e.target.name] = e.target.value
		this.setState({ table })
	}
	handleSelect(i, j) {
		const { x, y } = this.state
		if (x != i || y != j)
			this.setState({ x:i, y:j })
		else
			this.setState({ x:null, y:null })
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
	render() {
		const { x, y, table } = this.state; let k = 0
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
											<div class={`form-control ${n.type}`} onClick={() => ::this.handleSelect(i, j)} 
											onContextMenu={e => ::this.changeType(e, i, j)}>
												<i class={show(x == i && y == j, 'nav')}>arrow_drop_up</i>
											</div>
											<div class={show(n.type == 'image' && x == i && y == j, 'form-config')}>
												<div class="input-group">
													<span class="input-group-addon">url</span>
													<input name="url" type="text" defaultValue={n.value.url} class="form-control"
													onChange={e => ::this.handleChange(e, i, j)}></input>
												</div>
												<div class="input-group">
													<span class="input-group-addon">alto</span>
													<input name="height" type="number" defaultValue={n.value.height} class="form-control"
													onChange={e => ::this.handleChange(e, i, j)}></input>
												</div>
												<div class="input-group">
													<span class="input-group-addon">ancho</span>
													<input name="width" type="number" defaultValue={n.value.width} class="form-control"
													onChange={e => ::this.handleChange(e, i, j)}></input>
												</div>
											</div>
											<div class={show(n.type == 'input' && x == i && y == j, 'form-config')}>
												<div class="input-group">
													<span class="input-group-addon">respuesta</span>
													<input name="answer" class="form-control" type="text" defaultValue={n.value.answer} 
													onChange={e => ::this.handleChange(e, i, j)}></input>
												</div>
												<div class="input-group">
													<span class="input-group-addon">error</span>
													<input name="error" class="form-control" type="text" defaultValue={n.value.error} 
													onChange={e => ::this.handleChange(e, i, j)}></input>
												</div>
												<div class="input-group">
													<span class="input-group-addon">feedback</span>
													<input name="feed" class="form-control" type="text" defaultValue={n.value.feed} 
													onChange={e => ::this.handleChange(e, i, j)}></input>
												</div>
											</div>
											<div class={show(n.type == 'text' && x == i && y == j, 'form-config')}>
												<div class="input-group">
													<span class="input-group-addon">texto</span>
													<input name="text" class="form-control" type="text" defaultValue={n.value.text} 
													onChange={e => ::this.handleChange(e, i, j)}></input>
												</div>
											</div>
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