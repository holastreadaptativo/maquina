import React, { Component } from 'react'
import { show } from 'actions'

export default class Item extends Component {
	render() {
		return (
			<form class={show(this.props.active == this.props.id)}>
				<div class="form-inline">
					<h5>{this.props.title}:</h5>
					{ this.props.children }		
				</div>
			</form>
		)
	}
}