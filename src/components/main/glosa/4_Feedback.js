import React, { Component } from 'react'

export default class Feedback extends Component {
	render() {
		const { feedback, container } = this.props
        return(
        	<section>	
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
			</section>
        )
    }
}