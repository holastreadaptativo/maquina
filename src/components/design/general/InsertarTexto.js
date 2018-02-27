import React, { Component } from 'react'
import { Modal } from 'components'
import EditorConvertToHTML from './EditorConvertToHTML'

export default class InsertTexto extends Component {
	constructor(props) {
		super(props)
		this.state = props.push ? { textCont: '' } : props.params
	}
	onContUpdate(html) {
		this.setState({ textCont:html })
	}
	render() {
		return (
			<Modal title="Insertar Texto" params={this.state} store={this.props}>
				<div class="col-sm-12">
					<EditorConvertToHTML {...this.state} textCont={this.state.textCont} contUpdate={(html) => this.onContUpdate(html)}/>
				</div>
			</Modal>
		)
	}
}