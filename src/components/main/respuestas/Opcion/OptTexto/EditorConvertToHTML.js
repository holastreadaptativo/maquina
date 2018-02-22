import React, { Component } from 'react'
import { EditorState, convertToRaw, ContentState } from 'draft-js'
import { Editor } from 'react-draft-wysiwyg'
import draftToHtml from 'draftjs-to-html'
import htmlToDraft from 'html-to-draftjs'
import { data } from 'stores'

class EditorConvertToHTML extends Component {
  state = {
    editorState: EditorState.createEmpty()
  }

  onEditorStateChange = (editorState) => {
    this.setState({
      editorState
    })
  }

  handleSendClick(ev, elem) {
    ev.preventDefault()
    console.log(this.props.code)
    data.child(this.props.code + '/functions').push({text:elem})
  }

  render() {
    let style = {
      optText: {
        padding: '20px'
      },
      vertMarginCont: {
        margin: '10px 0'
      }
    }
    const { editorState } = this.state;
    let htmlContent = draftToHtml(convertToRaw(editorState.getCurrentContent()))
    
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
        <textarea disabled value={draftToHtml(convertToRaw(editorState.getCurrentContent()))} class="hidden" />
        <div class="col-sm-12" style={style.optText}>
          <button onClick={(e) => this.handleSendClick(e, htmlContent)} class="btn btn-success">Enviar</button>
        </div>
      </div>
    )
  }
}

export default EditorConvertToHTML