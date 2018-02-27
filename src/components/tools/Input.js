import React, { Component } from 'react'
import { show } from 'actions'

export default class Input extends Component {
	update() {
		this.props.update({ [this.props.id]:this.refs.input.value })
	}
	render() {
		return (
			<div class="input-group">
				<span class="input-group-addon prefix">{this.props.type != 'color' ? this.props.prefix : 'color'}</span>
				<input ref="input" type={this.props.type} class={`form-control ${this.props.class}`} defaultValue={this.props.default} 
				onChange={::this.update} placeholder={this.props.placeholder} max="950" min="0"/>
				<span class={show(this.props.postfix, 'input-group-addon postfix')}>{this.props.postfix}</span>
			</div>
		)
	}
}