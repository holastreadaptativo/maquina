import React, { Component } from 'react'
import { focus, show } from 'actions'

export default class Tabs extends Component {
	render() {
		return (
			<nav class={show(this.props.show, 'select')}>
			{
				this.props.arr.map((m, i) => 
					<li key={i} class={`col-sm-6 ${focus(this.props.parent.state.active == i, 'active')}`} 
						onClick={() => { this.props.parent.setState({ active:i }) }}>{m}</li>
				)
			}
			</nav>
		)
	}
}