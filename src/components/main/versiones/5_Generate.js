import React, { Component } from 'react'
import { focus, versiones } from 'actions'
import { data } from 'stores'

export default class Generate extends Component {
	constructor() {
		super()
		this.state = { matrix:[], fns:[], limit:100 }
	}
	componentDidMount() {
		let fns = []
		this.props.variables.forEach(m => {
			if (m.type == 'funcion') {
				fns.push(m)
				this.setState({ fns:fns })
			}
		})
	}
	generate() {
		let matrix = versiones('GEN', { ...this.props, fns:this.state.fns })
		matrix = matrix.sort(() => (0.5 - Math.random()) ).slice(0, this.state.limit)
		data.child(`${this.props.code}/versions`).set({ ...matrix })
		this.setState({ matrix:matrix })
	}
	render() {
        return(
			<aside class={focus(this.props.condition, 'active')}>
				<div class="title">
					<h3>Versiones</h3>
					<button onClick={::this.generate}>Generar</button>
				</div>
		    </aside>
		)
	}
}