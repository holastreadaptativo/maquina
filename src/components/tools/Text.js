import React, { Component } from 'react'
import { show } from 'actions'

export default class Text extends Component {
	update(e) {
		this.props.update({ [this.props.id]:e.target.value })
	}
	render() {
		return (
			<div class="input-group">
				<span class={show(this.props.prefix, 'input-group-addon')}>{this.props.prefix}</span>
				<textarea type={this.props.type} class={`form-control textarea ${this.props.style}`} defaultValue={this.props.default} 
					onChange={::this.update} placeholder={this.props.placeholder}/>
				<span class={show(this.props.postfix, 'input-group-addon')}>{this.props.postfix}</span>
			</div>
		)
	}
}