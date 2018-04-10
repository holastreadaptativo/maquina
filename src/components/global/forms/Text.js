import React, { Component } from 'react'
import { show } from 'actions'

export default class Text extends Component {
	update() {
		const { id, parent, update } = this.props, { input } = this.refs; let value = input.value.replace(/[\']/g,'\`')
		if (!update) parent.setState({ [id]:value }); else update({ [id]:value })
	}
	render() {
		const { hide, id, type, parent, placeholder, postfix, prefix, style } = this.props
		return (
			<div class={show(!hide, 'input-group')}>
				<span class="input-group-addon prefix">{prefix}</span>
				<textarea ref="input" class={`form-control textarea ${style}`} onChange={::this.update} placeholder={placeholder} type={type}
					defaultValue={parent.state[id]}/>
				<span class={show(postfix, 'input-group-addon')}>{postfix}</span>
			</div>
		)
	}
}