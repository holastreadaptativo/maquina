import React, { Component } from 'react'

export default class Select extends Component {
	update() {
		const { id, parent, update } = this.props, { input } = this.refs
		if (!update) parent.setState({ [id]:input.value }); else update({ [id]:input.value })
	}
	render() {
		return (
			<div class="input-group">
				<span class="input-group-addon prefix">{this.props.prefix}</span>
				<select ref="input" class={`form-control select ${this.props.class}`} defaultValue={this.props.parent.state[this.props.id]} 
					onChange={::this.update}>{ this.props.options.map((m, i) => <option key={i} value={m}>{m}</option> ) }
				</select>
			</div>
		)
	}
}