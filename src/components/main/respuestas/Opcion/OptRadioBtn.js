import React, { Component } from 'react'

class OptRadioBtn extends Component {

  render() {
    let style = {
      optRadioBtn: {
        padding: '20px'
      }
    }
    return(
      <div class="row" style={style.optRadioBtn}>
        <div class="col-sm-12">
          <div class="">
            <h3>Agregar Radio Buttons</h3>
          </div>
        </div>
        <div class="col-sm-12">
          <form class="form-inline">
            <div class="form-group">
              <label>Cantidad de Opciones</label>
              <input class="form-control" defaultValue="4" type="number" required style={{margin: '0 10px', width: '60px'}}/>
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

export default OptRadioBtn;