import React, { Component } from 'react'
import { focus } from 'actions'

export default class Aside extends Component {
	render() {
		return (
			<aside class={focus(this.props.id == this.props.option, 'active')}>
				<h3>{this.props.title} <i onClick={() => this.props.parent.props.setOption(null) }>close</i></h3>
				{this.props.children}
			</aside>
		)
	}
}