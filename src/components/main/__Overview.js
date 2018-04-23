import React, { Component } from 'react'
import { FUNCIONES, Aside, Item, Modal } from 'components'
import { action, focus, glyph } from 'actions'
import { DEFAULT, LABELS } from 'stores'

export default class Overview extends Component {
	constructor() {
		super()
		this.state = { active:0, modal:false, drag:'', fn:'', id:'', params:'', tag:'general' }
	}	
	handleRemove(id) {
		const { code, path } = this.props
		if (confirm('¿Estas seguro de borrar la función?'))
			action.exe('DELETE', { code, id, path })
	}
	handleSelect(fn, params, id, tag) {
		this.setState({ modal:true, id, fn, params, tag })
	}
	handleSwitch(e) {
	    e.preventDefault()
		const { code, path } = this.props
	    let drag = this.state.drag.split('-/'), i = Number.parseInt(drag[1]), 
	    	drop = e.target.id.split('-/'), f = Number.parseInt(drop[1])

	    console.log('inicial: ' + i + ' - final: ' + f)
	    if (drag.length > 1)
	    	action.exe('SWITCH', { code, i, f, path })
	}
	handleUpdate(params) {
		const { code, path } = this.props, { id } = this.state
		action.exe('UPDATE', { code, id, params, path })
		this.setState({ modal:false })
	}
	handleWidth(e) {
		const { code, path } = this.props, { id, value } = e.target
		action.exe('WIDTH', { code, id:id.split('::')[1], path, value })
	}
	getComponent() {
		let FX = null
		FUNCIONES.forEach(m => { m.fns.forEach(n => { if (n.id == this.state.fn) FX = n.component }) })
		return FX &&
       		<FX update={(x) => this.handleUpdate.bind(this, x)} {...this.props} {...this.state}/>
	}
	render() {
		let p = this.props, t = ['E', 'R', 'G']
		return (
        	<Aside id={p.id} option={p.option} title="Selección">
				<nav>
				{
					t.map((m, i) => 
						<li key={i} class={`col-sm-4 ${focus(p.tab == i, 'active')}`} 
							onClick={() => p.setState({ section:DEFAULT.FNS[i], tab:i }) }>{m}</li>
					)
				}
				</nav>
				<Item id={this.state.active} title="Actualizar" parent={this}>
					<table class="draggable">
						<tbody>
						{
							p[p.path].map((m, i) => { 
								let k = 0, d = `${m.id}-/${i}-/`
									return (
										<tr key={i} id={d.concat(k++)} class={m.tag} onDrop={::this.handleSwitch} onDragOver={e => e.preventDefault()} 
											draggable="true" onDragStart={e => { this.setState({ drag:e.target.id }) }}>
											<td id={d.concat(k++)}><h6 id={d.concat(k++)}>{i+1}</h6></td>
											<td id={d.concat(k++)}><h6 id={d.concat(k++)}>{m.name}-{m.id.substring(4, 7)}</h6></td>
											<td>
												<select defaultValue={m.width.md} id={`${p.path}::${m.id}`} onChange={::this.handleWidth}>
												{ 
													LABELS.SIZE.map((m, i) => <option key={i} value={m}>{Math.round(250/3*m, 2)/10+'%'}</option> ) 
												}
												</select>
											</td>
											<td>
												<span class={glyph('pencil')} onClick={() => this.handleSelect(m.name, m.params, m.id, m.tag)}/>
												<span class={glyph('trash')} onClick={() => this.handleRemove(m.id)}/>
											</td>
										</tr>
									)
								}
							)
						}
						</tbody>
					</table>
				</Item>
			    <Modal modal={this.state.modal} setState={::this.setState}>{ this.getComponent() }</Modal>
			</Aside>
		)
	}
}