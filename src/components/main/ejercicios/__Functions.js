import React, { Component } from 'react'
import { FUNCIONES, Aside, Item, Modal } from 'components'
import { action } from 'actions'

export default class Functions extends Component {
	constructor(props) {
		super(props)
		this.state = { active:0, modal:false, container:props.container, feedback:'', fn:'', md:12, sm:12, xs:12, tag:'' }
	}
	render() {
		return (
			<Aside show={this.props.id == this.props.option} title="Funciones">
				{
					FUNCIONES.map((m, i) => m.fns.length > 0 &&
						<Item key={i} id={i} active={this.state.active} title={m.name} setActive={::this.handleActive}>
			          	{
			          		m.fns.map((n, j) => <li key={j} onClick={() => this.handleSelect(n.id)} class="button">{n.id}</li> )
			          	}
					    </Item>
					)
				}
			    <Modal modal={this.state.modal} setState={::this.setState}>{ this.getComponent() }</Modal>
		    </Aside>
		)
	}
	handleSelect(fn) {
		this.setState({ modal:true, fn:fn })
	}
    handleActive(active) {
    	this.setState({ active:active, tag:FUNCIONES[active].tag })
    }
	handleCreate(params) {
		action.ejercicios('ADD', { ...this.props, ...this.state, params:params })
		this.setState({ modal:false }) 
	}
	getComponent() {
		let FX = null
		FUNCIONES[this.state.active].fns.forEach(m => { if (m.id == this.state.fn) FX = m.component })
       	return FX && 
       		<FX add={(x) => this.handleCreate.bind(this, x)} setState={::this.setState} fn={this.state.fn} push {...this.props}/>
	}
}

export class Clone extends Component {
	render() {
		let p = this.props, f = [p.functions, p.answers, p.feedback], t = ['E', 'R', 'G']
		return (
			<div class="clone">
				<select ref="clone" class="form-control" defaultValue="-1">
					<option value="0" disabled>Selecciona una función</option>
					{
						f.map((m, i) => 
							m.map((n, j) => <option key={j} value={n.json}>{`${t[i]} ${n.function}-${n.id.substring(4, 7)}`}</option>)
						)
					}
				</select>
				<button class="btn" onClick={::this.handleClone}>Clonar</button>
			</div>
		)
	}
	handleClone() {
		let val = this.refs.clone.value
		if (val != 0 && val != 1)
			action.ejercicios('CLONE', { ...this.props, target:val })
	}
}