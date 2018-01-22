import React, { Component } from 'react'
import { Modal } from 'react-bootstrap'
import * as k from 'components'
import $ from 'actions'

export default class Functions extends Component {
	constructor() {
		super(); this.state = { active:5, setActive:this.setActive.bind(this), modal:false, fn:'' }
		this.handleModal = this.handleModal.bind(this)
	}
	componentDidMount() {
		this.setState({ active:5 })
	}
	componentWillUnmount() {
		this.setState({ modal:false })
	}
	handleModal() {
		this.setState({ modal:!this.state.modal })
	}
	handleFunction(fn) {
		this.setState({ fn:fn })
	}
    setActive(active) {
        this.setState({ active:active })
    }
	addCanvas(canvas) {
		new Promise((resolve) => resolve( $('ex-design').append(canvas) ) )
		.then(() => { this.setState({ modal:false }) })
	}
	render() {
        const { active, modal, setActive, fn } = this.state
        let items = ['Plano Cartesiano', 'Ángulos']
		return(
			<div>
				<div class="fn-accordion">
					<ul class="accordion">
					    <li class={`tabs ${active == 1 ? 'active' : ''}`} onClick={() => setActive(1)}>
					        <div class="social-links fn-numeracion">
					          	<a>Numeración</a>
					        </div>
					        <div class="paragraph">
					          	<h1>Numeración</h1>
					          	<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris dapibus vitae felis ac tempor. </p>
					        </div>
					    </li>
					    <li class={`tabs ${active == 2 ? 'active' : ''}`} onClick={() => setActive(2)}>
					        <div class="social-links fn-algebra">
					          	<a>Álgebra</a>
					        </div>
					        <div class="paragraph">
					          	<h1>Álgebra</h1>
					          	<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris dapibus vitae felis ac tempor. </p>
					        </div>
					    </li>
					    <li class={`tabs ${active == 3 ? 'active' : ''}`} onClick={() => setActive(3)}>
					        <div class="social-links fn-datos">
					          	<a>Datos</a>
					        </div>
					        <div class="paragraph">
					          	<h1>Datos</h1>
					          	<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris dapibus vitae felis ac tempor. </p>
					        </div>
					    </li>
					    <li class={`tabs ${active == 4 ? 'active' : ''}`} onClick={() => setActive(4)}>
					        <div class="social-links fn-medicion">
					          	<a>Medición</a>
					        </div>
					        <div class="paragraph">
					          	<h1>Medición</h1>
					          	<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris dapibus vitae felis ac tempor. </p>
					        </div>
					    </li>
					    <li class={`tabs ${active == 5 ? 'active' : ''}`} onClick={() => setActive(5)}>
					        <div class="social-links fn-geometria">
					          	<a>Geometría</a>
					        </div>
					        <div class="paragraph" onClick={this.handleModal}>
					          	<h3>Geometría</h3>
					          	<ul>				          		
					          	{
					          		items.map(i => { return (
					          			<li key={i} onClick={this.handleFunction.bind(this, i)} class="button">{i}</li>
					          		)})
					          	}
					          	</ul>
					        </div>
					    </li>
				    </ul>
			    </div>
			    <Modal show={modal} onHide={this.handleModal} aria-labelledby="contained-modal-title-lg" bsClass="modal" bsSize="large">
				{
					fn == items[0] ? <k.F1 add={(i) => this.addCanvas.bind(this, i)}/> : 
					fn == items[1] ? <k.F2 add={(i) => this.addCanvas.bind(this, i)}/> : ''					
				}
				</Modal>
		    </div>
		)
	}
}