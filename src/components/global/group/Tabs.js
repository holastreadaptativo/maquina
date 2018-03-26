import React, { Component } from 'react'
import { focus } from 'actions'

export default class Tabs extends Component {
	render() {
		return (
			<ul class="modal-tabs">
			{
				this.props.items.map((m, i) =>
					<li key={i} class={focus(this.props.active == i, 'active')} style={{ width:`${100/this.props.items.length}%` }} 
						onClick={this.props.setActive(i)}>
						<a><i>{m}</i></a>
					</li>
				)
			}
			</ul>
		)
	}
}