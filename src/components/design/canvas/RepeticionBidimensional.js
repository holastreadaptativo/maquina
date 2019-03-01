import React from 'react'
import { Input, Item, Select, Editor/*, Switch*/ } from 'components' // Editor => '../../editor/index'
import * as acciones from 'actions'
import $ from 'actions'

export default class RepeticionBidimensional extends React.Component {
  constructor(props) {
    super(props)
    this.state = props.push ? { 
      active:0,
      datos:[],
      errFrec: "", feed: ""} : props.params;
  }
  componentDidUpdate() {
    acciones.repeticionBidimensional({ container:$('container'), params:this.state, variables:this.props.variables, vt:true })
  }

  handleAgregarElemento = () => {
    this.setState((state,props) => { 
      state.datos.push({
        src: '',
        imagen: undefined,
        repX: 0,
        repY: 0,
        textoEjeX: '',
        textoEjeY: '',
        opcion: '',
        altoImagen: 0,
        anchoImagen: 0,
        separacion: 0,
        tipo: 'arreglo'
      });
      return { datos: state.datos }
    });
  }

  handleChangePropiedad = (posicionArray, propiedad, valor) => {
    this.setState((state, props) => ({ datos: state.datos.map((dato, index) => {
      console.log(state.datos);
      if(index === posicionArray) {
        return {
          ...dato,
          [propiedad]: valor
        }
      } else {
        return dato;
      }
    })}));
  }

  render() {
    const {
      datos
    } = this.state;
    let k = 0;
    console.log(datos);
    const grid = ["1","2","3","4","5","6","7","8","9","10","11","12"];
    return (
      <Editor params={this.state} store={this.props} parent={this}>
        {datos.map((dato, index) => <Item id={k++} key={index} title={`Objeto ${index+1}`} parent={this}>
          <div class="form-config">
            <div class="input-group">
              <span class="input-group-addon prefix">Tipo</span>
              <select id="tipo" class="form-control select" value={dato.tipo} onChange={(event) => this.handleChangePropiedad(index, event.target.id, event.target.value)}>
                <option value="arreglo">Arreglo</option>
                <option value="imagen">Imagen</option>
                <option value="texto">texto</option>
              </select>
            </div>
            <div class="input-group">
              <span class="input-group-addon prefix">Src</span>
              <input id="src" type="text" class="form-control" value={dato.src} onChange={(event) => this.handleChangePropiedad(index, event.target.id, event.target.value)}/>
            </div>
            <div class="input-group">
              <span class="input-group-addon prefix">Separacion</span>
              <input id="separacion" type="number" class="form-control" value={dato.separacion} onChange={(event) => this.handleChangePropiedad(index, event.target.id, event.target.value)}/>
            </div>
          </div>
        </Item>)}
        <button class="btn btn-block " onClick={this.handleAgregarElemento}>Agregar</button>
        { this.props.section === 'answers' && <Item id="k++" title="Valores Respuesta" parent={this}>
          <Input id="errFrec" prefix="Error Frecte." type="text" parent={this} value={this.state.errFrec} />
          <Input id="feed" prefix="Feedback" type="text" parent={this} value={this.state.feed} />
          <Select id="col" prefix="Ancho Mobil" parent={this} value={this.state.col} options={grid}/>
					<Select id="colsm" prefix="Ancho Tablet" parent={this} value={this.state.colsm} options={grid}/>
					<Select id="colmd" prefix="Ancho Escritorio" parent={this} value={this.state.colmd} options={grid}/>
        </Item> }
        
      </Editor>
    );
  }
}