import React, { Component } from 'react'
import { glyph, focus, show } from 'actions'

export default class Item extends Component {
	render() {
		let active = this.props.active == this.props.id
		return (
			<form class="control">
				<div class="form-inline">
					<h5 onClick={() => this.props.setActive(this.props.id)} class={focus(active, 'active')}>{this.props.title} 
						<i class={glyph(`chevron-${active ? 'up' : 'down'}`)}/>
					</h5>					
					<div class={show(active)}>{this.props.children}</div>
				</div>
			</form>
		)
	}
}