import React, { Component } from 'react'
import { focus, versiones, shuffle } from 'actions'
import { data } from 'stores'

export default class Generate extends Component {
	constructor() {
		super()
		this.state = { fns:[], rank:[] }
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
	handleChange(e) {
		this.props.setState({ [e.target.id.split('-')[1]]:e.target.value })
	}
	generate(e) {
		e.preventDefault()
		const { fns } = this.state
		const { code, limit, selected } = this.props

		let matrix = versiones('GEN', { ...this.props, fns:fns }), total = matrix.length
		matrix = shuffle(matrix).slice(0, limit)

		let versions = matrix.slice(0, selected), box = []
		for (let i = 0; i < selected; i++) {
			box[i] = []
			for (let j = 0; j < selected; j++) {
				let sum = 0
				for (let k = 0; k < versions[i].length; k++) {
					let a = versions[i][k].val, b = versions[j][k].val, c = versions[i][k].rank
					if (i != j && c != 0)		
						if (c > 0) sum += Math.abs((a - b)/c)
						else sum += 1
				}
				box[i][j] = Number(sum.toFixed(5))
			}
		}
		data.child(`${code}/versions`).set({ 
			bup:{...matrix.slice(selected)}, gen:versions, box:box,
			limit:Math.min(limit, total), selected:Math.min(limit, selected), total:total
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
								<input id="gen-limit" defaultValue={limit} onChange={onChange} max={total} type="number"/>
							</div>		
							<div class="input-group">
								<span class="input-group-addon prefix">selección</span>
								<input id="gen-selected" defaultValue={selected} onChange={onChange} max={limit} type="number"/>
							</div>						
						</div>
						<button class="btn" onClick={::this.generate}>Generar</button>
					</form>
				</div>
		    </aside>
		)
	}
}