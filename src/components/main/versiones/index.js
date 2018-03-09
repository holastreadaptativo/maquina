import React, { Component } from 'react'
import { ejercicios } from 'actions'
import { Section } from 'components'
import { data } from 'stores'

export class Versiones extends Component {
    constructor() {
		super()
		this.state = { total:0, limit:100, selected:20, vars:[], active:-1, vt:[] }
		this.print = this.print.bind(this)
	}
	componentWillMount() {
		data.child(`${this.props.code}/versions`).on('value', v => {
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
		setTimeout(() => this.print(), 100)
	}
	componentWillUnmount() {
		window.removeEventListener('resize', this.print )
	}
	handleChange(e) {
		this.props.setState({ [e.target.id.split('-')[1]]:e.target.value })
	}
	print() {
		ejercicios('GET', { functions:this.props.functions, versions:this.state.vars, vt:false })
	}
	render() {
		const { answers, functions, option, versions } = this.props
        return(
        	<Section style="versiones" condition={true} {...this.props}>
        		<div class="row">  			
        			<Generate {...this.props} {...this.state} condition={option == 0} onChange={(e) => this.handleChange(e)}/>
    				<Select {...this.state} code={this.props.code} versions={versions} setState={::this.setState}/>
        			<Preview answers={answers} functions={functions}/>
        		</div>
        	</Section>
        )
    }
}

import Generate from './5_Generate'
import Preview from './5_Preview'
import Select from './5_Select'