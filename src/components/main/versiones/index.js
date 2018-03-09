import React, { Component } from 'react'
import { Section } from 'components'
import { ejercicios } from 'actions'
import { data } from 'stores'

export class Versiones extends Component {
    constructor() {
		super()
		this.state = { total:0, limit:100, selected:20, vars:[], active:0 }
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
			})
			ejercicios('GET', { functions:this.props.functions, versions:vars, vt:false })
		})
	}
	handleChange(e) {
		this.setState({ [e.target.id.split('-')[1]]:e.target.value })
	}
	handleSelect(m) {
		const { functions } = this.props
		this.setState({ active:1 })
		ejercicios('GET', { functions:functions, versions:m.vars, vt:false })
	}
	sort(m) {
		return m.sort((a, b) => (a.var.charCodeAt(0) - b.var.charCodeAt(0)) )
	}
	render() {
		const { functions, option, versions } = this.props
        return(
        	<Section style="versiones" condition={false} {...this.props}>
        		<div class="row">  			
    				<div class="col-xs-3 seleccion">
						<h5><b>Selección</b></h5>
						{
							versions.map((m, i) => 
								<h4 key={i} id={m.id} onClick={() => this.handleSelect(m)}>Versión {m.id + 1}</h4>
							)
						}
					</div>
        			<div class="col-xs-9 preview">	
						<div class="design">
						{	
							functions.map((m, i) => 
								<div key={i} class={`col-md-${m.width} col-sm-6 div-${m.tag} tags`}>
								{
									m.tag != 'general' ? 
									<canvas id={`container-${i}`} style={{background:m.params.background}}></canvas> :
									<div id={`container-${i}`} class="general"></div>
								}
								</div>
							)
						}
						</div>					
        			</div>
        			<Generate {...this.props} {...this.state} condition={option == 0} onChange={(e) => this.handleChange(e)}/>
        		</div>
        	</Section>
        )
    }
}

import Generate from './5_Generate'