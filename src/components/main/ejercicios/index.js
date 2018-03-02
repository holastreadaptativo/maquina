import React, { Component } from 'react'
import { Section } from 'components'
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
		const { code, option, variables, functions } = this.props
		return(
			<Section style="ejercicios" condition={functions.length}>
        		<Design code={code} variables={variables} functions={functions}/>
				<Overview code={code} variables={variables} functions={functions} condition={option == 0}/>
				<Functions code={code} variables={variables} condition={option == 1}/>
        	</Section>
        )
    }
}

import Design from './2_Design'
import Functions from './2_Functions'
import Overview from './2_Overview'
export Editor from './2_Editor'