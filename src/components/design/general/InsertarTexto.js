import React, { Component } from 'react'
import { EditorState, convertToRaw, ContentState } from 'draft-js'
import { Input, Item } from 'components'
import { Editor } from 'react-draft-wysiwyg'
import draftToHtml from 'draftjs-to-html'
import htmlToDraft from 'html-to-draftjs'
import { Devices } from 'components'
import { data } from 'stores'

export default class InsertTexto extends Component {
	constructor(props) {
		super(props)
		this.state = props.push ? { textCont: '', active:0, color:'#ffffff', padding:'10px 10px 0px' } : props.params
	}
	onContUpdate(html) {
		this.setState({ textCont:html })
	}
	componentWillMount() {
		const { push, code, path, id } = this.props
		if (!push)
			data.child(`${code}/${path}/${id}/width`).on('value', snap => {
				this.setState({ md:snap.val().md, sm:snap.val().sm, xs:snap.val().xs })
			})
		else
			this.setState({ md:12, sm:12, xs:12 })
	}
	componentWillUnmount() {
		const { push, code, path, id } = this.props
		const { md, sm, xs, edited } = this.state
		if (!push && edited)
			data.child(`${code}/${path}/${id}/width`).update({ md:md, sm:sm, xs:xs })
	}
	handleWidth(e) {
		if (this.props.push)
			this.props.setState({ [e.target.id]:e.target.value })
		else
			this.setState({ [e.target.id]:e.target.value, edited:true })
	}
	handleActive(active) {
		this.setState({ active:active })
	}
	render() {
		const { add, update, push, onHide } = this.props
		const { active, md, sm, xs, color, padding } = this.state
		let onSave = push ? add : update, k = 0, params = this.state
		delete params.md; delete params.sm; delete params.xs
		return (
			<div class="react-functions">
				<div class="react-config">
					<div class="title">
						<h3>Configuración</h3>
					</div>
					<div>
						<Item id={k++} active={active} title="Texto" setActive={::this.handleActive}>
							<Input id="color" default={color} prefix="color" update={::this.setState} type="color"/>
							<Input id="padding" default={padding} prefix="padding" update={::this.setState} type="text"/>
						</Item>
					</div>
				</div>
				<div class="react-container">			
					<div class="text-editor">
						<EditorConvertToHTML {...this.state} contUpdate={(html) => this.onContUpdate(html)}/>
					</div>
					<span class="react-close glyphicon glyphicon-remove" onClick={onHide}/>
					<button id="btn-save" class="react-submit" onClick={onSave(params)}>Guardar</button>
				</div>
				<div class="react-header">
					<h5>Insertar Texto</h5>
				</div>
				<div class="react-footer">
					<Devices devices={[md, sm, xs]} onChange={::this.handleWidth}/>
				</div>	
			</div>
		)
	}
}

class EditorConvertToHTML extends Component {
  	constructor(props) {
	    super(props)
	    this.state = { ...props, editorState: EditorState.createEmpty() }
	    if (props.textCont != '') {
	        const { contentBlocks, entityMap } = htmlToDraft(props.textCont)
	        const contentState = ContentState.createFromBlockArray(contentBlocks, entityMap)
	        const editorState = EditorState.createWithContent(contentState)
	        this.state = { ...props,  editorState }
	    }
  	}
  	onEditorStateChange(text) {
	    this.setState({ editorState:text })
	    this.props.contUpdate(draftToHtml(convertToRaw(text.getCurrentContent())))
  	}
  	render() {
	    return (
		    <div class="row">
		        <div class="col-sm-12">
		    	    <Editor editorState={this.state.editorState} onEditorStateChange={::this.onEditorStateChange}
		    	    toolbar={{ list:{ inDropdown:true }, link:{ inDropdown:true }, emoji:{ className:'hidden' }}}/>
		        </div>
		    </div>    
	  	)
	}
}