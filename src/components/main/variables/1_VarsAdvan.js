import React, { Component } from 'react'
import { data } from 'stores'
import $ from 'actions'

export default class Advanced extends Component {
	constructor(props) {
		super(props); this.state = { length:0, js:'' }	
	}
	componentDidMount() {
		data.child(`${this.props.code}`).once('value').then(snap => { this.setState({ js:snap.val().jsvars, length:snap.val().jsvars.length }) })
	}
	updateContent() {
		let jsvars = $('js-mode').value
		this.setState({ length:$('js-mode').value.length, js:jsvars })
		data.child(`${this.props.code}`).update({ jsvars:jsvars })
	}
	render() {
		const { js, length } = this.state
		return (
			<div class="col-md-9">
				<textarea id="js-mode" class="js" placeholder="Ingresar código JS..." onChange={this.updateContent.bind(this)} defaultValue={js}/>
				<h6>{length > 0 ? length : ''}</h6>
			</div>
		)
	}
}