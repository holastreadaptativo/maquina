import React, { Component } from 'react'
import OptTextChild from './OptTextChild'

class OptTexto extends Component {

  constructor() {
    super()
    let textArr = []
    this.state = {
      textArr: textArr
    }
  }

  delText(id) {
    let newTextArr = this.state.textArr
    newTextArr.splice(id,1)
    this.setState({
      textArr: newTextArr
    })
  }
  
  handleAddClick(e) {
    e.preventDefault()
    let text = document.querySelector('#OptTextInput').value
    if (text != '') {
      let textArr = this.state.textArr
      textArr.push(text)
      this.setState({
        textArr: textArr
      })
    }
    document.querySelector('#OptTextInput').value = ''
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
    const { textArr, delText } = this.state
    return(
      <div class="row" style={style.optText}>
        <div class="col-sm-12" style={style.vertMarginCont}>
          <div class="">
            <h3>Agregar Texto</h3>
          </div>
          <form class="">
            <div class="form-group">
              <label>Insertar texto:</label>
              <textarea  id="OptTextInput" class="form-control" rows="2" type="text"/>
            </div>
            <button onClick={(e) => this.handleAddClick(e)} class="btn btn-default">Agregar</button>
          </form>
        </div>
        <div id="addTextCont" class="col-sm-12" style={style.vertMarginCont}>
          {
            textArr.map( (text,index) => {
              return <OptTextChild key={index} index={index} text={text} delText={(id) => this.delText(id)} />
            })
          }
        </div>
        <div class="col-sm-12" style={style.optText}>
          <button onClick={(e) => e.preventDefault()} class="btn btn-success">Enviar</button>
        </div>
      </div>
    )
  }

}

export default OptTexto;