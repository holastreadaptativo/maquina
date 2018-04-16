import React, { Component } from 'react'
import { action, focus, glyph } from 'actions'
import { Aside, Input, Item } from 'components'

export default class Generate extends Component {
	constructor(props) {
		super(props)
		this.state = { active:0, fns:[], limit:props.limit, rank:[], selected:props.selected, total:props.total }
	}
	componentWillMount() {
		let fns = []
		this.props.variables.forEach(m => {
			if (m.type == 'funcion') { fns.push(m); this.setState({ fns }) }
		})
	}
	handleGenerate(e) {
		e.preventDefault()
		const { code, limit, selected, variables } = this.props, { fns } = this.state
		action.ver('CREATE', { code, fns, limit, selected, variables })
	}
	handleSelect(m, i) {
		this.props.setState({ vars:m.vars, active:i })
	}
	handleRemove(m, i) {
		const { code, versions } = this.props, { id } = m
		if (confirm('¿Quieres eliminar esta versión?')) {
			this.props.setState({ vars:versions[i - 2].vars, active:i - 1 })
			action.ver('DELETE', { code, id })
		}
	}
	render() {
		const { id, option, setState } = this.props
        return (
			<Aside id={id} option={option} title="Versiones">
				<Item id={0} title="Generar" parent={this}>
					<Input id="total" prefix="máximo" update={setState} type="number" parent={this} disabled/>
					<Input id="limit" prefix="intentos" update={setState} type="number" parent={this}/>
					<Input id="selected" prefix="selección" update={setState} type="number" parent={this}/>
					<button class="btn" onClick={::this.handleGenerate}>Generar</button>
				</Item>
				<br/>
				<Item id={0} title="Selección" parent={this}>
				{
					[this.props.vt, ...this.props.versions].map((m, i) => 
						<h4 key={i} id={m.id} class={focus(this.props.active == i, 'active')} onClick={() => this.handleSelect(m, i)}>
							Versión <b>{m.id}</b> {m.id != 'vt' && <span class={glyph('remove close')} onClick={() => this.handleRemove(m, i)}/>}
						</h4>
					)
				}
				</Item>
		    </Aside>
		)
	}
}