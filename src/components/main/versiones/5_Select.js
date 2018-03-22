import React, { Component } from 'react'
import { action, focus } from 'actions'
import { Well } from 'components'

export default class Select extends Component {
	handleSelect(m, i) {
		this.props.setState({ vars:m.vars, active:i })
	}
	handleRemove(m, i) {
		if (confirm('¿Quieres eliminar esta versión?')) {
			action.versiones('REMOVE', { code:this.props.code, id:m.id })
			this.props.setState({ active:i - 1 })
		}
	}
	render() {
		return (
        	<Well title="Selección">
			{
				[this.props.vt, ...this.props.versions].map((m, i) => 
					<h4 key={i} id={m.id} class={focus(this.props.active == i, 'active')} onClick={() => this.handleSelect(m, i)}>
						Versión <b>{m.id}</b> {m.id != 'vt' && (<span class="glyphicon glyphicon-remove close" onClick={() => this.handleRemove(m, i)}/>)}
					</h4>
				)
			}
			</Well>
        )
    }
}