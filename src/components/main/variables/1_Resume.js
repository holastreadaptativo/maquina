import React, { Component } from 'react'
import { setFormat } from 'actions'
import { Well } from 'components'
import { LABELS } from 'stores'

export default class Resume extends Component {
	render() {
		const { code, variables } = this.props
		return (
			<Well title="Resumen">
				<h4 class="title">Ejercicio</h4>
				{
					LABELS.CODE.map((m, i) => { let x = i < 5 ? 2 : 5; return (
						<h4 key={i}>{m}: {code.length >= 2*i + x ? code.substring(2*i, 2*i + x) : '-' }</h4>
					)})
				}
				<h6 class="br"/>
				<h4 class="title">Variables</h4>
				<ul> 
				{
					variables.map(m => { 
						if (m.var != '' && m.val != '') return (
							<h4 key={m.id}>${m.var.trim()} = {setFormat(m.val)};</h4>
						)
					})
				}
				</ul>
			</Well>
		)
	}
}