import React, { Component } from 'react'
import { ejercicios } from 'actions'
import { Section } from 'components'
import { data } from 'stores'

export class Versiones extends Component {
    constructor() {
		super()
		this.state = { total:0, limit:128, selected:32, vars:[], active:-1, vt:[] }
		this.print = this.print.bind(this)
	}
	componentWillMount() {
		data.child(`${this.props.code}/versions`).on('value', v => {
			if (v.hasChild('total'))
				this.setState({ total:v.val().total, limit:v.val().limit, selected:v.val().selected })
		})
	}
	componentDidMount() {
		data.child(`${this.props.code}/variables`).once('value').then(snap => {
			let vars = []
			snap.forEach(v => {
				vars.push({ var:v.val().var, val:v.val().vt })
				this.setState({ vars:vars, vt:{ id:'vt', vars:vars } })
			})
			this.print()
		})
		window.addEventListener('resize', this.print )
	}
	componentDidUpdate() {
		setTimeout(() => this.print(), 0)
	}
	componentWillUnmount() {
		window.removeEventListener('resize', this.print )
	}
	print() {
		ejercicios('GET', { functions:this.props.functions, versions:this.state.vars, vt:false, path:'functions', container:'container' })
	}
	render() {
		const { answers, functions, feedback, option, versions } = this.props
        return(
        	<Section style="versiones" condition={true} {...this.props}>
        		<div class="row">
        			<Generate {...this.props} {...this.state} condition={option == 0} onChange={(e) => this.handleChange(e)}/>
    				<Select {...this.state} code={this.props.code} versions={versions} setState={::this.setState}/>
        			<Preview answers={answers} functions={functions} feedback={feedback}/>
        		</div>
        	</Section>
        )
    }
}

import Generate from './5_Generate'
import Preview from './5_Preview'
import Select from './5_Select'