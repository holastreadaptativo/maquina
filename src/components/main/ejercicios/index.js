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
		const { option, functions } = this.props
		return(
			<Section style="ejercicios" condition={functions.length} {...this.props}>
				<Overview condition={option == 0} {...this.props}/>
				<Functions condition={option == 1} {...this.props}/>
        		<Design {...this.props}/>
        	</Section>
        )
    }
}

import Design from './2_Design'
import Functions from './2_Functions'
import Overview from './2_Overview'
export Editor from './2_Editor'