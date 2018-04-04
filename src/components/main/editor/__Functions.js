import React, { Component } from 'react'
import { FUNCIONES, Aside, Item, Modal } from 'components'
import { action, show } from 'actions'

export default class Functions extends Component {
	constructor() {
		super()
		this.state = { active:0, modal:false, fn:'', md:12, sm:12, xs:12, tag:'' }
	}
	render() {
		let p = this.props, f = [p.functions, p.answers, p.feedback], t = ['E', 'R', 'G']
		return (
			<Aside id={this.props.id} option={this.props.option} title="Funciones">
				<div>
				{
					FUNCIONES.map((m, i) => m.fns.length > 0 &&
						<Item key={i} id={i} title={m.name} parent={this} update={::this.handleActive}>
			          	{
			          		m.fns.map((n, j) => <li key={j} onClick={() => this.handleSelect(n.id)} class="button">{n.id}</li> )
			          	}
					    </Item>
					)
				}
				</div>
				<div class={show(f[0].length || f[1].length || f[2].length)}>
					<Item id={this.state.active} title="Clonar" parent={this}>
						<select ref="clone" class="form-control clone" defaultValue="0">
							<option value="0" disabled>Selecciona una función</option>
							{
								f.map((m, i) => 
									m.map((n, j) => <option key={j} value={n.json}>{`${t[i]} ${n.function}-${n.id.substring(4, 7)}`}</option>)
								)
							}
						</select>
						<button class="btn" onClick={::this.handleClone}>Clonar</button>
					</Item>
				</div>
			    <Modal modal={this.state.modal} setState={::this.setState}>{ this.getComponent() }</Modal>
		    </Aside>
		)
	}
    handleActive(active) {
    	this.setState({ active:active, tag:FUNCIONES[active].tag })
    }
	handleClone(e) {
		e.preventDefault()
		const { code, path } = this.props, target = this.refs.clone.value
		if (target != 0 && target != 1)
			action.exe('CLONE', { code, path, target })
	}
	handleCreate(params) {
		const { code, path } = this.props
		action.exe('CREATE', { ...this.state, code, params, path })
		this.setState({ modal:false }) 
	}
	handleSelect(fn) {
		this.setState({ modal:true, fn:fn })
	}
	getComponent() {
		let FX = null
		FUNCIONES[this.state.active].fns.forEach(m => { if (m.id == this.state.fn) FX = m.component })
       	return FX && 
       		<FX add={(x) => this.handleCreate.bind(this, x)} setState={::this.setState} fn={this.state.fn} tag={this.state.tag} push {...this.props}/>
	}
}