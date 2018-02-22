import React, { Component } from 'react'
//import { Tabs, Text, Item } from 'components'
//import * as general from 'actions'
import { save } from 'components'
import EditorConvertToHTML from './EditorConvertToHTML'

export default class InsertTexto extends Component {
	constructor(props) {
		super(props)
		if (props.push) {
			this.state = { 
				textCont: '' 
			}
		} else {
			this.state = props.params
		}
	}
	
	onContUpdate(html) {
		this.setState({
			textCont: html
		})
	}

	render() {
		return (
			<div class="modal-canvas modal-general">
				<div class="col-sm-12">
					<h4 class="modal-title" style={{margin: 'auto 0'}}>Insertar Texto</h4>
					<EditorConvertToHTML {...this.state} textCont={this.state.textCont} contUpdate={(html) => this.onContUpdate(html)}/>
				</div>
				<Save {...this.props} params={this.state}/>
			</div>
		)
	}
}