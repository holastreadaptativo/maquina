import React, { Component } from 'react'
import { FUNCIONES, Aside, Modal } from 'components'
import { data, LABELS } from 'stores'
import { action } from 'actions'

export default class Overview extends Component {
	constructor() {
		super()
		this.state = { modal:false, drag:'', fn:'', id:'', params:'', tag:'' }
	}
	render() {
		return (
        	<Aside show={this.props.id == this.props.option} title={LABELS.NAME[this.props.path]}>
				<table class="draggable">
					<tbody>
					{
						this.props[this.props.path].map((m, i) => { 
							let k = 0, d = `${m.id}-/${i}-/`
								return (
									<tr key={i} id={d.concat(k++)} class={m.tag} onDrop={::this.handleChange} onDragOver={e => e.preventDefault()} 
										draggable="true" onDragStart={e => this.setState({ drag:e.target.id })}>
										<td id={d.concat(k++)}><h6 id={d.concat(k++)}>{i+1}</h6></td>
										<td id={d.concat(k++)}><h6 id={d.concat(k++)}>{m.function}-{m.id.substring(4, 7)}</h6></td>
										<td>
											<select defaultValue={m.width.md} id={m.id} onChange={::this.handleWidth}>
												{ LABELS.SIZE.map((m, i) => <option key={i} value={m}>{Math.round(250/3*m, 2)/10+'%'}</option> ) }
											</select>
										</td>
										<td>
											<span class="glyphicon glyphicon-pencil" onClick={() => this.handleSelect(m.function, m.params, m.id)}/>
											<span class="glyphicon glyphicon-trash" onClick={() => this.handleRemove(m.id)}/>
										</td>
									</tr>
								)
							}
						)
					}
					</tbody>
				</table>
			    <Modal modal={this.state.modal} setState={::this.setState}>{ this.getComponent() }</Modal>
			</Aside>
		)
	}
	handleSelect(fn, params, id) {
		this.setState({ modal:true, fn:fn, params:params, id:id })
	}	
	handleUpdate(params) {
		action.exe('UPDATE', { ...this.props, ...this.state, params:params })
		this.setState({ modal:false })
	}
	handleRemove(id) {
		if (confirm('¿Estas seguro de borrar la función?'))
			action.exe('REMOVE', { ...this.props, id:id })
	}
	handleChange(e) {
	    e.preventDefault()
	    let drag = this.state.drag.split('-/'), i = Number.parseInt(drag[1]), 
	    	drop = e.target.id.split('-/'), f = Number.parseInt(drop[1])
	    if (drag.length > 1)
	    	action.exe('MOVE', { ...this.props, i:i, f:f })
	}
	handleWidth(e) {
		data.child(`${this.props.code}/${this.props.path}/${e.target.id}/width`).update({ md:Number(e.target.value) })
	}
	getComponent() {
		let FX = null
		FUNCIONES.forEach(m => { m.fns.forEach(n => { if (n.id == this.state.fn) FX = n.component }) })
		return FX &&
       		<FX update={(x) => this.handleUpdate.bind(this, x)} id={this.state.id} fn={this.state.fn} {...this.props} params={this.state.params}/>
	}
}