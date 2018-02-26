import React, { Component } from 'react'
import { Modal } from 'react-bootstrap'
import { FUNCIONES } from 'components'
import $, { show } from 'actions'
import { data } from 'stores'

export default class Functions extends Component {
	constructor() {
		super()
		this.state = { active:0, setActive:this.setActive.bind(this), fn:'', modal:false, tag:'' }
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
    setActive(active) {
    	this.setState({ active:active, tag:FUNCIONES[active].tag })
    }
	addFunction(params) {
		$('btn-save').setAttribute('disabled', 'true')
		data.child(this.props.code).once('value').then(snap => {
			let count = snap.val().count
			data.child(`${this.props.code}/functions`).push({ 
				function:this.state.fn, params:params, date:(new Date()).toLocaleString(), tag:this.state.tag, position:count, width:12
			}).then(() => {
				data.child(this.props.code).update({ count:count+1 })
			})
		})			
		this.setState({ modal:false }) 
	}
	render() {
        const { active, modal, setActive, fn } = this.state
       	let FX = null
       	FUNCIONES[active].fns.forEach(m => { 
       		if (m.id == fn) 
       			FX = m.component
       	})
		return(
			<div class={show(this.props.condition)}>
				<div class="fn-accordion">
					<ul class="accordion">
					{
						FUNCIONES.map((m, i) => { return (
							<li key={i} class={`tabs ${active == i ? 'active' : ''}`} onClick={() => setActive(i)}>
						        <div class={`social-links fn-${m.tag}`}>
						          	<a>{m.name}</a>
						        </div>
						        <div class="paragraph">
						          	<h3>{m.name}</h3>
						          	<ul>				          		
						          	{
						          		m.fns.map((n, j) => { return (
						          			<li key={j} onClick={() => this.handleFunction(n.id)} class="button">{n.id}</li>
						          		)})
						          	}
						          	</ul>
						        </div>
						    </li>
						)})
					}
				    </ul>
			    </div>
			    <Modal show={modal} onHide={::this.handleModal} aria-labelledby="contained-modal-title-lg" bsClass="modal" bsSize="large">
					{ 
						FX != null ? 
						<FX add={(x) => this.addFunction.bind(this, x)} variables={this.props.variables} push/> : '' 
					}
				</Modal>
		    </div>
		)
	}
}