import React, { Component } from 'react'
import { Section } from 'components'

export class Glosa extends Component {
    render() {
		return(
        	<Section style="glosa" condition={true} {...this.props}>
        		<div class="row">
	        		<div class="feedback">
	        			<section>


	        			
	        			</section>
	        			<div class="img"/>
	        			<div class="triangle"/>
	        			<footer/>
	        		</div>
        		</div>
        	</Section>
        )
    }
}