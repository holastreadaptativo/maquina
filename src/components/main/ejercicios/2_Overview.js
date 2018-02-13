import React, { Component } from 'react'
import { setFormat } from 'actions'
import { data } from 'stores'

export default class Overview extends Component {
	constructor() {
		super()
		this.state = { variables:[] }
	}
	componentDidMount() {
		data.child(`${this.props.code}/variables`).orderByChild('var').on('value', snap => {
			let variables = [], count = 0
			snap.forEach(v => {
				variables.push({ id:v.key, var:v.val().var, type:v.val().type, val:v.val().val, count:++count, vt:v.val().vt, res:v.val().res })
				this.setState({ variables:variables, count:count })
			})
		})	
	}
	render() {
		return (
			<div class="overview">
				<div class="col-md-3 resume">
					<h5><b>Resumen <span>- Código<br/>[ {this.props.code} ]</span></b></h5>
					<h6><b>Variables:</b></h6>
					<ul> 
					{
						this.state.variables.map(m => { 
							if (m.var != '' && m.val != '') return (
								<h6 key={m.id}>${m.var.toLowerCase()} = {setFormat(m.val)};</h6>
							)
						})
					}
					</ul>
				</div>
				<div class="col-md-9 functions">
					<br/>
					<h6><b>Funciones:</b></h6>
					<div class="fn">

					</div>
				</div>				
			</div>
		)
	}
}