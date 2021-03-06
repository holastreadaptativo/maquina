import React, { Component } from 'react'
import { action, focus, glyph } from 'actions'
import { Aside, Input, Item } from 'components'

export default class Versions extends Component {
	constructor(props) {
		super(props)
		this.state = { active:0, limit:props.limit, rank:[], selected:props.selected, total:props.total }
	}
	handleGenerate(e) {
		e.preventDefault()
		const { code, limit, selected, variables } = this.props; let fns = []
		variables.forEach(m => {
			if (m.type == 'funcion') { 
				fns.push(m); 
				this.setState({ fns }) 
			}
		})
		action.ver('CREATE', { code, fns, limit, selected, variables })
	}
	handleRemove(m, i) {
		const { code, versions } = this.props, { id } = m
		if (confirm('¿Quieres eliminar esta versión?')) {
			this.props.setState({ vars:versions[i - 1].vars, active:i - 1 })
			action.ver('DELETE', { code, id })
		}
	}
	handleSelect(m, i) {
		this.props.setState({ vars:m.vars, active:i })
	}
	render() {
		const { active, id, option, setState, versions, vt } = this.props;
        return (
			<Aside id={id} option={option} title="Versiones" parent={this}>
				<Item id={0} title="Generar" parent={this}>
					<Input id="total" prefix="máximo" update={setState} type="number" parent={this} disabled/>
					<Input id="limit" prefix="intentos" update={setState} type="number" parent={this}/>
					<Input id="selected" prefix="selección" update={setState} type="number" parent={this}/>
					<button class="btn" onClick={::this.handleGenerate}>Generar</button>
				</Item>
				<Item id={0} title="Selección" parent={this}>
				{
					[vt, ...versions].map((m, i) => 
						<h4
							key={i} 
							id={m.id} 
							class={focus(active == i, 'active')} 
							onClick={() => this.handleSelect(m, i)}
						>
							Versión <b>{m.id}</b> 
							{m.id != 'vt' && <span class={glyph('remove close')} onClick={() => this.handleRemove(m, i)}/>}
						</h4>
					)
				}
				</Item>
		    </Aside>
		)
	}
}