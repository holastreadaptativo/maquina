import React, { Component } from 'react'
import { Modal } from 'react-bootstrap'
import { glyph, show } from 'actions'
import { MATH } from 'stores'

export default class eModal extends Component {
	constructor() {
		super()
		this.state = { help:false }
	}
	componentWillUnmount() {
		this.props.setState({ modal:false })
	}
	handleModal() {
		this.props.setState({ modal:!this.props.modal })
                this.setState({ help:false })
	}
	handleHelp() {
		this.setState({ help:!this.state.help })
	}
	render() {
		return (
        	<Modal show={this.props.modal} onHide={::this.handleModal} bsClass="react-modal">
        		{ this.props.children }
        		<span class={glyph('info-sign react-help')} onClick={::this.handleHelp}/>
        		<div class={show(this.state.help ,'react-info')}>
        			<h4>Math</h4>
        			<h5>Descripción</h5>
        			<p>Math es un objeto incorporado por JavaScript que posee propiedades y métodos creados por constantes y funciones matemáticas.<br/> No es un objeto de función.</p>
        			<h5>Propiedades</h5>
        			<p>{ MATH.props.map((m, i) => <tr key={i}><td><b>{m.prop}:</b></td><td>{m.desc}</td></tr> )}</p>
        			<h5>Funciones</h5>
        			<p>{ MATH.funcs.map((m, i) => <tr key={i}><td><b>{m.func}:</b></td><td>{m.desc}</td></tr> )}</p>
        		</div>
				<span class={glyph('remove react-close')} onClick={::this.handleModal}/>
			</Modal>
		)
	}
}