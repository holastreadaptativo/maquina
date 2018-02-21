import React, { Component } from 'react'
import SplitPane from 'react-split-pane'

export default class Configuracion extends Component {
    render() {
        let margin = 10
        return(
        	<div class="config">
        		<div class="slider-control-container">
					<div class="container">
						<h3>Configuración</h3>
						<SplitPane defaultSize="90%" minSize={margin} maxSize={window.innerWidth - margin - 240} split="vertical" class="resizable">
				            <div class="static-background"/>
				            <div class="dynamic-background"/>
				        </SplitPane>
					</div>
        		</div>
        	</div>
        )
    }
}