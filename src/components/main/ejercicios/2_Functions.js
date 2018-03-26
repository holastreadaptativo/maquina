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
			<Aside show={this.props.condition} title="Funciones">
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