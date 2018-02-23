import React, { Component } from 'react'

class OptComboBox extends Component {

  render() {
    let style = {
      optCombo: {
        padding: '20px'
      }
    }
    return(
      <div class="row" style={style.optCombo}>
        <div class="col-sm-12">
          <div class="">
            <h3>Agregar ComboBox</h3>
          </div>
        </div>
        <div class="col-sm-12">
          <form class="form-inline">
            <div class="form-group">
              <label>Cantidad de Opciones</label>
              <input class="form-control" defaultValue="3" type="number" required style={{margin: '0 10px', width: '60px'}}/>
            </div>
            <button onClick={(e) => e.preventDefault()} class="btn btn-default">Agregar</button>
          </form>
        </div>
        <div class="col-sm-12" style={style.optInput}>
          <button onClick={(e) => e.preventDefault()} class="btn btn-success">Enviar</button>
        </div>
      </div>
    )
  }

}

export default OptComboBox;