import React, { Component } from 'react'
import { ejercicios, focus } from 'actions'
import { Modal } from 'react-bootstrap'
import { FUNCIONES } from 'components'
import { data, SIZES } from 'stores'

export default class Overview extends Component {
	constructor(props) {
		super(props)
		this.state = { modal:false, fn:'', tag:'', params:'', id:'', drag:'', action:ejercicios }
	}
	componentWillUnmount() {
		this.setState({ modal:false })
	}
	handleModal() {
		this.setState({ modal:!this.state.modal })
	}
	handleEditor(fn, params, id) {
		this.setState({ modal:!this.state.modal, fn:fn, params:params, id:id })
	}
	allowDrop(e) {
    	e.preventDefault()
	}	
	drag(e) {
		this.setState({ drag:e.target.id })
	}
	drop(e) {
	    e.preventDefault()
	    let drag = this.state.drag.split('-/'), i = Number.parseInt(drag[1]), 
	    	drop = e.target.id.split('-/'), f = Number.parseInt(drop[1])

	    if (drag.length > 1)
	    	this.state.action('MOVE', { ...this.props, i:i, f:f })
	}
	handleWidth(e) {
		data.child(`${this.props.code}/${this.props.path}/${e.target.id}/width`).update({ md:e.target.value })
	}
	handleUpdate(params) {
		this.state.action('UPDATE', { ...this.props, ...this.state, params:params })
		this.setState({ modal:false })
	}
	handleRemove(id) {
		if (confirm('¿Estas seguro de borrar la función?'))
			this.state.action('REMOVE', { ...this.props, id:id })
	}
	getComponent() {
		let FX = null
		FUNCIONES.forEach(m => { 
			m.fns.forEach(n => { if (n.id == this.state.fn) FX = n.component })
        })
       	return FX ? 
       		<FX update={(x) => this.handleUpdate.bind(this, x)} id={this.state.id} {...this.props}
       			params={this.state.params} onHide={::this.handleModal}/> : ''
	}
	render() {
		const { answers, functions, feedback, path } = this.props
		let aux = path == 'functions' ? functions : path == 'answers' ? answers : feedback
		return (
        	<aside class={focus(this.props.condition, 'active')}>
				<div class="overview">	
					<div class="title">
						<h3>{path == 'functions' ? 'Ejercicio' : path == 'answers' ? 'Respuestas' : 'Glosa'}</h3>
					</div>
					<table class="table">
						<tbody>
						{
							aux.map((m, i) => 
								<tr key={i} id={`${m.id}-/${i}-/a`} class={m.tag} onDrop={::this.drop} onDragOver={this.allowDrop} 
								draggable="true" onDragStart={::this.drag}>
									<td id={`${m.id}-/${i}-/e`}>
										<h6 id={`${m.id}-/${i}-/i`}>{i+1}</h6>
									</td>
									<td id={`${m.id}-/${i}-/o`}>
										<h6 id={`${m.id}-/${i}-/u`}>{m.function}-{m.id.substring(4, 7)}</h6>
									</td>
									<td>
										<li>
											<select defaultValue={m.width.md} id={m.id} onChange={::this.handleWidth}>
											{
												SIZES.map((m, i) => { return (
													<option key={i} value={m}>{Math.round(250/3*m, 2)/10+'%'}</option>
												)})
											}
											</select>
										</li>
									</td>
									<td>
										<li>
											<span class="glyphicon glyphicon-pencil" 
												onClick={this.handleEditor.bind(this, m.function, m.params, m.id)}/>
											<span class="glyphicon glyphicon-trash" onClick={this.handleRemove.bind(this, m.id)}/>
										</li>
									</td>
								</tr>
							)
						}
						</tbody>
					</table>
				</div>
			    <Modal show={this.state.modal} onHide={::this.handleModal} bsClass="react-modal">
					{ this.getComponent() }					
				</Modal>
			</aside>
		)
	}
}