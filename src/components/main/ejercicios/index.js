import React, { Component } from 'react'
import { Section, Design, Functions, Overview } from 'components'
import { data } from 'stores'

export class Ejercicios extends Component {
    componentDidMount() {
		data.child(this.props.code).once('value').then(snap => {
			if (!snap.hasChild('count')) {
				data.child(this.props.code).update({ count:0 })
			}
		})		
	}	
	render() {
		const { option, functions } = this.props
		return(
			<Section style="ejercicios" condition={functions.length} {...this.props}>
				<Overview condition={option == 0} {...this.props} design={true}/>
				<Functions condition={option == 1} {...this.props} design={true}/>
        		<Design {...this.props} design={true}/>
        	</Section>
        )
    }
}

export TEditor from './2_Editor'
export Overview from './2_Overview'
export Functions from './2_Functions'
export Design from './2_Design'