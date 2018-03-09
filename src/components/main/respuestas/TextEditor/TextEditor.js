import React, { Component } from 'react'
import { EditorState, convertToRaw, ContentState } from 'draft-js'
import { Editor } from 'react-draft-wysiwyg'
import draftToHtml from 'draftjs-to-html'
import htmlToDraft from 'html-to-draftjs'
//import { data } from 'stores'
//import * as insertText from 'actions'

class TextEditor extends Component {
  constructor(props) {
    super(props)
    this.state = {
      ...this.props,
      editorState: EditorState.createEmpty()
    }
    // if (props.textCont != '') {
    //   const blocksFromHtml = htmlToDraft(props.textCont);
    //   const { contentBlocks, entityMap } = blocksFromHtml;
    //   const contentState = ContentState.createFromBlockArray(contentBlocks, entityMap);
    //   const editorState = EditorState.createWithContent(contentState);
    //   this.state = {
    //     ...this.props,
    //     editorState
    //   }
    // }
  }

  // componentDidUpdate() {
	// 	//let canvas = this.refs.canvas
	// }

  onEditorStateChange = (editorState) => {
    this.setState({
      editorState
    })
    // let textCont = draftToHtml(convertToRaw(editorState.getCurrentContent()))
    // this.props.contUpdate(textCont)
  }

  render() {
    const { editorState } = this.state;
    return (
      <div class="row">
        <div class="col-sm-12">
          <h3 class="text-center">FeedBack del Ejercicio</h3>
          <div class="col-sm-12">
            <Editor
              editorState={editorState}
              wrapperClassName="demo-wrapper"
              editorClassName="demo-editor"
              onEditorStateChange={this.onEditorStateChange}
            />
          </div>
        </div>
        <textarea disabled value={draftToHtml(convertToRaw(editorState.getCurrentContent()))} class="col-md-12 hidden" />
      </div>
    )
  }
}

export default TextEditor