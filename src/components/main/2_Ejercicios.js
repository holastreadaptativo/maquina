import React, { Component } from 'react'
import { Section } from 'components'
import { action } from 'actions'

export class Ejercicios extends Component {
	render() { return <General {...this.props} path="functions" container="container"/> }
}

export class Respuestas extends Component {
	render() { return <General {...this.props} path="answers" container="content"/> }
}

export class Glosa extends Component {
	render() { return <General {...this.props} path="feedback" container="modal"/> }
}

class General extends Component {
    constructor(props) {
		super(props)
		this.state = { path:props.path, container:props.container }
	}
    componentDidMount() {
    	action.ejercicios('COUNT', { code:this.props.code, path:this.state.path })
	}
	render() {
		return (
			<Section style="design" condition={this.props[this.state.path].length} {...this.props}>
				<Overview id={0} {...this.props} {...this.state}/>
				<Functions id={1} {...this.props} {...this.state}/>
				{
					this.state.path != 'feedback' ? 
					<Design {...this.props} {...this.state}/> : 
					<Feedback {...this.props} {...this.state}/>
				}
        	</Section>
        )
	}
}

import Overview from './ejercicios/__Overview'
import Functions from './ejercicios/__Functions'
import Feedback from './ejercicios/__Feedback'
import Design from './ejercicios/__Design'
export Editor, { Devices } from './ejercicios/Editor'