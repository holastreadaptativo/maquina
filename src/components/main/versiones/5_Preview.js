import React, { Component } from 'react'

export default class Preview extends Component {
	render() {
		return(
        	<div class="col-xs-9 preview">	
				<div class="design">
				{	
					this.props.functions.map((m, i) => 
						<div key={i} class={`col-md-${m.width.md} col-sm-${m.width.sm} col-sm-${m.width.xs} div-${m.tag} tags`}>
						{
							m.tag != 'general' ? 
							<canvas id={`container-${i}`} style={{background:m.params.background}}></canvas> :
							<div id={`container-${i}`} class="general"></div>
						}
						</div>
					)
				}
				</div>					
			</div>
        )
    }
}