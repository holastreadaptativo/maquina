import React, { Component } from 'react'
import { Modal } from 'react-bootstrap'
import { FUNCIONES } from 'components'
import { data } from 'stores'
//import $ from 'actions'

export default class Functions extends Component {
	constructor() {
		super()
		this.state = { active:4, setActive:this.setActive.bind(this), fn:'', modal:false, hub:'' }
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
    	let hub = ''
    	switch (active) {
    		case 0: { hub = 'numeracion'; break; }
    		case 1: { hub = 'algebra'; break; }
    		case 2: { hub = 'medicion'; break; }
    		case 3: { hub = 'geometria'; break; }
    		case 4: { hub = 'datos'; break; }
    	}
        this.setState({ active:active, hub:hub })
    }
	addCanvas(canvas, params) {
		let container = document.createElement('div')
		container.classList.add('col-md-12')
		container.appendChild(canvas)
		new Promise((resolve) => resolve( /*$('ex-design').append(container)*/ ) )
		.then(() => { 
			data.child(this.props.code).once('value').then(snap => {
				let count = snap.val().count
				data.child(`${this.props.code}/functions`).push({ 
					function:this.state.fn, params:params, date:(new Date()).toLocaleString(), hub:this.state.hub, position:count, width:12
				}).then(() => {
					data.child(this.props.code).update({ count:count+1 })
				})
			})			
			this.setState({ modal:false }) 
		})
	}
	render() {
        const { active, modal, setActive, fn, hub } = this.state
       	let FX = null
        FUNCIONES.forEach(m => {
        	if (m.tag == hub)
        		m.fns.forEach(n => {
        			if (n.id == fn) { FX = n.component }
        		})
        })
		return(
			<div>
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
					{ FX != null ? <FX add={(x, y) => this.addCanvas.bind(this, x, y)}/> : '' }
				</Modal>
		    </div>
		)
	}
}