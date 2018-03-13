import React, { Component } from 'react'
import { EditorState, convertToRaw, ContentState } from 'draft-js'
import { Editor } from 'react-draft-wysiwyg'
import draftToHtml from 'draftjs-to-html'
import htmlToDraft from 'html-to-draftjs'
import { data } from 'stores'

class TextEditor extends Component {
  constructor(props) {
    super(props)
    this.state = {
      code: this.props.store.code,
      id: this.props.store.id,
      editorState: EditorState.createEmpty()
    }
  }
  componentWillMount() {
    data.child(`${this.state.code}/answers/${this.state.id}`).once('value').then(snap => {
      if(snap.hasChild('feedback') != '') {
        let textCont = snap.val().feedback
        const blocksFromHtml = htmlToDraft(textCont);
        const { contentBlocks, entityMap } = blocksFromHtml;
        const contentState = ContentState.createFromBlockArray(contentBlocks, entityMap);
        const editorState = EditorState.createWithContent(contentState);
        this.state = {
          code: this.state.code,
          id: this.state.id,
          editorState
        }
      }
    })
  }    
  componentWillUnmount() {
    let textCont = draftToHtml(convertToRaw(this.state.editorState.getCurrentContent()))
    data.child(`${this.state.code}/answers/${this.state.id}`).update({
      feedback:textCont, date:(new Date()).toLocaleString()
    })
  }
  onEditorStateChange = (editorState) => {
    this.setState({
      code: this.state.code,
      id: this.state.id,
      editorState
    })
  }
  render() {
    const { editorState } = this.state;
    return (
      <div class="row">
        <div class="col-sm-12">
          <Editor
              editorState={editorState}
              wrapperClassName="demo-wrapper"
              editorClassName="demo-editor"
              onEditorStateChange={this.onEditorStateChange}
            />
        </div>
        <textarea disabled value={draftToHtml(convertToRaw(editorState.getCurrentContent()))} class="col-md-12 hidden" />
      </div>
    )
  }
}

export default TextEditor