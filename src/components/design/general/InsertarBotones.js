import React, { Component } from 'react'
import { Editor } from 'components'

export default class InsertarBotones extends Component {
  constructor(props) {
    super(props)
    this.state = {
      background: ''
    }
  }

  render() {
    return(
      <Editor title="Insertar Botón" params={this.state} store={this.props}>
      <div>

      </div>
      </Editor>
    )
  }
}
