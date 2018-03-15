import React, { Component } from 'react'
import $, { ejercicios, stringify } from 'actions'
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
		const { code, functions } = this.props

		let f = stringify(functions), v = stringify(vt), doc = '', name=`${code}_${vt.id}`
		doc += '<!doctype html><html lang="es"><head><meta charset="utf-8"><title>versión '+vt.id+'</title>'
		doc += '<script src="app.js"></script><link rel="stylesheet" type="text/css" href="app.css">'
		doc += '<body id="'+name+'" data-content="'+f+'" data-version="'+v+'">'
		doc += '<div id="content" class="design"><h1>HELLO WORLD</h1></div></body></html>'

	    if (window.webkitURL != null) {
	    	let file = new Blob([doc], {type:'text/plain'})
		   	$('download').href = window.webkitURL.createObjectURL(file)
		   	$('download').download = `${name}.html`
	    }
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
        			<a id="download" onClick={::this.download}>
						<button class="btn">Descargar</button>
					</a>
        		</div>
        	</Section>
        )
    }
}

import Generate from './5_Generate'
import Preview from './5_Preview'
import Select from './5_Select'