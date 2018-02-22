import React, { Component } from 'react'
import EditorConvertToHTML from './EditorConvertToHTML'


class OptTexto extends Component {

  render() {
    let style = {
      optText: {
        padding: '20px'
      },
      vertMarginCont: {
        margin: '10px 0'
      }
    }
    return(
      <div class="row" style={style.optText}>
        <div class="col-sm-12" style={style.vertMarginCont}>
          <div class="">
            <h3>Agregar Texto</h3>
          </div>
          <form class="">
            <div class="form-group">
              <EditorConvertToHTML code={this.props.code} />
            </div>
          </form>
        </div>
      </div>
    )
  }

}
//<textarea  id="OptTextInput" class="form-control" rows="2" type="text"/>

export default OptTexto;