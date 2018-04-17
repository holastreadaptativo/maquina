export Input from './forms/Input'
export Select from './forms/Select'
export Text from './forms/Text'

export Footer from './general/Footer'
export Header from './general/Header'
export Section from './general/Section'
export SignIn from './general/SignIn'

export Item from './group/Item'
export Tabs from './group/Tabs'

export Aside from './panel/Aside'
export Modal from './panel/Modal'
export Panel from './panel/Panel'
export Well from './panel/Well'

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