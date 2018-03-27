import React, { Component } from 'react'
import { action } from 'actions'

export default class Feedback extends Component {	
	constructor(props) {
		super(props)
		this.state = { path:props.path, container:props.container }
		this.print = this.print.bind(this)
	}
	componentDidMount() {	
		this.print()
	}
	componentDidUpdate() {
		setTimeout(() => this.print(), 0)
	}
	render() {
		const { container } = this.state
        return (
        	<section class="design">
	        	<div class="row">
		        	<main class="feedback">
		        		<article>
						{	
							this.props.feedback.map((m, i) => 
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
		action.exe('GET', { ...this.props, vt:true })
	}
}