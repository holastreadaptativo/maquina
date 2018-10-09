import React, { Component } from 'react'
import { data, DEVICES, LABELS } from 'stores'
import $, { compare, show } from 'actions'
import { Tabs } from 'components'

export class Editor extends Component {
	constructor(props) {
		super(props)
		this.state = { active:0, md:12, sm:12, xs:12, edited:false }
	}
	componentWillMount() {
		const { store } = this.props
		if (!store.push) {
			data.child(`${store.code}/${store.path}/${store.id}`).child('width').once('value').then(snap => {
				const { md, sm, xs } = snap.val(), 
				devices = [md, sm, xs]
				DEVICES.forEach((m, i) => { $(m.col).value = devices[i] })
				this.setState({ md, sm, xs })
			})
		}
	}
	componentWillUnmount() {
		const { store } = this.props, { md, sm, xs, edited } = this.state
		if (!store.push && edited)
			data.child(`${store.code}/${store.path}/${store.id}/width`).update({ md, sm, xs })
	}
	handleWidth(e) {
		if (this.props.store.push)
			this.props.store.setState({ [e.target.id]:e.target.value })
		else
			this.setState({ [e.target.id]:Number(e.target.value), edited:true })
	}
	render() {
		const { active, md, sm, xs } = this.state, 
		{ params, store } = this.props, 
		{ add, fn, path, push, tag, update, variables } = store
		const { background, borderColor, borderRadius, borderStyle, borderWidth, height, width } = params
		let onSave = push ? add : update, devices = [md, sm, xs], general = compare(tag, 'general')
		return (
        	<section class="editor" onContextMenu={e => e.preventDefault()}>
        		<main class="config">
					<div class="title">
						<h3>Configuración</h3>
					</div>
					<Tabs arr={['función', 'feedback']} show={compare(path, 'answers') && !general} parent={this}/>
					{this.props.children}
					<details class="variables">
						<summary>Variables</summary>
						<ul>
						{ 
							variables.map((m, i) => <li key={i}>${m.var} = {m.val} [{m.vt}]</li>) 
						}
						</ul>
					</details>
				</main>
				<main class="preview">
					<div class={show(active == 0 && !general, 'canvas')}>
						<canvas 
							id="container" 
							class="center-block img-fluid" 
							style={{ background:background, width:`${width}px`, height:`${height}px`, 
							border:`${borderWidth}px ${borderStyle} ${borderColor}`, borderRadius:`${borderRadius}px` }}
						>
						</canvas>						
					</div>
					<div class={show(active == 0 && compare(fn, 'Insertar Texto'), 'textarea')}>
						{fn == 'Insertar Texto' && <TextEditor {...this.props} text="content"/>}
					</div>
					<div class={show(active == 1 && path == 'answers' && !general, 'textarea')}>
						<TextEditor {...this.props} text="feedback"/>
					</div>
					<div class={show(compare(fn, 'Insertar Input'), 'options')}>
						{fn == 'Insertar Input' && <InputEditor {...this.props}/>}
					</div>
					<div class={show(compare(fn, 'Insertar Tabla'), 'editable')}>
						{fn == 'Insertar Tabla' && <TableEditor {...this.props}/>}
					</div>
					<button id="btn-save" class="react-submit" onClick={onSave(this.props.params)}>Guardar</button>
				</main>
				<header>
					<h5>{fn}</h5>
				</header>
				<footer>
					<h6>Devices:</h6>
					{
						DEVICES.map((n, j) => 
							<h6 key={j}>
								<i>{n.icon}</i>
								<select id={n.col} defaultValue={devices[j]} onChange={::this.handleWidth}>
								{
									LABELS.SIZE.map((m, i) =>
										<option key={i} value={m}>{Math.round(250/3*m, 2)/10+'%'}</option>
									)
								}	
								</select>
							</h6>
						)
					}
				</footer>
        	</section>
		)
	}
}

import InputEditor from './InputEditor'
import TableEditor from './TableEditor'
import TextEditor from './TextEditor'