import React, { Component } from 'react'
import { show } from 'actions'

export default class Select extends Component {
	update() {
		const { id, parent, update } = this.props, { input } = this.refs
		if (!update) parent.setState({ [id]:input.value }); else update({ [id]:input.value })
	}
	componentDidMount() {
		if (this.props.disabled)
			this.refs.input.setAttribute('disabled', 'true')
	}
	render() {
		const { hide } = this.props
		return (
			<div class={show(!hide, 'input-group')}>
				<span class="input-group-addon prefix">{this.props.prefix}</span>
				<select ref="input" class={`form-control select ${this.props.class}`} defaultValue={this.props.parent.state[this.props.id]} 
					onChange={::this.update}>{ this.props.options.map((m, i) => <option key={i} value={m}>{m}</option> ) }
				</select>
			</div>
		)
	}
}