import React, { Component } from 'react'
import { setFormat } from 'actions'

export default class Resume extends Component {
	render() {
		const { advanced, code, variables } = this.props
		return (
			<div class="col-sm-3 resume">
				<h5><b>Resumen</b></h5>
				<h6><b>Ejercicio:</b></h6>
				<h6>Id: {code}</h6>
				<h6>Nivel: {code.substring(0,2)}</h6>
				<h6>Eje: {code.substring(2,4)}</h6>
				<h6>OA: {code.substring(4,6)}</h6>
				<h6>IE: {code.substring(6,8)}</h6>
				<h6>Tipo: {code.substring(8,10)}</h6>
				<h6 class="code">Ejercicio: {code.substring(10,15)}</h6>
				{ !advanced ? <h6><b>Variables:</b></h6> : '' }
				{ 
					!advanced ? 
					<ul> 
					{
						variables.map(m => { 
							if (m.var != '' && m.val != '') return (
								<h6 key={m.id}>${m.var.toLowerCase()} = {setFormat(m.val)};</h6>
							)
						})
					}
					</ul> : '' 
				}
			</div>
		)
	}
}