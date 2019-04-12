import React from 'react'
import { Input, Item, Select, Editor/*, Switch*/ } from 'components' // Editor => '../../editor/index'
import * as acciones from 'actions'
import $ from 'actions'
import { pick } from 'lodash';

export default class MultiplicacionPictoricos extends React.Component {
  constructor(props) {
    super(props)
    this.state = props.push ? { 
      active:0,
      datos:[],
      valores:[],
      _separacion:'0',
      _sepImgs:'10',
      _altoCanvas:'200',
      _anchoCanvas:'500',
      _repeticiones:'0',
      _separar:'no',
      _mostrarValores:'no'
    } : props.params;
  }
  componentDidUpdate() {
    acciones.multiplicacionPic({ container:$('container'), params:this.state, variables:this.props.variables, vt:true })
  }

  handleAgregarElemento = () => {
    this.setState((state,props) => { 
      state.datos.push({
        src:'',
        alto:'0',
        formaRepeticion:'izqDer',
        cantidad: '0',
        tipoValorFinal:'texto',
        valorFinal:'',
        altoValorFinal:'',
        colorValorFinal:''
      });
      return { datos: state.datos }
    });
  }

  getObjectProperties = (valor) => {
    let propiedades;
    switch(valor) {
      case 'horVert':
        propiedades = { 
          srcVert: ''
        };
        break;
      case 'diagonal':
        propiedades = {
          separacionX: '0',
          separacionY: '0'
        };
        break;
      case 'izqDer':
        propiedades = {
          numeroX:'4'
        };
        break;
    }
    return propiedades;
  }

  handleChangePropiedad = (posicionArray, propiedad, valor) => {
    this.setState((state, props) => {
      console.log(state.datos);
      if(propiedad === 'formaRepeticion') {
        var elemento = pick(state.datos[posicionArray], ['src','alto','formaRepeticion','cantidad']);
        elemento = {
          ...elemento,
          ...this.getObjectProperties(valor),
          [propiedad]: valor
        }
        console.log(elemento);
        state.datos[posicionArray] = elemento;
      } else {
        state.datos[posicionArray] = {
          ...state.datos[posicionArray],
          [propiedad]: valor
        }
      }
      return { datos: state.datos };
    });
  }

  handleDeleteElement = (index) => {
    if(confirm("Seguro que desea eliminar el objeto?")) {
      this.setState((state, params) => {
        state.datos.splice(index, 1);
        return { datos: state.datos };
      });
    }
  }
//var _separacion = 40, _altoOpciones = 20;
  render() {
    const {
      datos,
      _anchoCanvas,
      _altoCanvas,
      _separar,
      _sepImgs,
      _separacion,
      _repeticiones,
      _mostrarValores
    } = this.state;
    let k = 0;
    console.log(datos);
    const grid = ["1","2","3","4","5","6","7","8","9","10","11","12"];
    return (
      <Editor params={this.state} store={this.props} parent={this}>
        <Item id={k++} title="General" parent={this}>
          <Input id="_anchoCanvas" prefix="Ancho Canvas" parent={this} value={_anchoCanvas}/>
          <Input id="_altoCanvas" prefix="Alto Canvas" parent={this} value={_altoCanvas}/>
          <Input id="_separacion" prefix="Sep Elem" parent={this} value={_separacion}/>
          <Input id="_sepImgs" prefix="Sep Imgs" parent={this} value={_sepImgs}/>
          <Input id="_repeticiones" prefix="Repeticiones" parent={this} value={_repeticiones}/>
          <Select id="_separar" prefix="Separar" parent={this} options={['no','si']} value={_separar} />
          <Select id="_mostrarValores" prefix="Valores" parent={this} options={['no','si']} value={_mostrarValores} />
        </Item>
        {datos.map((dato, index) => <Item id={k++} key={index} title={`Objeto ${index+1}`} parent={this}>
          <div class="form-config">
            <div class="input-group">
              <span class="input-group-addon prefix">Src</span>
              <input id="src" type="text" class="form-control" value={dato.src} onChange={(event) => this.handleChangePropiedad(index, event.target.id, event.target.value)}/>
            </div>
            <div class="input-group">
              <span class="input-group-addon prefix">Alto imagen</span>
              <input id="alto" type="number" class="form-control" value={dato.alto} onChange={(event) => this.handleChangePropiedad(index, event.target.id, event.target.value)}/>
            </div>
            <div class="input-group">
              <span class="input-group-addon prefix">Cantidad rep</span>
              <input id="cantidad" class="form-control" value={dato.cantidad} onChange={(event) => this.handleChangePropiedad(index, event.target.id, event.target.value)}/>
            </div>
            <div class="input-group">
              <span class="input-group-addon prefix">Forma repeticion</span>
              <select id="formaRepeticion" class="form-control select" value={dato.formaRepeticion} onChange={(event) => this.handleChangePropiedad(index, event.target.id, event.target.value)}>
                <option value="horVert">Hor/Vert</option>
                <option value="diagonal">Diagonal</option>
                <option value="izqDer">Izq/Der</option>
              </select>
            </div>
            { dato.formaRepeticion === 'horVert' &&
              <div class="input-group">
                <span class="input-group-addon prefix">Imagen Vertical</span>
                <input id="srcVert" type="text" class="form-control" value={dato.srcVert} onChange={(event) => this.handleChangePropiedad(index, event.target.id, event.target.value)}/>
              </div> }
            { dato.formaRepeticion === 'diagonal' &&
              <div class="input-group">
                <span class="input-group-addon prefix">Sep x</span>
                <input id="separacionX" type="number" class="form-control" value={dato.separacionX} onChange={(event) => this.handleChangePropiedad(index, event.target.id, event.target.value)}/>
              </div> }
            { dato.formaRepeticion === 'diagonal' &&
              <div class="input-group">
                <span class="input-group-addon prefix">Sep y</span>
                <input id="separacionY" type="number" class="form-control" value={dato.separacionY} onChange={(event) => this.handleChangePropiedad(index, event.target.id, event.target.value)}/>
              </div> }
            { dato.formaRepeticion === 'izqDer' &&
              <div class="input-group">
                <span class="input-group-addon prefix">Largo Fila</span>
                <input id="numeroX" type="number" class="form-control" value={dato.numeroX} onChange={(event) => this.handleChangePropiedad(index, event.target.id, event.target.value)}/>
              </div> }
            { _mostrarValores === 'si' &&
              <div class="input-group">
                <span class="input-group-addon prefix">Tipo Valor</span>
                <select id="tipoValorFinal" class="form-control select" value={dato.tipoValorFinal} onChange={(event) => this.handleChangePropiedad(index, event.target.id, event.target.value)}>
                  <option value="texto">texto</option>
                  <option value="imagen">imagen</option>
                </select>  
              </div> }
            { _mostrarValores === 'si' &&
              <div class="input-group">
                <span class="input-group-addon prefix">Valor</span>
                <input id="valorFinal" class="form-control" value={dato.valorFinal} onChange={(event) => this.handleChangePropiedad(index, event.target.id, event.target.value)}/>
              </div> }
            { _mostrarValores === 'si' &&
              <div class="input-group">
                <span class="input-group-addon prefix">Alto Valor</span>
                <input id="altoValorFinal" type="number" class="form-control" value={dato.altoValorFinal} onChange={(event) => this.handleChangePropiedad(index, event.target.id, event.target.value)}/>
              </div> }
            { _mostrarValores === 'si' &&
              <div class="input-group">
                <span class="input-group-addon prefix">Color Texto</span>
                <input id="colorValorFinal" class="form-control" value={dato.colorValorFinal} onChange={(event) => this.handleChangePropiedad(index, event.target.id, event.target.value)}/>
              </div> }
            <button class="btn btn-primary" onClick={(event) => this.handleDeleteElement(index)}>Eliminar</button>
          </div>
        </Item>)}

        <button class="btn btn-block " onClick={this.handleAgregarElemento}>Agregar</button>
        { this.props.section === 'answers' && <Item id="k++" title="Valores Respuesta" parent={this}>
					<Input id="errFrec" prefix="Error Frecte." type="text" parent={this} value={this.state.errFrec} />
					<Input id="feed" prefix="Feedback" type="text" parent={this} value={this.state.feed} />
					<Input id="textoOpcion" prefix="Texto Opcion" type="text" parent={this} value={this.state.textoOpcion} />
					<Select id="col" prefix="Ancho Mobil" parent={this} value={this.state.col} options={grid}/>
					<Select id="colsm" prefix="Ancho Tablet" parent={this} value={this.state.colsm} options={grid}/>
					<Select id="colmd" prefix="Ancho Escritorio" parent={this} value={this.state.colmd} options={grid}/>
				</Item> }
        
      </Editor>
    );
  }
}