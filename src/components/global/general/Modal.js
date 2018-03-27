import React, { Component } from 'react'
import { Modal } from 'react-bootstrap'

export default class eModal extends Component {
	componentWillUnmount() {
		this.props.setState({ modal:false })
	}
	handleModal() {
		this.props.setState({ modal:!this.props.modal })
	}
	render() {
		return (
        	<Modal show={this.props.modal} onHide={::this.handleModal} bsClass="react-modal">
				{ this.props.children }
				<span class="react-close glyphicon glyphicon-remove" onClick={::this.handleModal}/>
			</Modal>
		)
	}
}