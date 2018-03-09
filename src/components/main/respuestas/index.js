import React, { Component } from 'react'
import { Section } from 'components'
import { data } from 'stores'

export class Respuestas extends Component {
    componentDidMount() {
		data.child(this.props.code).once('value').then(snap => {
			if (!snap.hasChild('idAnsw')) {
				data.child(this.props.code).update({ idAnsw:0 })
			}
		})		
	}	
	render() {
		const { option, answers } = this.props
		return(
			<Section style="ejercicios" condition={answers.length} {...this.props}>
				<Design {...this.props}/>
				<Functions condition={option == 1} {...this.props}/>
				<Overview condition={option == 0} {...this.props}/>
			</Section>
		)
	}
}

import Design from './3_Design'
import Functions from './3_Functions'
import Overview from './3_Overview'