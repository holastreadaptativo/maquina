import React, { Component } from 'react'
import { setFormat } from 'actions'
import { Well } from 'components'
import { LABELS } from 'stores'

export default class Resume extends Component {
	render() {
		const { code, variables } = this.props
		return (
			<Well title="Resumen">
				<h6><b>Ejercicio:</b></h6>
				{
					LABELS.CODE.map((m, i) => { let x = i < 5 ? 2 : 5; return (
						<h6 key={i}>{m}: {code.length >= 2*i + x ? code.substring(2*i, 2*i + x) : '-' }</h6>
					)})
				}
				<h6 class="br"/>
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
			</Well>
		)
	}
}