import React, { Component } from 'react'
import { show } from 'actions'

export default class Input extends Component {
	update() {
		const { id, parent, update } = this.props, { input } = this.refs
		if (!update) parent.setState({ [id]:input.value }); else update({ [id]:input.value })
	}
	componentDidMount() {
		if (this.props.disabled)
			this.refs.input.setAttribute('disabled', 'true')
	}
	render() {
		const { hide, id, type, parent, placeholder, postfix, prefix, style } = this.props
		return (
			<div class={show(!hide, 'input-group')}>
				<span class="input-group-addon prefix">{type == 'color' && !prefix ? type : prefix}</span>
				<input ref="input" class={`form-control ${style}`} onChange={::this.update} placeholder={placeholder} type={type ? type : 'text'}
					defaultValue={parent.state[id]} max="999" min="0"/>
				<span class={show(postfix, 'input-group-addon postfix')}>{postfix}</span>
			</div>
		)
	}
}