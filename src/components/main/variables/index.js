import React, { Component } from 'react'
import { checkAll, show } from 'actions'
import { Section } from 'components'
import { data } from 'stores'

export class Variables extends Component {
	constructor() {
		super()
		this.state = { variables:[], clicked:false, advanced:false, checked:[[], []] }
	}
	componentWillMount() {
		//data.child(`${this.props.code}`).once('value').then(snap => { 
		//	if (snap.hasChild('advanced'))
		//		this.setState({ advanced:snap.val().advanced }) 
		//})
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
			<Section style="variables" condition={checked[0][6]} {...this.props}>
				<div class="row">
					<Resume code={code} advanced={advanced} variables={variables}/>
					<div class={show(!advanced, 'editor col-xs-9')}>
						<Table code={code} checked={checked} variables={variables} checkAll={::this.checkAll}/>
						<Check checked={checked} variables={variables} setActive={this.props.setActive}/>
					</div>
				</div>
			</Section>
		)
	}
}

import Check from './1_Check'
import Resume from './1_Resume'
import Table from './1_Table'