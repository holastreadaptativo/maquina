import React, { Component } from 'react'
import { setFormat, show } from 'actions'
import { CODE } from 'stores'

export default class Resume extends Component {
	render() {
		const { advanced, code, variables } = this.props
		return (
			<div class="resume col-xs-3">
				<h5><b>Resumen</b></h5>
				<h6><b>Ejercicio:</b></h6>
				{
					CODE.map((m, i) => { let x = i < 5 ? 2 : 5; return (
						<h6 key={i}>{m}: {code.length >= 2*i + x ? code.substring(2*i, 2*i + x) : '-' }</h6>
					)})
				}
				<div class={show(!advanced)}>
					<h6 class="code"/>
					<h6><b>Variables:</b></h6>
					<ul> 
					{
						variables.map(m => { 
							if (m.var != '' && m.val != '') return (
								<h6 key={m.id}>${m.var.trim()} = {setFormat(m.val)};</h6>
							)
						})
					}
					</ul>
				</div>
			</div>
		)
	}
}