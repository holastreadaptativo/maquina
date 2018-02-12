import React, { Component } from 'react'
import { Modal } from 'react-bootstrap'
import * as k from 'components'
import $ from 'actions'

export default class Functions extends Component {
	constructor() {
		super()
		this.state = { active:3, setActive:this.setActive.bind(this), modal:false, fn:'' }
		this.handleModal = this.handleModal.bind(this)
	}
	componentDidMount() {
		this.setState({ active:3 })
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
        this.setState({ active:active })
    }
	addCanvas(canvas) {
		new Promise((resolve) => resolve( $('ex-design').append(canvas) ) )
		.then(() => { this.setState({ modal:false }) })
	}
	render() {
        const { active, modal, setActive, fn } = this.state
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
					          	<h3>Datos</h3>
					          	<ul>				          		
					          	{
					          		['Gráfico Datos'].map((m, i) => { return (
					          			<li key={i} onClick={this.handleFunction.bind(this, m)} class="button">{m}</li>
					          		)})
					          	}
					          	</ul>
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
					        <div class="paragraph">
					          	<h3>Geometría</h3>
					          	<ul>				          		
					          	{
					          		['Plano Cartesiano'].map((m, i) => { return (
					          			<li key={i} onClick={this.handleFunction.bind(this, m)} class="button">{m}</li>
					          		)})
					          	}
					          	</ul>
					        </div>
					    </li>
				    </ul>
			    </div>
			    <Modal show={modal} onHide={this.handleModal} aria-labelledby="contained-modal-title-lg" bsClass="modal" bsSize="large">
				{
					fn == 'Plano Cartesiano' ? <k.PlanoCartesiano add={(i) => this.addCanvas.bind(this, i)}/> : 
					fn == 'Gráfico Datos' ? <k.GraficoDatos add={(i) => this.addCanvas.bind(this, i)}/> : ''					
				}
				</Modal>
		    </div>
		)
	}
}