import React, { Component } from 'react'
import { TextEditor, Devices } from 'components'
import { focus, show } from 'actions'
import { data } from 'stores'

export default class Editor extends Component {
	constructor(props) {
		super(props)
		this.state = { active:0, md:12, sm:12, xs:12, edited:false, feedback:'' }
	}
	componentWillMount() {
		const { store } = this.props
		if (!store.push) {
			data.child(`${store.code}/${store.path}/${store.id}/width`).on('value', snap => {
				this.setState({ md:snap.val().md, sm:snap.val().sm, xs:snap.val().xs })
			})
			if (store.path == 'answers')
			data.child(`${store.code}/${store.path}/${store.id}`).on('value', snap => {
				this.setState({ feedback:snap.val().feedback })
			})
		}
	}
	componentWillUnmount() {
		const { store } = this.props
		const { md, sm, xs, edited } = this.state
		if (!store.push && edited)
			data.child(`${store.code}/${store.path}/${store.id}/width`).update({ md:md, sm:sm, xs:xs })
	}
	setActive(active) {
		this.setState({ active:active })
	}
	handleWidth(e) {
		if (this.props.store.push)
			this.props.store.setState({ [e.target.id]:e.target.value })
		else
			this.setState({ [e.target.id]:e.target.value, edited:true })
	}
	render() {
		const { background, width, height, borderWidth, borderStyle, borderColor, borderRadius } = this.props.params
		const { add, update, push, path } = this.props.store
		const { active, md, sm, xs } = this.state
		let onSave = push ? add : update
        return (
        	<section class="editor">
        		<main class="config">
					<div class="title">
						<h3>Configuración</h3>
					</div>
					<nav class={show(path == 'answers', 'select')}>
					{
						['función', 'feedback'].map((m, i) => 
							<li key={i} class={`col-sm-6 ${focus(active == i, 'active')}`} onClick={() => this.setActive(i)}>{m}</li>
						)
					}
					</nav>
					{this.props.children}
				</main>
				<main class="preview">
					<div class={show(active == 0, 'container')}>
						<canvas id="container" class="center-block" style={{ background:background, width:`${width}px`, height:`${height}px`, 
						border:`${borderWidth}px ${borderStyle} ${borderColor}`, borderRadius:`${borderRadius}px` }}>
							Your browser does not support the HTML5 canvas.
						</canvas>
					</div>
					<div class={show(active == 1, 'textarea')}>
						<TextEditor {...this.props} data={this.state.feedback}/>
					</div>
					<button id="btn-save" class="react-submit" onClick={onSave(this.props.params)}>Guardar</button>
				</main>
				<header>
					<h5>{this.props.title}</h5>
				</header>
				<footer>
					<Devices devices={[md, sm, xs]} onChange={::this.handleWidth}/>
				</footer>
        	</section>
        	
		)
	}
}