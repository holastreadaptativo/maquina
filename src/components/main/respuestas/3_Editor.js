import React, { Component } from 'react'
import { data, SIZES, DEVICES } from 'stores'
import { TextEditor } from 'components'
import { focus, show } from 'actions'

export default class Editor extends Component {
	constructor(props) {
		super(props)
		this.state = { active:0, step:props.store.design ? 'functions' : 'answers', md:12, sm:12, xs:12 }
	}
	componentWillMount() {
		const { store } = this.props
		if (!store.push)
		data.child(`${store.code}/${this.state.step}/${store.id}/width`).on('value', snap => {
			this.setState({ md:snap.val().md, sm:snap.val().sm, xs:snap.val().xs })
		})
	}
	componentWillUnmount() {
		const { store } = this.props
		const { md, sm, xs } = this.state
		data.child(`${store.code}/${this.state.step}/${store.id}/width`).update({ md:md, sm:sm, xs:xs })
	}
	setActive(active) {
		this.setState({ active:active })
	}
	handleWidth(e) {
		const { store } = this.props
		if (store.push)
			store.setWidth({ [e.target.id]:e.target.value })
		else
			this.setState({ [e.target.id]:e.target.value })
	}
	render() {
		const { background, width, height, borderWidth, borderStyle, borderColor, borderRadius } = this.props.params
		const { add, update, push, onHide, design } = this.props.store
		const { active, md, sm, xs } = this.state
		let onSave = push ? add : update, devices = [md, sm, xs]
        return(
        	<div class="react-functions">
				<div class="react-config">
					<div class="title">
						<h3>Configuración</h3>
					</div>
					<nav class={show(!design, 'react-nav')}>
					{
						['función', 'feedback'].map((m, i) => 
							<li key={i} class={`col-sm-6 ${focus(active == i, 'active')}`} onClick={() => this.setActive(i)}>{m}</li>
						)
					}
					</nav>
					{this.props.children}
			    </div>
			    <div class="react-container">			
					<div class={show(active == 0, 'canvas')}>
						<canvas id="container" style={{ background:background, width:`${width}px`, height:`${height}px`, 
						border:`${borderWidth}px ${borderStyle} ${borderColor}`, borderRadius:`${borderRadius}px` }}>
							Your browser does not support the HTML5 canvas.
						</canvas>
					</div>
					<div class={show(active == 1, 'text-editor')}>
						<TextEditor {...this.props}/>
					</div>
					<span class="react-close glyphicon glyphicon-remove" onClick={onHide}/>
					<button id="btn-save" class="react-submit" onClick={onSave(this.props.params)}>Guardar</button>
				</div>
				<div class="react-header">
					<h5>{this.props.title}</h5>
				</div>
				<div class="react-footer">
					<h6>Devices:</h6>
					{
						DEVICES.map((n, j) => 
							<h6 key={j}>
								<i>{n.icon}</i>
								<select id={n.col} defaultValue={devices[j]} onChange={::this.handleWidth}>
								{
									SIZES.map((m, i) =>
										<option key={i} value={m}>{Math.round(250/3*m, 2)/10+'%'}</option>
									)
								}	
								</select>
							</h6>
						)
					}
					</div>			
			</div>
		)
	}
}