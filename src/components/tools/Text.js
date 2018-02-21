import React, { Component } from 'react'
import { show } from 'actions'

export default class Text extends Component {
	update() {
		this.props.update({ [this.props.id]:this.refs.input.value })
	}
	render() {
		return (
			<div class="input-group">
				<span class={show(this.props.prefix, 'input-group-addon')}>{this.props.prefix}</span>
				<textarea ref="input" type={this.props.type} class={`form-control textarea ${this.props.class}`} defaultValue={this.props.default} 
				onChange={this.update.bind(this)} placeholder={this.props.placeholder}/>
				<span class={show(this.props.postfix, 'input-group-addon')}>{this.props.postfix}</span>
			</div>
		)
	}
}