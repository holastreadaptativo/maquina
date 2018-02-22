import React, { Component } from 'react'
//import { Tabs, Text, Item } from 'components'
//import * as general from 'actions'
import EditorConvertToHTML from './EditorConvertToHTML'

export default class InsertTexto extends Component {
	constructor(props) {
		super(props)
			this.state = props.params
	}
	
	render() {
		return (
			<div class="modal-canvas modal-general">
				<div class="col-sm-12">
					<h4 class="modal-title" style={{margin: 'auto 0'}}>Insertar Texto</h4>
					<EditorConvertToHTML {...this.state} code={this.props.code} />
				</div>
				<div class="button">
					<button onClick={ this.props.add ? 
						this.props.add(this.refs.canvas, this.state) : this.props.update(this.refs.canvas, this.state)
					}>Guardar</button>
				</div>	
			</div>
		)
	}
}

//Your browser does not support the HTML5 canvas.