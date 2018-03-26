export Input from './forms/Input'
export Select from './forms/Select'
export Text from './forms/Text'

export Header from './general/Header'
export Footer from './general/Footer'
export Section from './general/Section'

export Item from './group/Item'
export Tabs from './group/Tabs'

export Well from './panel/Well'
export Panel from './panel/Panel'
export Aside from './panel/Aside'

import React, { Component } from 'react'
import SplitPane from 'react-split-pane'

export class Config extends Component {
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