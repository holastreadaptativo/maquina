import React, { Component } from 'react'
import { Modal } from 'react-bootstrap'
import { FUNCIONES } from 'components'
import { data, SIZES } from 'stores'
import $, { focus } from 'actions'

export default class Overview extends Component {
	constructor() {
		super()
		this.state = { modal:false, fn:'', tag:'', params:'', id:'', drag:'' }
	}
	componentWillUnmount() {
		this.setState({ modal:false })
	}
	handleModal() {
		this.setState({ modal:!this.state.modal })
	}
	handleUpdate(fn, params, id) {
		this.setState({ fn:fn, modal:!this.state.modal, params:params, id:id })
	}
	handleRemove(id) {
		const { code } = this.props
		if (confirm('¿Estas seguro de borrar la función?'))
		data.child(`${code}/functions/${id}`).once('value').then(t => {
			let i = t.val().position
				data.child(`${code}/functions/`).once('value').then(snap => {
	    		snap.forEach(fn => {
	    			let f = fn.val().position
	    			if (i < f && this.props.functions.length > 0) {
	    				data.child(`${code}/functions/${fn.key}`).update({ position:f - 1 })
	    			} else if (i == f) {
	    				data.child(`${code}/functions/${fn.key}`).remove().then(() => {
	    					data.child(code).once('value').then(c => {
	    						data.child(this.props.code).update({ count:c.val().count - 1 })
	    					})
	    				})
	    			}
	    		})
	    	})
		})	
	}
	updateFunction(params) {
		$('btn-save').setAttribute('disabled', 'true')
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
        const { modal, fn, params } = this.state
        const { variables, functions } = this.props
        let FX = null
        FUNCIONES.forEach(m => {
        	m.fns.forEach(n => {
    			if (n.id == fn)
    				FX = n.component 
    		})
        })
        return (
        	<aside class={focus(this.props.condition, 'active')}>
				<div class="overview">	
					<div class="title">
						<h3>Ejercicio</h3>
					</div>
					<table class="table">
						<tbody>
						{
							functions.map((m, i) => {
								return (
									<tr key={i} id={`${m.id}-/${i}-/a`} class={m.tag} onDrop={::this.drop} onDragOver={this.allowDrop} 
									draggable="true" onDragStart={::this.drag}>
										<td id={`${m.id}-/${i}-/e`}>
											<h6 id={`${m.id}-/${i}-/i`}>{i+1}</h6>
										</td>
										<td id={`${m.id}-/${i}-/o`}>
											<h6 id={`${m.id}-/${i}-/u`}>{m.function}-{m.id.substring(4, 7)}</h6>
										</td>
										<td style={{maxWidth:'55px'}} class="hidden">
											<li>
												<span>Ancho</span>&nbsp;
												<select defaultValue={m.width} id={`select-${m.id}`} onChange={this.updateWidth.bind(this, m.id)}>
												{
													SIZES.map((m, i) => { return (
														<option key={i} value={m}>{Math.round(250/3*m, 2)/10+'%'}</option>
													)})
												}
												</select>
											</li>
										</td>
										<td style={{maxWidth:'65px'}}>
											<li>
												<span class="glyphicon glyphicon-pencil" 
													onClick={this.handleUpdate.bind(this, m.function, m.params, m.id)}/>
												<span class="glyphicon glyphicon-trash" onClick={this.handleRemove.bind(this, m.id)}/>
											</li>
										</td>
									</tr>
								)
							})
						}
						</tbody>
					</table>
				</div>
			    <Modal show={modal} onHide={::this.handleModal} aria-labelledby="contained-modal-title-lg" bsClass="react-modal" bsSize="large">
				{
					FX != null ? 
					<FX update={(x) => this.updateFunction.bind(this, x)} variables={variables} params={params} onHide={::this.handleModal}/> : ''
				}						
				</Modal>
			</aside>
		)
	}
}

/*

<div class="col-sm-3">
	<h5><b>Resumen</b></h5>
	<h6 class="subtitle"><b>Variables:</b></h6>
	<ul> 
	{
		variables.map((m, i) => { 
			if (m.var != '' && m.val != '') return (
				<h6 key={i}>{`$${m.var.toLowerCase()} = ${setFormat(m.val)}; (vt = ${m.vt})`}</h6>
			)
		})
	}
	</ul>
</div>

*/