import React, { Component } from 'react'
import { browserHistory } from 'react-router'
import { Resume, VarsTable, VarsCheck, VarsAdvan } from 'components'
import { checkAll } from 'actions'
import { data } from 'stores'

export class Variables extends Component {
	constructor(props) {
		super(props); this.setClicked = this.setClicked.bind(this)
		this.state = { variables:[], count:0, clicked:false, advanced:false, checked:[false, false, false, false, false, false, false] }	
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
				let key = data.child(`${this.props.code}/variables`).push({ var:'', val:'', type:'numero', vt:'', res:'' })
				variables.push({ id:key, var:'', type:'numero', val:'', count:++count, vt:'', res:'' })
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
								<VarsTable code={code} variables={variables} checkAll={this.checkAll.bind(this)}/>
								<VarsCheck checked={checked} variables={variables} setActive={this.props.setActive}/>
							</div>
							:
							<VarsAdvan code={code}/>
						}
					</div>
				</div>
			</div>
		)
	}
}

export Resume from './1_Resume'
export VarsTable from './1_VarsTable'
export VarsCheck from './1_VarsCheck'
export VarsAdvan from './1_VarsAdvan'