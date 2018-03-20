import React, { Component } from 'react'
import { EditorState, convertToRaw, ContentState } from 'draft-js'
import { Editor } from 'react-draft-wysiwyg'
import draftToHtml from 'draftjs-to-html'
import htmlToDraft from 'html-to-draftjs'
import { data } from 'stores'

export default class TextEditor extends Component {
    constructor(props) {
        super(props)
        this.state = { editorState: EditorState.createEmpty(), edited:false }
    }
    componentWillMount() {
        const { path, push, code, id } = this.props.store
        if (!push && path == 'answers')
            data.child(`${code}/${push}/${id}`).once('value').then(snap => {
                if (snap.hasChild('feedback')) {
                    const { contentBlocks, entityMap } = htmlToDraft(snap.val().feedback)
                    let contentState = ContentState.createFromBlockArray(contentBlocks, entityMap),
                        editorState = EditorState.createWithContent(contentState)
                    this.setState({ editorState })
                }
            })
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
        this.setState({ editorState:text, edited:true })
    }
    render() {
        const { editorState } = this.state
        return (
            <div class="row">
                <div class="col-sm-12">
                    <Editor editorState={editorState} wrapperClassName="demo-wrapper" editorClassName="demo-editor" 
                    onEditorStateChange={::this.onEditorStateChange}/>
                </div>
                <textarea disabled value={draftToHtml(convertToRaw(editorState.getCurrentContent()))} class="col-md-12 hidden"/>
            </div>
        )
    }
}