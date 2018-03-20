import React, { Component } from 'react'
import { Section, Functions, Overview, Feedback } from 'components'
import { ejercicios } from 'actions'
import { data } from 'stores'

export class Glosa extends Component {
     constructor(props) {
		super(props)
		this.state = { path:'feedback', container:'modal' }
	}
    componentDidMount() {
    	data.child(`${this.props.code}/${this.state.path}`).once('value').then(snap => {
			if (!snap.hasChild('count')) {
				data.child(`${this.props.code}/${this.state.path}`).update({ count:0 })
			}
		})	
		this.print()
	}
	componentDidUpdate() {
		setTimeout(() => this.print(), 0)
	}
	print() {
		ejercicios('GET', { ...this.props, ...this.state, vt:true })
	}
    render() {
		const { option, feedback } = this.props
		return(
        	<Section style="ejercicios glosa" condition={feedback.length} {...this.props}>
        		<div class="row">
	        		<div class="feedback">
	        			<Feedback feedback={feedback} {...this.state}/>
	        			<div class="img-duck"/>
	        			<div class="triangle"/>
	        			<footer/>
	        		</div>
        		</div>
				<Overview condition={option == 0} {...this.props} {...this.state}/>
				<Functions condition={option == 1} {...this.props} {...this.state}/>
        	</Section>
        )
    }
}

export Feedback from './4_Feedback'