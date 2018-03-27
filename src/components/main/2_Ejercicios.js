import React, { Component } from 'react'
import { Section, Overview, Functions, Design, Feedback } from 'components'
import { action } from 'actions'

export class Ejercicios extends Component {
	render() { return <General {...this.props} path="functions" container="container-E"/> }
}

export class Respuestas extends Component {
	render() { return <General {...this.props} path="answers" container="container-R"/> }
}

export class Glosa extends Component {
	render() { return <General {...this.props} path="feedback" container="container-G"/> }
}

class General extends Component {
    constructor(props) {
		super(props)
		this.state = { path:props.path, container:props.container }
	}
    componentDidMount() {
    	action.exe('COUNT', { code:this.props.code, path:this.state.path })
	}
	render() {
		return (
			<Section style="ejercicios" condition={this.props[this.state.path].length} {...this.props}>
				<Functions id={0} {...this.props} {...this.state}/>
				<Overview id={1} {...this.props} {...this.state}/>
				{
					this.state.path != 'feedback' ? 
					<Design {...this.props} {...this.state}/> : 
					<Feedback {...this.props} {...this.state}/>
				}
        	</Section>
        )
	}
}