import React, { Component } from 'react'

export default class Well extends Component {
	render() {
		return (
			<section class="col-xs-3 well">
				<h5><b>{this.props.title}</b></h5>
				{this.props.children}
			</section>
		)
	}
}