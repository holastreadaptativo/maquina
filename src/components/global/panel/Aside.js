import React, { Component } from 'react'
import { focus } from 'actions'

export default class Aside extends Component {
	render() {
		return (
			<aside class={focus(this.props.id == this.props.option, 'active')}>
				<h3>{this.props.title}</h3>
				{this.props.children}
			</aside>
		)
	}
}