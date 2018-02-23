import React, { Component } from 'react'
import { EditorState, convertToRaw, ContentState } from 'draft-js'
import { Editor } from 'react-draft-wysiwyg'
import draftToHtml from 'draftjs-to-html'
import htmlToDraft from 'html-to-draftjs'
import { Save } from 'components'

class InsertarTexto extends Component {
  constructor(props) {
    super(props)
    if (!props.params) {
			this.state = {
        editorState: EditorState.createEmpty(),
        getText: ''
      }
		} else {
      const { contentBlocks, entityMap } = htmlToDraft(props.params.textCont);
      const contentState = ContentState.createFromBlockArray(contentBlocks, entityMap);
      const editorState = EditorState.createWithContent(contentState);
      this.state = {
        editorState,
        getText: draftToHtml(convertToRaw(editorState.getCurrentContent()))
      }
		}
  }

  onEditorStateChange = (editorState) => {
    this.setState({
      editorState,
      getText: draftToHtml(convertToRaw(editorState.getCurrentContent()))
    })
    let textCont = draftToHtml(convertToRaw(editorState.getCurrentContent()))
    console.log(textCont)
    //this.props.contUpdate(textCont)
  }

  render() {
    const { editorState, getText } = this.state;
    return (
      <div class="modal-canvas modal-general">
        <div class="col-sm-12">
          <h4 class="modal-title" style={{margin: 'auto 0'}}>Insertar Texto</h4>
          <div class="row">
            <div class="col-sm-12">
              <Editor
                editorState={editorState}
                wrapperClassName="demo-wrapper"
                editorClassName="demo-editor"
                onEditorStateChange={this.onEditorStateChange}
              />
            </div>
            <textarea disabled value={draftToHtml(convertToRaw(editorState.getCurrentContent()))} class="col-md-12" />
          </div>
        </div>
        <Save {...this.props} params={this.state}/>
      </div>


    )
  }
}

export default InsertarTexto