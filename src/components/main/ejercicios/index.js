import React, { Component } from 'react'
import { Section, Design, Functions, Overview } from 'components'
import { data } from 'stores'

export class Ejercicios extends Component {
	constructor(props) {
		super(props)
		this.state = { path:'functions', container:'container' }
	}
    componentDidMount() {
    	data.child(`${this.props.code}/${this.state.path}`).once('value').then(snap => {
			if (!snap.hasChild('count')) {
				data.child(`${this.props.code}/${this.state.path}`).update({ count:0 })
			}
		})		
	}	
	render() {
		const { option, functions } = this.props
		return(
			<Section style="ejercicios" condition={functions.length} {...this.props}>
				<Overview condition={option == 0} {...this.props} {...this.state}/>
				<Functions condition={option == 1} {...this.props} {...this.state}/>
        		<Design {...this.props} {...this.state}/>
        	</Section>
        )
    }
}

export Overview from './2_Overview'
export Functions from './2_Functions'
export Design from './2_Design'