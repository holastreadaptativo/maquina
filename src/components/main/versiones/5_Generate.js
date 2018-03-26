import React, { Component } from 'react'
import { Aside, Item, Input } from 'components'
import { action } from 'actions'

export default class Generate extends Component {
	constructor() {
		super()
		this.state = { fns:[], rank:[] }
	}
	componentWillMount() {
		let fns = []
		this.props.variables.forEach(m => {
			if (m.type == 'funcion')
				fns.push(m); this.setState({ fns:fns })
		})
	}
	render() {
		const { total, limit, selected, setState } = this.props
        return(
			<Aside show={this.props.condition} title="Versiones">
				<Item id={0} active={0} title="Generar">
					<Input id="total" default={total} prefix="máximo" update={setState} type="number"/>
					<Input id="limit" default={limit} prefix="intentos" update={setState} type="number"/>
					<Input id="selected" default={selected} prefix="selección" update={setState} type="number"/>
					<button class="btn" onClick={::this.handleGenerate}>Generar</button>
				</Item>
		    </Aside>
		)
	}
	handleGenerate(e) {
		e.preventDefault()
		action.versiones('GEN', { ...this.props, fns:this.state.fns })
	}
}