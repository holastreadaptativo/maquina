import React, { Component } from 'react'
import { focus, versiones } from 'actions'

export default class Select extends Component {
    handleSelect(m, i) {
		this.props.setState({ vars:m.vars, active:i, action:versiones })
	}
	handleRemove(m, i) {
		if (confirm('¿Quieres eliminar esta versión?')) {
			this.state.action('REMOVE', { code:this.props.code, id:m.id })
			this.props.setState({ active:i - 1 })
		}		
	}
	render() {
		const { versions, active, vt } = this.props
        return(
        	<div class="col-xs-3 seleccion">
				<h5><b>Selección</b></h5>
				<h4 class={focus(active == -1, 'active')} onClick={() => this.handleSelect(vt, -1)}>
					Versión VT
				</h4>
				{
					versions.map((m, i) => 
						<h4 key={i} id={m.id} class={focus(active == i, 'active')} onClick={() => this.handleSelect(m, i)}>
							Versión {m.id + 1}
							<span class="glyphicon glyphicon-remove close" onClick={() => this.handleRemove(m, i)}/>
						</h4>
					)
				}
			</div>
        )
    }
}