import React, { Component } from 'react'
import { browserHistory } from 'react-router'
import { checkAll } from 'actions'
import { data } from 'stores'

export class Variables extends Component {
	constructor() {
		super()
		this.state = { variables:[], count:0, clicked:false, advanced:false, checked:[[], []] }	
		this.setClicked = this.setClicked.bind(this)
	}
	componentDidMount() {
		data.child(`${this.props.code}`).once('value').then(snap => { this.setState({ advanced:snap.val().advanced }) })
		data.child(`${this.props.code}/variables`).orderByChild('var').on('value', snap => {
			let variables = [], count = 0
			snap.forEach(v => {
				variables.push({ id:v.key, var:v.val().var, type:v.val().type, val:v.val().val, count:++count, vt:v.val().vt, res:v.val().res })
				this.setState({ variables:variables, count:count })
			})
			if (count == 0) {
				let path = data.child(`${this.props.code}/variables`).push({ var:'', val:'', type:'numero', vt:'', res:'' })
				variables.push({ id:path.key, var:'', type:'numero', val:'', count:++count, vt:'', res:'' })
				this.setState({ variables:variables, count:count })
			}
			this.setState({ checked:checkAll(variables) })
		})	
	}
	componentWillUnmount() {
		data.child(`${this.props.code}/variables`).off()
	}
	setClicked() {
		this.setState({ clicked:!this.state.clicked })
	}
	setAdvanced() {
		let advanced = !this.state.advanced
		data.child(`${this.props.code}`).update({ advanced:advanced })
		this.setState({ advanced:advanced })
	}
	checkAll() {
		this.setState({ checked:checkAll(this.state.variables) })
		//this.props.setNotification(!this.state.checked[0][6] ? 'Aweonao' : null, 'danger')
	}
	render() {
		const { variables, checked, advanced } = this.state
		const { code } = this.props
		return (
			<div class="variables">
				<div class="container">
					<h3>Ingresar variables
						<span class="glyphicon glyphicon-option-vertical" onClick={this.setClicked}>
							<div class={`options ${this.state.clicked ? 'clicked' : ''}`}>
								<ul>
									<li onClick={this.setAdvanced.bind(this)}><a>{!advanced ? 'Modo avanzado' : 'Modo normal' }</a></li>
									<li onClick={() => { this.props.setActive(0); browserHistory.push('/') }}><a>Cambiar código</a></li>
									<li><a>Crear variables</a></li>
								</ul>
							</div>
						</span>
						<span class="glyphicon glyphicon-info-sign">
							<div class="info">Información sobre el funcionamiento de esta sección y el uso de variables</div>
						</span>
						{ advanced ? <span class="mode">Modo Avanzado</span> : '' }
					</h3>
					<div class="row">
						<Resume code={code} advanced={advanced} variables={variables}/>
						{
							!advanced ? 
							<div class="col-sm-9">
								<Table code={code} checked={checked} variables={variables} checkAll={this.checkAll.bind(this)}/>
								<Check checked={checked} variables={variables} setActive={this.props.setActive}/>
							</div>
							:
							<Advan code={code}/>
						}
					</div>
				</div>
			</div>
		)
	}
}

import Advan from './1_Advan'
import Check from './1_Check'
import Resume from './1_Resume'
import Table from './1_Table'