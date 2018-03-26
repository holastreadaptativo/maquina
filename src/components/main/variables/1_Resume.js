import React, { Component } from 'react'
import { setFormat } from 'actions'
import { Well } from 'components'
import { LABELS } from 'stores'

export default class Resume extends Component {
	render() {
		return (
			<Well title="Resumen">
				<h5 class="title">Ejercicio</h5>
				{
					LABELS.CODE.map((m, i) => { let x = i < 5 ? 2 : 5; return (
						<h5 key={i}>{m}: {this.props.code.length >= 2*i + x ? this.props.code.substring(2*i, 2*i + x) : '-' }</h5>
					)})
				}
				<h6 class="br"/>
				<h5 class="title">Variables</h5>
				<ul> 
				{
					this.props.variables.map(m => { 
						if (m.var != '' && m.val != '') return (
							<h5 key={m.id}>${m.var.trim()} = {setFormat(m.val)};</h5>
						)
					})
				}
				</ul>
			</Well>
		)
	}
}