import React, { Component } from 'react'
import { EditorState, convertToRaw, ContentState } from 'draft-js'
import { data, DEVICES, LABELS } from 'stores'
import { Editor } from 'react-draft-wysiwyg'
import draftToHtml from 'draftjs-to-html'
import htmlToDraft from 'html-to-draftjs'
import { compare, show } from 'actions'
import { Tabs } from 'components'
import { replace } from 'actions'

export default class eEditor extends Component {
	constructor(props) {
		super(props)
		this.state = { active:0, md:12, sm:12, xs:12, edited:false }
	}
	componentWillMount() {
		const { store } = this.props
		if (!store.push) {
			data.child(`${store.code}/${store.path}/${store.id}`).child('width').once('value').then(snap => {
				this.setState({ md:snap.val().md, sm:snap.val().sm, xs:snap.val().xs })
			})
		}
	}
	componentWillUnmount() {
		const { store } = this.props, { md, sm, xs, edited } = this.state
		if (!store.push && edited)
			data.child(`${store.code}/${store.path}/${store.id}/width`).update({ md:md, sm:sm, xs:xs })
	}
	render() {
		const { active, md, sm, xs } = this.state, { params, store } = this.props, { add, fn, path, push, tag, update, variables } = store
		const { background, borderColor, borderRadius, borderStyle, borderWidth, height, width } = params
		let onSave = push ? add : update, devices = [md, sm, xs], general = compare(tag, 'general')
		return (
        	<section class="editor">
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
						<canvas id="container" class="center-block" style={{ background:background, width:`${width}px`, height:`${height}px`, 
							border:`${borderWidth}px ${borderStyle} ${borderColor}`, borderRadius:`${borderRadius}px` }}></canvas>						
					</div>
					<div class={show(active == 0 && compare(fn, 'Insertar Texto'), 'textarea')}>
						<TextEditor {...this.props} text="content"/>
					</div>
					<div class={show(active == 1 && path == 'answers' && !general, 'textarea')}>
						<TextEditor {...this.props} text="feedback"/>
					</div>
					<div class={show(compare(fn, 'Insertar Input'), 'options')}>
						<InputEditor {...this.props}/>
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
	handleWidth(e) {
		if (this.props.store.push)
			this.props.store.setState({ [e.target.id]:e.target.value })
		else
			this.setState({ [e.target.id]:e.target.value, edited:true })
	}
}

class TextEditor extends Component {
    constructor(props) {
        super(props)
        this.state = { editorState:EditorState.createEmpty(), edited:false }
    }
    componentWillMount() {
        const { params, store, text } = this.props
        if (!store.push && params[text]) {
        	const { contentBlocks, entityMap } = htmlToDraft(params[text])
            const contentState = ContentState.createFromBlockArray(contentBlocks, entityMap)
            const editorState = EditorState.createWithContent(contentState)
            this.setState({ editorState:editorState })
        }
    }    
    componentWillUnmount() {
        const { path, push, code, id } = this.props.store, { edited, editorState } = this.state, base = data.child(`${code}/${path}/${id}/params`)
        const { text } = this.props, html = draftToHtml(convertToRaw(editorState.getCurrentContent())), date = (new Date()).toLocaleString()
        if (!push && edited && (text == 'content' || (text == 'feedback' && path == 'answers')))
        	base.update({ [text]:html, date })
    }
    onEditorStateChange(text) {
        if (this.props.store.push) {
            this.setState({ editorState:text })
            this.props.parent.setState({ [this.props.text]:draftToHtml(convertToRaw(text.getCurrentContent())) })
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
		const { inputSize, inputType } = this.props.params
		return (
			<form>
				<h5>Tipo de respuesta: <b>{inputType}</b></h5>
				<h6>{ this.getInfo(inputType) }</h6>
				<div>{ this.getInput(inputType) }</div>
				<div>{ this.getError(inputSize) }</div>
				<div>{ this.getFeed(inputSize) }</div>
			</form>
		)
	}	
	getInfo(type) {
		switch(type) {
			case 'input': { return 'Permite ingresar un texto o un número' }
			case 'checkbox': { return 'Permite seleccionar múltiples alternativas' }
			case 'radio': case 'select': { return 'Permite seleccionar solo una alternativa' }
			case 'textarea': { return 'Permite ingresar una respuesta extensa' }
		}
	}
	getInput(type) {
		const { value1, value2, value3, value4 } = this.props.params, { variables } = this.props.store, arr = [value1, value2, value3, value4]
		switch(type) {
			case 'input': { return <input type="text" placeholder="Respuesta"></input> }
			case 'radio': { return arr.map((m, i) => { let n = replace(m, variables, true)
				return ( <li key={i}><input name="answer" value={n} type="radio"/><label>{n}</label></li> )}					 
			)}
			case 'checkbox': { return arr.map((m, i) => { let n = replace(m, variables, true)
				return ( <li key={i}><input name="answer" value={n} type="checkbox"/><label>{n}</label></li> )}	
			)}	
			case 'select': { return <select>{ arr.slice(0, 3).map((m, i) => { let n = replace(m, variables, true)
				return ( <option key={i} value={n}>{n}</option> )} )}</select> 
			}
			case 'textarea': { return <textarea placeholder="Respuesta"></textarea> }
		}
	}
	getError(size) {
		const { error2, error3, error4 } = this.props.params
		return (
			<div class={show(size > 2, 'error')}>
				<h5 >Errores asociados:</h5>
				<h6><b>Opción 2: </b> 
					{ error2 == 0 ? 'Sin error frecuente asociado' : 'Código de error' } { error2 != 0 && <b>{error2}</b> }
				</h6>
				<h6><b>Opción 3: </b> 
					{ error3 == 0 ? 'Sin error frecuente asociado' : 'Código de error' } { error3 != 0 && <b>{error3}</b> }
				</h6>
				<h6 class={show(size > 3)}><b>Opción 4: </b> 
					{ error4 == 0 ? 'Sin error frecuente asociado' : 'Código de error' } { error4 != 0 && <b>{error4}</b> }
				</h6>
			</div>
		)
	}
	getFeed(size) {
		const { feed0, feed1, feed2, feed3, feed4 } = this.props.params
		return (
			<div class="feed">
				<h5>Feedback:</h5>
				<h6><b>Genérico: </b>{ feed0 ? feed0 : 'Ingresa un feedback general para los errores' }</h6>
				<h6><b>Correcto: </b>{ feed1 ? feed1 : 'Ingresa un feedback para la respuesta correcta' }</h6>
				<h6 class={show(size > 2)}><b>Opción 2: </b>{ feed2 ? feed2 : 'No hay feedback' }</h6>
				<h6 class={show(size > 2)}><b>Opción 3: </b>{ feed3 ? feed3 : 'No hay feedback' }</h6>
				<h6 class={show(size > 3)}><b>Opción 4: </b>{ feed4 ? feed4 : 'No hay feedback' }</h6>
			</div>
		)
	}
}