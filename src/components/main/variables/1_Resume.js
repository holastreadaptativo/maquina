import React, { Component } from 'react'
import { setFormat, show } from 'actions'

export default class Resume extends Component {
	render() {
		const { advanced, code, variables } = this.props
		let items = ['Nivel', 'Eje', 'OA', 'IE', 'Tipo', 'Ejercicio']
		return (
			<div class="col-sm-3 resume">
				<h5><b>Resumen</b></h5>
				<h6><b>Ejercicio:</b></h6>
				{
					items.map((m, i) => { let x = i < 5 ? 2 : 5; return (
						<h6 key={i}>{m}: {code.length >= 2*i + x ? code.substring(2*i, 2*i + x) : '-' }</h6>
					)})
				}
				<h6 class={show(!advanced)}><b>Variables:</b></h6>
				<ul class={show(!advanced)}> 
				{
					variables.map(m => { 
						if (m.var != '' && m.val != '') return (
							<h6 key={m.id}>${m.var.toLowerCase()} = {setFormat(m.val)};</h6>
						)
					})
				}
				</ul>
			</div>
		)
	}
}