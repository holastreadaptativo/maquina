import React, { Component } from 'react'
import { Continue } from 'components'
import { data } from 'stores'

export class Ejercicios extends Component {
    constructor(props) {	
		super(props)
		this.state = { clicked:false, drag:'', value:props.functions.length > 0 ? 0 : 1 }
	}
	componentDidMount() {
		data.child(this.props.code).once('value').then(snap => {
			if (!snap.hasChild('count')) {
				data.child(this.props.code).update({ count:0 })
			}
		})		
	}	
	handleClick() {
		this.setState({ clicked:!this.state.clicked })
	}
	handleChange(value) {
		this.setState({ value:value })
	}	
	render() {
		const { value } = this.state
		const { code, variables, functions } = this.props
		let items = [{icon:'spellcheck', text:'Ejercicio'}, {icon:'dashboard', text:'Funciones'}, {icon:'code', text:'Código'}]
		return(
        	<div class="ejercicios">
        		<div class="container">
					<h3>Crear ejercicio
						<span class="glyphicon glyphicon-option-vertical" onClick={::this.handleClick}>
							<div class={`options ${this.state.clicked ? 'clicked' : ''}`}>
								<ul>
									<li><a>-</a></li>
								</ul>
							</div>
						</span>
						<span class="glyphicon glyphicon-info-sign">
							<div class="info">Información sobre el funcionamiento de esta sección y la creación de ejercicios</div>
						</span>
					</h3>
					<Design code={code} variables={variables} functions={functions}/>
					<div class="row">
						<ul class="selector">
							{
								items.map((m, i) => { return (
									<li key={i} class={`col-xs-4 ${value == i ? 'active' : ''}`} onClick={this.handleChange.bind(this, i)}>
										<a><i>{m.icon}</i><span>{m.text}</span></a>
									</li>
								)})
							}
						</ul>
						<Overview code={code} variables={variables} functions={functions} condition={value == 0}/>
						<Functions code={code} variables={variables} condition={value == 1} active={0}/>
						<Editor code={code} condition={value == 2}/>
					</div>
					<Continue {...this.props} condition={this.props.functions.length > 0}/>
        		</div>
        	</div>
        )
    }
}

import Design from './2_Design'
import Functions from './2_Functions'
import Editor from './2_Editor'
import Overview from './2_Overview'
export Modal from './2_Modal'
export Save from './2_Save'