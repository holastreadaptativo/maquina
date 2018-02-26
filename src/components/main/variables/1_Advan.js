import React, { Component } from 'react'
import $, { show } from 'actions'
import { data } from 'stores'

export default class Advanced extends Component {
	constructor() {
		super()
		this.state = { length:0, js:'' }	
	}
	componentDidMount() {
		data.child(`${this.props.code}`).once('value').then(snap => { 
			this.setState({ js:snap.val().jsvars, length:snap.val().jsvars.length }) 
		})
	}
	updateContent() {
		let jsvars = $('js-mode').value
		this.setState({ length:jsvars.length, js:jsvars })
		data.child(`${this.props.code}`).update({ jsvars:jsvars })
	}
	render() {
		const { js, length } = this.state
		return (
			<div class={show(this.props.advanced, 'col-md-9')}>
				<textarea id="js-mode" class="js" placeholder="Ingresar código JS..." onChange={this.updateContent.bind(this)} defaultValue={js}/>
				<h6 class={show(length > 0)}>{length}</h6>
			</div>
		)
	}
}