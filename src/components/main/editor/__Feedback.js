import React, { Component } from 'react'
import { action } from 'actions'

export default class Feedback extends Component {	
	componentDidMount() {	
		this.print()
	}
	componentDidUpdate() {
		setTimeout(() => this.print(), 0)
	}
	render() {
		const { container, feedback } = this.props
        return (
        	<section class="design">
	        	<div class="row">
		        	<main class="feedback">
		        		<article>
						{	
							feedback.map((m, i) => 
								<div key={i} class={`col-md-${m.width.md} col-sm-${m.width.sm} col-sm-${m.width.xs} div-${m.tag} tags`}>
								{
									m.tag != 'general' ? 
									<canvas id={`${container}-${i}`} style={{background:m.params.background}}></canvas> :
									<div id={`${container}-${i}`} class="general"></div>
								}
								</div>
							)
						}		
						</article>	
	        			<div class="img-duck"/>
	        			<div class="triangle"/>
	        			<footer/>
	        		</main>
	    		</div>
    		</section>
        )
    }
	print() {
		action.exe('PRINT', { ...this.props, vt:true })
	}
}