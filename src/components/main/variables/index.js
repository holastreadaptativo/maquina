import React, { Component } from 'react'
import { Section, Panel } from 'components'
import { data, DEFAULT } from 'stores'
import { checkAll } from 'actions'

export class Variables extends Component {
	constructor() {
		super()
		this.state = { variables:[], clicked:false, checked:[[], []] }
	}
	componentWillMount() {
		data.child(`${this.props.code}/variables`).on('value', snap => {
			let variables = []
			snap.forEach(v => {
				variables.push({ id:v.key, var:v.val().var, type:v.val().type, val:v.val().val, vt:v.val().vt, res:v.val().res })
				this.setState({ variables:variables })
			})
			if (variables.length == 0) {
				let key = data.child(`${this.props.code}/variables`).push(DEFAULT.EMPTY).key
				variables.push({ id:key, ...DEFAULT.EMPTY })
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
	checkAll() {
		this.setState({ checked:checkAll(this.state.variables) })
		this.props.setNotification(!this.state.checked[0][6] ? 'Error en el ingreso de variables' : null, 'danger')
	}
	render() {
		const { variables, checked } = this.state
		const { code, setActive } = this.props
		return (
			<Section style="variables" condition={checked[0][6]} {...this.props}>
				<div class="row">
					<Resume code={code} variables={variables}/>
					<Panel container="table">
						<Table code={code} checked={checked} variables={variables} checkAll={::this.checkAll}/>
						<Check checked={checked} variables={variables} setActive={setActive}/>
					</Panel>
				</div>
			</Section>
		)
	}
}

import Check from './1_Check'
import Resume from './1_Resume'
import Table from './1_Table'