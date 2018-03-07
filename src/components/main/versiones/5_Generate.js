import React, { Component } from 'react'
import { focus, versiones } from 'actions'
import { data } from 'stores'

export default class Generate extends Component {
	constructor() {
		super()
		this.state = { fns:[] }
	}
	componentWillMount() {
		let fns = []
		this.props.variables.forEach(m => {
			if (m.type == 'funcion') {
				fns.push(m)
				this.setState({ fns:fns })
			}
		})
	}
	generate(e) {
		e.preventDefault()
		const { fns } = this.state
		const { limit, selected } = this.props

		let matrix = versiones('GEN', { ...this.props, fns:fns }), total = matrix.length
		matrix = matrix.sort(() => (0.5 - Math.random()) ).slice(0, limit)
		data.child(`${this.props.code}/versions`).set({ 
			gen:{...matrix}, limit:Math.min(limit, total), selected:Math.min(limit, selected), total:total
		})
	}
	render() {
		const { total, limit, selected, onChange } = this.props
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
								<span class="input-group-addon prefix">máximo</span>
								<p>{total}</p>
							</div>	
							<div class="input-group">
								<span class="input-group-addon prefix">intentos</span>
								<input id="limit" defaultValue={limit} onChange={onChange} max={total} type="number"/>
							</div>		
							<div class="input-group">
								<span class="input-group-addon prefix">selección</span>
								<input id="selected" defaultValue={selected} onChange={onChange} max={limit} type="number"/>
							</div>						
						</div>
						<button class="btn" onClick={::this.generate}>Generar</button>
					</form>
				</div>
		    </aside>
		)
	}
}