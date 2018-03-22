import React, { Component } from 'react'
import { Section, Design, Functions, Overview } from 'components'
import { data, LABELS, DEVICES } from 'stores'

export class Respuestas extends Component {
    constructor(props) {
		super(props)
		this.state = { path:'answers', container:'content' }
	}
    componentDidMount() {
    	data.child(`${this.props.code}/${this.state.path}`).once('value').then(snap => {
			if (!snap.hasChild('count')) {
				data.child(`${this.props.code}/${this.state.path}`).update({ count:0 })
			}
		})		
	}
	render() {
		const { option, answers } = this.props
		return(
			<Section style="ejercicios" condition={answers.length} {...this.props}>
				<Overview condition={option == 0} {...this.props} {...this.state}/>
				<Functions condition={option == 1} {...this.props} {...this.state}/>
        		<Design {...this.props} {...this.state}/>
			</Section>
		)
	}
}

export Editor from './3_Editor'
export TextEditor from './3_TextEditor'

export class Devices extends Component {
	render() {
		const { devices, onChange } = this.props
		return (
			<div>
				<h6>Devices:</h6>
				{
					DEVICES.map((n, j) => 
						<h6 key={j}>
							<i>{n.icon}</i>
							<select id={n.col} defaultValue={devices[j]} onChange={onChange}>
							{
								LABELS.SIZE.map((m, i) =>
									<option key={i} value={m}>{Math.round(250/3*m, 2)/10+'%'}</option>
								)
							}	
							</select>
						</h6>
					)
				}
			</div>
		)
	}
}