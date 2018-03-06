import React, { Component } from 'react'
import { focus, versiones } from 'actions'
import { data } from 'stores'

export default class Generate extends Component {
	constructor() {
		super()
		this.state = { fns:[], limit:100 }
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
	handleLimit(e) {
		this.setState({ limit:e.target.value })
	}
	generate(e) {
		e.preventDefault()

		let matrix = versiones('GEN', { ...this.props, fns:this.state.fns })
		matrix = matrix.sort(() => (0.5 - Math.random()) ).slice(0, this.state.limit)
		data.child(`${this.props.code}/versions`).set({ ...matrix })
	}
	render() {
        return(
			<aside class={focus(this.props.condition, 'active')}>
				<div class="generate">
					<div class="title">
						<h3>Versiones</h3>
					</div>
					<form>
						<div class="form-inline">
							<h5 class="active">Generar 
								<i class="glyphicon glyphicon-chevron-down"/>
							</h5>
							<div class="input-group">
								<span class="input-group-addon prefix">limite</span>
								<input defaultValue={this.state.limit} onChange={::this.handleLimit} type="number"/>
							</div>							
						</div>
						<button class="btn" onClick={::this.generate}>Generar</button>
					</form>
				</div>
		    </aside>
		)
	}
}