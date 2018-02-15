import React, { Component } from 'react'
import { Modal } from 'react-bootstrap'
import $, { setFormat } from 'actions'
import * as k from 'components'
import { data } from 'stores'

export default class Overview extends Component {
	constructor() {
		super()
		this.state = { variables:[], functions:[], modal:false, fn:'', hub:'', params:'', id:'', drag:'' }
		this.handleModal = this.handleModal.bind(this)
		this.drag = this.drag.bind(this)
		this.drop = this.drop.bind(this)
	}
	componentDidMount() {
		const { code } = this.props
		data.child(code).once('value').then(r => {
			if (r.hasChild('variables'))
			data.child(`${code}/variables`).orderByChild('var').on('value', snap => {
				let variables = []
				snap.forEach(v => {
					variables.push({ id:v.key, var:v.val().var, type:v.val().type, val:v.val().val, vt:v.val().vt, res:v.val().res })
					this.setState({ variables:variables })
				})
			})
			if (r.hasChild('functions'))
			data.child(`${code}/functions`).orderByChild('position').on('value', snap => {
				let functions = []
				snap.forEach(f => {
					functions.push({ id:f.key, function:f.val().function, params:f.val().params, hub:f.val().hub, width:f.val().width })
					this.setState({ functions:functions })
				})
			})
		})
	}
	componentWillUnmount() {
		this.setState({ modal:false })
	}
	handleModal() {
		this.setState({ modal:!this.state.modal })
	}
	handleFunction(fn, params, id) {
		this.setState({ fn:fn, modal:!this.state.modal, params:params, id:id })
	}
	updateParams(canvas, params) {
		data.child(`${this.props.code}/functions/${this.state.id}`).update({
			params:params, date:(new Date()).toLocaleString()
		}).then(() => { this.setState({ modal:false }) })
	}
	updateWidth(id) {
		data.child(`${this.props.code}/functions/${id}`).update({ 
			width:$(`select-${id}`).value
		})
	}
	allowDrop(e) {
    	e.preventDefault()
	}	
	drag(e) {
		let drag = e.target.id
		this.setState({ drag:drag })
		e.dataTransfer.setData('text', $(drag.split('-/')[0]))
	}
	drop(e) {
	    e.preventDefault()
	    let drag = this.state.drag.split('-/'), i = Number.parseInt(drag[1]), 
	    	drop = e.target.id.split('-/'), f = Number.parseInt(drop[1])

	    if (i < f && drag.length > 1) {
	    	data.child(`${this.props.code}/functions/`).once('value').then(snap => {
	    		snap.forEach(fn => {
	    			let k = fn.val().position
	    			if (k <= f && k > i) {
	    				data.child(`${this.props.code}/functions/${fn.key}`).update({ position:k - 1 })
	    			} else if (k == i) {
	    				data.child(`${this.props.code}/functions/${fn.key}`).update({ position:f })
	    			}
	    		})
	    	})
	    } else if (i > f && drag.length > 1) {
	    	data.child(`${this.props.code}/functions/`).once('value').then(snap => {
	    		snap.forEach(fn => {
	    			let k = fn.val().position
	    			if (k >= f && k < i) {
	    				data.child(`${this.props.code}/functions/${fn.key}`).update({ position:k + 1 })
	    			} else if (k == i) {
	    				data.child(`${this.props.code}/functions/${fn.key}`).update({ position:f })
	    			}
	    		})
	    	})
	    }
	}
	render() {
        const { modal, fn, params, variables, functions } = this.state
        return (
			<div class="overview">
				<div class="col-md-3 resume">
					<h5><b>Resumen</b></h5>
					<h6 class="subtitle"><b>Variables:</b></h6>
					<ul> 
					{
						variables.map((m, i) => { 
							if (m.var != '' && m.val != '') return (
								<h6 key={i}>${m.var.toLowerCase()} = {setFormat(m.val)};</h6>
							)
						})
					}
					</ul>
				</div>
				<div class="col-md-9 functions">
					<h6 class="subtitle"><b>Funciones:</b></h6>
					<table class="table">
						<tbody>
						{
							functions.map((m, i) => {
								return (
									<tr key={i} id={`${m.id}-/${i}-/a`} class={m.hub} onDrop={this.drop} onDragOver={this.allowDrop} draggable="true" onDragStart={this.drag}>
										<td id={`${m.id}-/${i}-/e`} style={{maxWidth:'20px'}}><h6 id={`${m.id}-/${i}-/i`}>{i+1}</h6></td>
										<td id={`${m.id}-/${i}-/o`}><h6 id={`${m.id}-/${i}-/u`}>{m.function}</h6></td>
										<td style={{maxWidth:'80px'}}>
											<li>
												<span>Ancho</span>&nbsp;
												<select defaultValue={m.width} id={`select-${m.id}`} onChange={this.updateWidth.bind(this, m.id)}>
													<option value="12">100%</option>
													<option value="9">75%</option>
													<option value="8">66.6%</option>
													<option value="6">50%</option>
													<option value="4">33.3%</option>
													<option value="3">25%</option>
												</select>
											</li>
										</td>
										<td style={{maxWidth:'60px'}} onClick={this.handleFunction.bind(this, m.function, m.params, m.id)}>
											<li>
												<span>Editar</span>&nbsp;
												<span class="glyphicon glyphicon-pencil"/>
											</li>
										</td>
										<td style={{maxWidth:'60px'}}>
											<li>
												<span>Borrar</span>&nbsp;
												<span class="glyphicon glyphicon-trash"/>
											</li>
										</td>
									</tr>
								)
							})
						}
						</tbody>
					</table>
				</div>
			    <Modal show={modal} onHide={this.handleModal} aria-labelledby="contained-modal-title-lg" bsClass="modal" bsSize="large">
				{
					fn == 'Plano Cartesiano' ? <k.PlanoCartesiano update={(i, k) => this.updateParams.bind(this, i, k)} params={params}/> : 
					fn == 'Gráfico Datos' ? <k.GraficoDatos update={(i, k) => this.updateParams.bind(this, i, k)} params={params}/> : ''					
				}
				</Modal>
			</div>
		)
	}
}