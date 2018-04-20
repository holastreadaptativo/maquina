import React, { Component } from 'react'
import { EditorState, convertToRaw, ContentState } from 'draft-js'
import { Editor } from 'react-draft-wysiwyg'
import draftToHtml from 'draftjs-to-html'
import htmlToDraft from 'html-to-draftjs'
import { data } from 'stores'

export default class TextEditor extends Component {
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