import React, { Component } from 'react'
import { Modal } from 'react-bootstrap'
import * as k from 'components'
import { data } from 'stores'
import $ from 'actions'

export default class Functions extends Component {
	constructor() {
		super()
		this.state = { active:5, setActive:this.setActive.bind(this), modal:false, fn:'', hub:'' }
		this.handleModal = this.handleModal.bind(this)
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
    		case 1: { hub = 'numeracion'; break; }
    		case 2: { hub = 'algebra'; break; }
    		case 3: { hub = 'medicion'; break; }
    		case 4: { hub = 'geometria'; break; }
    		case 5: { hub = 'datos'; break; }
    	}
        this.setState({ active:active, hub:hub })
    }
	addCanvas(canvas, params) {
		let container = document.createElement('div')
		container.classList.add('col-md-12')
		container.appendChild(canvas)
		new Promise((resolve) => resolve( $('ex-design').append(container) ) )
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
        const { active, modal, setActive, fn } = this.state
        let functions = [
        	{ name:'Numeración', arr:[], hub:'numeracion' },
        	{ name:'Álgebra', arr:[], hub:'algebra' },
        	{ name:'Medición', arr:[], hub:'medicion' },
        	{ name:'Geometría', arr:['Plano Cartesiano'], hub:'geometria' },
        	{ name:'Datos', arr:['Gráfico Datos'], hub:'datos' }
        ]
		return(
			<div>
				<div class="fn-accordion">
					<ul class="accordion">
					{
						functions.map((m, i) => { return (
							<li key={i} class={`tabs ${active == i+1 ? 'active' : ''}`} onClick={() => setActive(i+1)}>
						        <div class={`social-links fn-${m.hub}`}>
						          	<a>{m.name}</a>
						        </div>
						        <div class="paragraph">
						          	<h3>{m.name}</h3>
						          	<ul>				          		
						          	{
						          		m.arr.map((n, j) => { return (
						          			<li key={j} onClick={this.handleFunction.bind(this, n)} class="button">{n}</li>
						          		)})
						          	}
						          	</ul>
						        </div>
						    </li>
						)})
					}
				    </ul>
			    </div>
			    <Modal show={modal} onHide={this.handleModal} aria-labelledby="contained-modal-title-lg" bsClass="modal" bsSize="large">
				{
					fn == 'Plano Cartesiano' ? <k.PlanoCartesiano add={(i, k) => this.addCanvas.bind(this, i, k)}/> : 
					fn == 'Gráfico Datos' ? <k.GraficoDatos add={(i, k) => this.addCanvas.bind(this, i, k)}/> : ''					
				}
				</Modal>
		    </div>
		)
	}
}