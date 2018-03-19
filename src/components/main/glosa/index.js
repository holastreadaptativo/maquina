import React, { Component } from 'react'
import { Section, Functions, Overview } from 'components'

export class Glosa extends Component {
     constructor(props) {
		super(props)
		this.state = { path:'feedback', container:'modal' }
	}
    render() {
		const { option } = this.props
		return(
        	<Section style="ejercicios glosa" condition={false} {...this.props}>
        		<div class="row">
	        		<div class="feedback">
	        			<section>


	        			
	        			</section>
	        			<div class="img"/>
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