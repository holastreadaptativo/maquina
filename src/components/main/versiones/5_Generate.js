import React, { Component } from 'react'
import { focus, versiones } from 'actions'

export default class Generate extends Component {
	constructor() {
		super()
		this.state = { fns:[], rank:[], action:versiones }
	}
	componentWillMount() {
		let fns = []
		this.props.variables.forEach(m => {
			if (m.type == 'funcion')
				fns.push(m); this.setState({ fns:fns })
		})
	}
	handleGenerate(e) {
		e.preventDefault()
		this.state.action('GEN', { ...this.props, fns:this.state.fns })
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
								<input id="gen-limit" defaultValue={limit} onChange={onChange} max={total} type="number"/>
							</div>		
							<div class="input-group">
								<span class="input-group-addon prefix">selección</span>
								<input id="gen-selected" defaultValue={selected} onChange={onChange} max={limit} type="number"/>
							</div>						
						</div>
						<button class="btn" onClick={::this.handleGenerate}>Generar</button>
					</form>
				</div>
		    </aside>
		)
	}
}