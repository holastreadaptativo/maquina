import React, { Component } from 'react'
import { show } from 'actions'

export default class Text extends Component {
	update() {
		const { id, parent, update } = this.props, { input } = this.refs
		if (!update) parent.setState({ [id]:input.value }); else update({ [id]:input.value })
	}
	render() {
		return (
			<div class="input-group">
				<span class={show(this.props.prefix, 'input-group-addon')}>{this.props.prefix}</span>
				<textarea ref="input" type={this.props.type} class={`form-control textarea ${this.props.style}`} defaultValue={this.props.parent.state[this.props.id]} 
					onChange={::this.update} placeholder={this.props.placeholder}/>
				<span class={show(this.props.postfix, 'input-group-addon')}>{this.props.postfix}</span>
			</div>
		)
	}
}