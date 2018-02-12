import React, { Component } from 'react'
import { show } from 'actions'

export default class Input extends Component {
	update() {
		this.props.update({ [this.props.id]:this.refs.input.value })
	}
	render() {
		return (
			<div class="input-group">
				<span class="input-group-addon">{this.props.type != 'color' ? this.props.prefix : 'color'}</span>
				<input ref="input" type={this.props.type} class="form-control" defaultValue={this.props.default} 
				onChange={this.update.bind(this)} placeholder={this.props.placeholder}/>
				<span class={show(this.props.postfix, 'input-group-addon')}>{this.props.postfix}</span>
			</div>
		)
	}
}