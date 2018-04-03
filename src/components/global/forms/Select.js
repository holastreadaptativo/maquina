import React, { Component } from 'react'

export default class Select extends Component {
	update() {
		this.props.update({ [this.props.id]:this.refs.input.value })
	}
	render() {
		return (
			<div class="input-group">
				<span class="input-group-addon prefix">{this.props.prefix}</span>
				<select ref="input" class={`form-control select ${this.props.class}`} defaultValue={this.props.default} onChange={::this.update}>
				{
					this.props.options.map((m, i) => <option key={i} value={m}>{m}</option> )
				}
				</select>
			</div>
		)
	}
}