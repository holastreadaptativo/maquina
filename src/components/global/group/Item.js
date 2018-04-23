import React, { Component } from 'react'
import { glyph, focus, show } from 'actions'

export default class Item extends Component {
	update() {
		const { id, parent, update } = this.props
		if (!update) parent.setState({ active:id }); else update(id)
	}
	render() {
		const { hide, id, parent, title } = this.props
		let selected = parent.state.active == id
		return (
			<form class={show(!hide, 'control')}>
				<div class="form-inline">
					<h5 class={focus(selected, 'active')} onClick={::this.update}>
						{title} <i class={glyph(`chevron-${selected ? 'up' : 'down'}`)}/>
					</h5>					
					<div class={show(selected)}>{this.props.children}</div>
				</div>
			</form>
		)
	}
}