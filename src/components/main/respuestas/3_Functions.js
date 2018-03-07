import React, { Component } from 'react'
import { respuestas, focus } from 'actions'
import { Modal } from 'react-bootstrap'
import { FUNCIONES } from 'components'

export default class Functions extends Component {
	constructor() {
		super()
		this.state = { active:0, fn:'', modal:false, tag:'' }
	}
	componentWillUnmount() {
		this.setState({ modal:false })
	}
	handleModal() {
		this.setState({ modal:!this.state.modal })
	}
	handleFunction(fn) {
		this.setState({ fn:fn, modal:!this.state.modal })
	}
    handleActive(active) {
    	this.setState({ active:active, tag:FUNCIONES[active].tag })
    }
	handleCreate(params) {
		respuestas('ADD', { ...this.props, ...this.state, params:params })	
		this.setState({ modal:false }) 
	}
	getComponent() {
		let FX = null
		FUNCIONES[this.state.active].fns.forEach(m => {
       		if (m.id == this.state.fn) 
       			FX = m.component
       	})
       	return FX ? 
       		<FX add={(x) => this.handleCreate.bind(this, x)} variables={this.props.variables} 
       			onHide={::this.handleModal} push/> : '' 
	}
	render() {
        return(
			<aside class={focus(this.props.condition, 'active')}>
				<div class="functions">
					<ul class="accordion">
						<div class="title">
							<h3>Funciones</h3>
						</div>
						{
							FUNCIONES.map((m, i) => { return (
								<li key={i} class={`tabs ${this.state.active == i ? 'active' : ''}`} onClick={() => this.handleActive(i)}>
							        <form>
							          	<h5>{m.name}
							          		<span class={`glyphicon glyphicon-chevron-${this.state.active == i ? 'up' : 'down'}`}/>
							          	</h5>
							          	<ul>				          		
							          	{
							          		m.fns.map((n, j) => { return (
							          			<li key={j} onClick={() => this.handleFunction(n.id)} class="button">{n.id}</li>
							          		)})
							          	}
							          	</ul>
							        </form>
							    </li>
							)})
						}
				    </ul>
			    </div>
			    <Modal show={this.state.modal} onHide={this.handleModal.bind(this)} bsClass="react-modal">
					{ this.getComponent() }	
				</Modal>
		    </aside>
		)
	}
}