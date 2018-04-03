import React, { Component } from 'react'
import { data, DEVICES, LABELS } from 'stores'
import { focus, show } from 'actions' //Actualizar

export default class eEditor extends Component {
	constructor(props) {
		super(props)
		this.state = { active:0, md:12, sm:12, xs:12, edited:false, feedback:'' }
	}
	componentWillMount() {
		const { store } = this.props
		if (!store.push) {
			data.child(`${store.code}/${store.path}/${store.id}/width`).once('value').then(snap => {
				this.setState({ md:snap.val().md, sm:snap.val().sm, xs:snap.val().xs })
			})
			if (store.path == 'answers')
			data.child(`${store.code}/${store.path}/${store.id}`).once('value').then(snap => {
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
	render() {
		const { active, md, sm, xs } = this.state, { params, store, title } = this.props, { add, update, push, path } = store
		const { background, width, height, borderWidth, borderStyle, borderColor, borderRadius } = params
		let onSave = push ? add : update, input = title == 'Insertar Input'
        return (
        	<section class="editor">
        		<main class="config">
					<div class="title">
						<h3>Configuración</h3>
					</div>
					<nav class={show(path == 'answers' && !input, 'select')}>
					{
						['función', 'feedback'].map((m, i) => 
							<li key={i} class={`col-sm-6 ${focus(active == i, 'active')}`} onClick={() => this.setActive(i)}>{m}</li>
						)
					}
					</nav>
					{this.props.children}
					<details class="variables">
						<summary>Variables</summary>
						<ul>{ this.props.store.variables.map((m, i) => <li key={i}>${m.var} = {m.val} [{m.vt}]</li>) }</ul>
					</details>
				</main>
				<main class="preview">
					<div class={show(active == 0 && !input, 'canvas')}>
						<canvas id="container" class="center-block" style={{ background:background, width:`${width}px`, height:`${height}px`, 
							border:`${borderWidth}px ${borderStyle} ${borderColor}`, borderRadius:`${borderRadius}px` }}></canvas>						
					</div>
					<div class={show(active == 1 && !input, 'textarea')}>
						<TextEditor {...this.props} data={this.state.feedback}/>
					</div>
					<div class={show(input), 'options'}>
						<InputEditor {...this.props}/>
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
	handleWidth(e) {
		if (this.props.store.push)
			this.props.store.setState({ [e.target.id]:e.target.value })
		else
			this.setState({ [e.target.id]:e.target.value, edited:true })
	}
	setActive(active) {
		this.setState({ active:active })
	}
}

export class Devices extends Component {
	render() {
		const { devices, onChange } = this.props
		return (
			<div>
				<h6>Devices:</h6>
				{
					DEVICES.map((n, j) => 
						<h6 key={j}>
							<i>{n.icon}</i>
							<select id={n.col} defaultValue={devices[j]} onChange={onChange}>
							{
								LABELS.SIZE.map((m, i) =>
									<option key={i} value={m}>{Math.round(250/3*m, 2)/10+'%'}</option>
								)
							}	
							</select>
						</h6>
					)
				}
			</div>
		)
	}
}

import { EditorState, convertToRaw, ContentState } from 'draft-js'
import { Editor } from 'react-draft-wysiwyg'
import draftToHtml from 'draftjs-to-html'
import htmlToDraft from 'html-to-draftjs'

class TextEditor extends Component {
    constructor(props) {
        super(props)
        this.state = { editorState:EditorState.createEmpty(), edited:false }
    }
    componentWillMount() {
        const { data, store } = this.props
        if (!store.push && store.path == 'answers' && data != '') {
            const { contentBlocks, entityMap } = htmlToDraft(data)
            const contentState = ContentState.createFromBlockArray(contentBlocks, entityMap)
            const editorState = EditorState.createWithContent(contentState)
            this.setState({ editorState:editorState })
        }
    }    
    componentWillUnmount() {
        const { path, push, code, id } = this.props.store
        const { edited, editorState } = this.state
        if (!push && path == 'answers' && edited)
            data.child(`${code}/${path}/${id}`).update({
                feedback:draftToHtml(convertToRaw(editorState.getCurrentContent())), date:(new Date()).toLocaleString()
            })
    }
    onEditorStateChange(text) {
        if (this.props.store.push) {
            this.setState({ editorState:text })
            this.props.store.setState({ feedback:draftToHtml(convertToRaw(text.getCurrentContent())) })
        }
        else
            this.setState({ editorState:text, edited:true })
    }
    render() {
        return (
            <div class="row">
                <div class="col-sm-12">
                    <Editor editorState={this.state.editorState} onEditorStateChange={::this.onEditorStateChange}
                    	toolbar={{ list:{ inDropdown:true }, link:{ inDropdown:true }, emoji:{ className:'hidden' }}}/>
                </div>
                <textarea disabled value={draftToHtml(convertToRaw(this.state.editorState.getCurrentContent()))} class="col-md-12 hidden"/>
            </div>
        )
    }
}

class InputEditor extends Component {
	render () {
		const { inputType, value1, value2, value3, value4 } = this.props.params, options = [value1, value2, value3, value4]

		let info = ''
		switch(inputType) {
			case 'input': { info = 'Permite ingresar un texto o un número'; break }
			case 'checkbox': { info = 'Permite seleccionar múltiples alternativas'; break }
			case 'radio': case 'select': { info = 'Permite seleccionar solo una alternativa'; break }
			case 'textarea': { info = 'Permite ingresar una respuesta extensa'; break }
		}
		return (
			<form>
			<h5>Tipo de respuesta: <b>{inputType}</b></h5>
			<h6>{info}</h6>
			{
				inputType == 'input' &&
				<input type="text" placeholder="Respuesta"></input>
			}
			{
				inputType == 'radio' &&
				options.map((m, i) => <li key={i}><input id={m} name="answer" value={m} type="radio"/><label>{m}</label></li> )
			}
			{
				inputType == 'checkbox' &&
				options.map((m, i) => <li key={i}><input id={m} name="answer" value={m} type="checkbox"/><label>{m}</label></li> )
			}
			{
				inputType == 'select' &&
				<select>
				{
					options.map((m, i) => <option key={i} value={m}>{m}</option> )
				}
				</select>
			}
			{
				inputType == 'textarea' &&
				<textarea placeholder="Respuesta"></textarea>
			}
			</form>
		)
	}
}