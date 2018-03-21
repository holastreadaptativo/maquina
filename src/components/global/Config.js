import React, { Component } from 'react'
import SplitPane from 'react-split-pane'

export default class Configuracion extends Component {
    render() {
        let min = 20, max = window.innerWidth - min - 240
        return(
        	<div class="config">
        		<div class="slider-control-container">
					<div class="container">
						<h3>Configuración</h3>
						<SplitPane defaultSize="50%" minSize={min} maxSize={max} split="vertical" class="resizable">
				            <div class="static-background"/>
				            <div class="dynamic-background"/>
				        </SplitPane>
					</div>
        		</div>
        	</div>
        )
    }
}