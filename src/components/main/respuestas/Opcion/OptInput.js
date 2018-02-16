import React, { Component } from 'react'

class OptInput extends Component {

  render() {
    let style = {
      optInput: {
        padding: '20px'
      }
    }
    return(
      <div class="row" style={style.optInput}>
        <div class="col-sm-12">
          <div class="">
            <h3>Agregar Input</h3>
          </div>
        </div>
        <div class="col-sm-12">
          <form class="form-inline">
            <div class="form-group">
              <label>Selecciona el tipo</label>
              <select class="form-control" style={{margin: '0 10px'}}>
                <option value="0">Selecciona el tipo</option>
                <optgroup label="Número">
                  <option value="1">Entero</option>
                  <option value="2">Decimal</option>
                  <option value="3">Mixto</option>
                  <option value="4">Fracción</option>
                </optgroup>
                <optgroup label="Otro">
                  <option value="5">Texto</option>
                  <option value="6">Alfanumérico</option>
                </optgroup>
              </select>
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

export default OptInput