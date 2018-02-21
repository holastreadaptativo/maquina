import React, { Component } from 'react'

class OptTextChild extends Component {

  render() {
    const { index, text, delText } = this.props
    return(
      <div class="panel panel-primary">
        <div class="panel-heading">
          <p><span>Texto {index + 1} </span><span onClick={() => delText(index)} class="glyphicon glyphicon-trash" style={{cursor:'pointer'}}></span></p>
        </div>
        <div class="panel-body">
          <p>{text}</p>
        </div>
      </div>
    )
  }

}

export default OptTextChild;