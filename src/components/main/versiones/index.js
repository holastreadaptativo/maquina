import React, { Component } from 'react'
import { ejercicios, focus } from 'actions'
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
		this.setState({ [e.target.id.split('-')[1]]:e.target.value })
	}
	handleSelect(m, i) {
		this.setState({ vars:m.vars, active:i })
	}
	handleRemove(m, i) {
		const { code } = this.props

		if (confirm('¿Quieres eliminar esta versión?')) {
			let ref = data.child(`${code}/versions`)
			ref.child('gen').once('value').then(snap => {
				snap.forEach(v => {
					if (v.val().id == m.id) {
						ref.child(`gen/${v.key}`).remove().then(() => {
							ref.child('bup').orderByKey().limitToFirst(1).once('value').then(w => {	
								w.forEach(x => { 
									ref.child('gen').push( x.val() )
									ref.child(`bup/${x.key}`).remove()
								})
							})	
						})
					}					
				})
			})
			this.setState({ active:i-1 })
		}		
	}
	print() {
		ejercicios('GET', { functions:this.props.functions, versions:this.state.vars, vt:false })
	}
	render() {
		const { functions, option, versions } = this.props
		const { active, vt } = this.state
        return(
        	<Section style="versiones" condition={false} {...this.props}>
        		<div class="row">  			
    				<div class="col-xs-3 seleccion">
						<h5><b>Selección</b></h5>
						<h4 class={focus(active == -1, 'active')} onClick={() => this.handleSelect(vt, -1)}>
							Versión VT
						</h4>
						{
							versions.map((m, i) => 
								<h4 key={i} id={m.id} class={focus(active == i, 'active')} onClick={() => this.handleSelect(m, i)}>
									Versión {m.id + 1}
									<span class="glyphicon glyphicon-remove close" onClick={() => this.handleRemove(m, i)}/>
								</h4>
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