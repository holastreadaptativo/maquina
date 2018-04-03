import React, { Component } from 'react'
import { show } from 'actions'

export default class Input extends Component {
	update() {
		this.props.update({ [this.props.id]:this.refs.input.value })
	}
	componentDidMount() {
		if (this.props.disabled)
			this.refs.input.setAttribute('disabled', 'true')
	}
	render() {
		return (
			<div class={show(!this.props.hide, 'input-group')}>
				<span class="input-group-addon prefix">{this.props.type == 'color' && !this.props.prefix ? 'color' : this.props.prefix}</span>
				<input ref="input" type={this.props.type} class={`form-control ${this.props.style}`} defaultValue={this.props.default} 
					onChange={::this.update} placeholder={this.props.placeholder} max="950" min="0"/>
				<span class={show(this.props.postfix, 'input-group-addon postfix')}>{this.props.postfix}</span>
			</div>
		)
	}
}