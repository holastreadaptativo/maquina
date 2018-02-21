import React, { Component } from 'react'

class OptImg extends Component {

  handleAddClick(e) {
    e.preventDefault()
    let imgSRC = document.querySelector('#OptImgInput').value
    if (imgSRC != '') {
      let img = new Image();
      img.src = imgSRC
      img.className = 'img-responsive img-thumbnail'
      let imgCont = document.createElement('DIV')
      imgCont.className = 'col-sm-4'
      imgCont.appendChild(img)
      let mainCont = document.querySelector('#addOptImgs')
      mainCont.appendChild(imgCont)
      document.querySelector('#OptImgInput').value = ''
    }
  }
  
  render() {
    let style = {
      optImg: {
        padding: '20px'
      },
      vertMarginCont: {
        margin: '10px 0'
      }
    }
    return(
      <div class="row" style={style.optImg}>
        <div class="col-sm-12" style={style.vertMarginCont}>
          <h3>Agregar Imagen</h3>
        </div>
        <div class="col-sm-12" style={style.vertMarginCont}>
          <form class="form-inline">
            <div class="form-group">
              <label>Instertar URL Imagen</label>
              <input id="OptImgInput" style={{margin: '0 10px', width: '350px'}} class="form-control" type="text" placeholder="http://adaptativamente.cl/imagen1.jpg" />
            </div>
            <button onClick={(e) => this.handleAddClick(e)} class="btn btn-default">Agregar</button>
          </form>
        </div>
        <div class="col-sm-12" style={style.vertMarginCont}>
          <div id="addOptImgs" class="row">
          </div>
        </div>
        <div class="col-sm-12" style={style.vertMarginCont}>
          <button onClick={(e) => e.preventDefault()} class="btn btn-success">Enviar</button>
        </div>
      </div>
    )
  }

}

export default OptImg;