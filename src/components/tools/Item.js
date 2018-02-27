import React, { Component } from 'react'
import { show, focus } from 'actions'

export default class Item extends Component {
	render() {
		let active = this.props.active == this.props.id
		return (
			<form>
				<div class="form-inline">
					<h5 onClick={() => this.props.setActive(this.props.id)} class={focus(active, 'active')}>{this.props.title} 
						<i class={`glyphicon glyphicon-chevron-${active ? 'up' : 'down'}`}/>
					</h5>					
					<div class={show(active)}>
						{ this.props.children }
					</div>
				</div>
			</form>
		)
	}
}