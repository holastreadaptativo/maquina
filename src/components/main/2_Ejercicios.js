import React, { Component } from 'react'
import { Section, Overview, Functions, Design, Feedback } from 'components'
import { action } from 'actions'
import { LABELS } from 'stores'

export class Ejercicios extends Component {
	render() { return <General {...this.props} path="functions"/> }
}

export class Respuestas extends Component {
	render() { return <General {...this.props} path="answers"/> }
}

export class Glosa extends Component {
	render() { return <General {...this.props} path="feedback"/> }
}

class General extends Component {
    constructor(props) {
		super(props)
		this.state = { code:props.code, path:props.path, container:LABELS.CONT[props.path] }
	}
    componentWillMount() {
    	action.exe('CHECK', this.state)
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