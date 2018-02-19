import React, { Component } from 'react'
import SplitPane from 'react-split-pane'

export default class Configuracion extends Component {
    render() {
        return(
        	<div class="config">
        		<div class="slider-control-container">
					<div class="container">
						<h3>Configuración</h3>
						<SplitPane defaultSize="50%" minSize={80} maxSize={window.innerWidth - 320} split="vertical" class="resizable">
				            <div class="static-background"/>
				            <div class="dynamic-background"/>
				        </SplitPane>
					</div>
        		</div>
        	</div>
        )
    }
}