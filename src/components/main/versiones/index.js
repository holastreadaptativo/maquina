import React, { Component } from 'react'
import { ejercicios, stringify } from 'actions'
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
		setTimeout(() => this.print(), 100)
	}
	componentWillUnmount() {
		window.removeEventListener('resize', this.print )
	}
	handleChange(e) {
		this.setState({ [e.target.id.split('-')[1]]:e.target.value })
	}
	download() {
		const { vt } = this.state
		const { code, functions, versions } = this.props

		let v = [...versions, vt], f = stringify(functions), s = code.substring(10, 15)
		v.forEach(m => {
			let doc = '', name=`${s}_${m.id}`
			doc += '<!doctype html><html lang="es"><head><meta charset="utf-8"><title>'+name+'</title>'
			doc += '<script src="app.js"></script><link rel="stylesheet" type="text/css" href="app.css">'
			doc += '<body id="'+name+'" data-content="'+f+'" data-version="'+stringify(m)+'">'
			doc += '<div id="content" class="design"></div></body></html>'

			let a = document.createElement('a'), url = URL.createObjectURL(new Blob([doc], {type:'text/html'}))
			a.href = url; a.download = `${name}.html`; document.body.appendChild(a); a.click()
			setTimeout(() => { document.body.removeChild(a); window.URL.revokeObjectURL(url) }, 0)
		})
	}
	print() {
		ejercicios('GET', { functions:this.props.functions, versions:this.state.vars, vt:false, path:'functions' })
	}
	render() {
		const { answers, functions, feedback, option, versions } = this.props
        return(
        	<Section style="versiones" condition={true} {...this.props} download={::this.download}>
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