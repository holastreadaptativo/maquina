import React, { Component } from 'react'
import { browserHistory } from 'react-router'
import { checkAll, show, focus } from 'actions'
import { Continue } from 'components'
import { data } from 'stores'

export class Variables extends Component {
	constructor() {
		super()
		this.state = { variables:[], clicked:false, advanced:false, checked:[[], []] }
	}
	componentWillMount() {
		data.child(`${this.props.code}`).once('value').then(snap => { 
			if (snap.hasChild('advanced'))
				this.setState({ advanced:snap.val().advanced }) 
		})
		data.child(`${this.props.code}/variables`).on('value', snap => {
			let variables = []
			snap.forEach(v => {
				variables.push({ id:v.key, var:v.val().var, type:v.val().type, val:v.val().val, vt:v.val().vt, res:v.val().res })
				this.setState({ variables:variables })
			})
			if (variables.length == 0) {
				let key = data.child(`${this.props.code}/variables`).push({ var:'', val:'', type:'numero', vt:'', res:'' }).key
				variables.push({ id:key, var:'', val:'', type:'numero', vt:'', res:'' })
				this.setState({ variables:variables })
			}
			this.setState({ checked:checkAll(variables) })
		})	
	}
	componentWillUnmount() {
		data.child(`${this.props.code}/variables`).off()
	}
	handleClick() {
		this.setState({ clicked:!this.state.clicked })
	}
	setAdvanced() {
		let advanced = !this.state.advanced
		data.child(this.props.code).update({ advanced:advanced })
		this.setState({ advanced:advanced })
	}
	checkAll() {
		this.setState({ checked:checkAll(this.state.variables) })
		this.props.setNotification(!this.state.checked[0][6] ? 'Error en el ingreso de variables' : null, 'danger')
	}
	render() {
		const { variables, checked, advanced } = this.state
		const { code } = this.props
		return (
			<div class="variables">
				<div class="container">
					<h3>Ingresar variables
						<span class="glyphicon glyphicon-option-vertical" onClick={::this.handleClick}>
							<div class={`options ${focus(this.state.clicked, 'clicked')}`}>
								<ul>
									<li onClick={::this.setAdvanced}><a>{!advanced ? 'Modo avanzado' : 'Modo normal' }</a></li>
									<li onClick={() => { this.props.setActive(0); browserHistory.push('/') }}><a>Cambiar código</a></li>
									<li><a>Crear variables</a></li>
								</ul>
							</div>
						</span>
						<span class="glyphicon glyphicon-info-sign">
							<div class="info">Información sobre el funcionamiento de esta sección y el uso de variables</div>
						</span>
						<span class={show(advanced, 'mode')}>Modo Avanzado</span>
					</h3>
					<div class="row">
						<Resume code={code} advanced={advanced} variables={variables}/>
						<div class={show(!advanced, 'col-sm-9')}>
							<Table code={code} checked={checked} variables={variables} checkAll={::this.checkAll}/>
							<Check checked={checked} variables={variables} setActive={this.props.setActive}/>
						</div>
						<Advan code={code} advanced={advanced}/>
					</div>
					<div style={{ margin:'-25px 20px 0' }}>
						<Continue {...this.props} condition={this.state.checked[0][6]}/>
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