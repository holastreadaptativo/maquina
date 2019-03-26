import React from 'react'
import { Input, Item, Select, Editor/*, Switch*/ } from 'components' // Editor => '../../editor/index'
import * as acciones from 'actions'
import $ from 'actions'
import { pick } from 'lodash';

export default class RepeticionBidimensional extends React.Component {
  constructor(props) {
    super(props)
    this.state = props.push ? { 
      active:0,
      datos:[],
      _separacion:'40',
      _altoOpciones:'20',
      _anchoCanvas:'400',
      _altoCanvas:'200',
      errFrec: "", feed: ""} : props.params;
  }
  componentDidUpdate() {
    acciones.repeticionBidimensional({ container:$('container'), params:this.state, variables:this.props.variables, vt:true })
  }

  handleAgregarElemento = () => {
    this.setState((state,props) => { 
      state.datos.push({
        src: '',
        repX: 0,
        repY: 0,
        textoEjeX: '',
        textoEjeY: '',
        tipoOpcion: 'texto',
        opcion: '',
        altoOpcion: '20',
        colorTextoOpcion: '',
        altoImagen: 0,
        anchoImagen: 0,
        separacion: 0,
        tipo: 'arreglo'//arreglo, imagen, texto
      });
      return { datos: state.datos }
    });
  }

  getObjectProperties = (valor) => {
    let propiedades;
    switch(valor) {
      case 'texto':
        propiedades = { 
          nombreFuente: '',
          altoTexto: '',
          texto: '' 
        };
        break;
      case 'imagen':
        propiedades = {
          altoImagen: 0,
        };
        break;
      case 'arreglo':
        propiedades = {
          repX: 0,
          repY: 0,
          textoEjeX: '',
          textoEjeY: '',
          opcion: '',
          tipoOpcion: 'texto',
          altoOpcion: '20',
          colorTextoOpcion: '',
          altoImagen: 0,
        };
        break;
    }
    return propiedades;
  }

  handleChangePropiedad = (posicionArray, propiedad, valor) => {
    this.setState((state, props) => {
      console.log(state.datos);
      if(propiedad === 'tipo') {
        var elemento = pick(state.datos[posicionArray], ['src','separacion','tipo']);
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
      _separacion,
      _altoOpciones,
      _anchoCanvas,
      _altoCanvas,
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
          <Input id="_altoOpciones" prefix="Alto Opciones" parent={this} value={_altoOpciones}/>
        </Item>
        {datos.map((dato, index) => <Item id={k++} key={index} title={`Objeto ${index+1}`} parent={this}>
          <div class="form-config">
            <div class="input-group">
              <span class="input-group-addon prefix">Tipo</span>
              <select id="tipo" class="form-control select" value={dato.tipo} onChange={(event) => this.handleChangePropiedad(index, event.target.id, event.target.value)}>
                <option value="arreglo">Arreglo</option>
                <option value="imagen">Imagen</option>
                <option value="texto">Texto</option>
              </select>
            </div>
            <div class="input-group">
              <span class="input-group-addon prefix">Src</span>
              <input id="src" type="text" class="form-control" value={dato.src} onChange={(event) => this.handleChangePropiedad(index, event.target.id, event.target.value)}/>
            </div>
            { dato.tipo === 'arreglo' && <div class="input-group">
              <span class="input-group-addon prefix">Rep X</span>
              <input id="repX" type="text" class="form-control" value={dato.repX} onChange={(event) => this.handleChangePropiedad(index, event.target.id, event.target.value)}/>
            </div> }
            { dato.tipo === 'arreglo' && <div class="input-group">
              <span class="input-group-addon prefix">Rep Y</span>
              <input id="repY" type="text" class="form-control" value={dato.repY} onChange={(event) => this.handleChangePropiedad(index, event.target.id, event.target.value)}/>
            </div> }
            { dato.tipo === 'arreglo' && <div class="input-group">
              <span class="input-group-addon prefix">Texto Eje X</span>
              <input id="textoEjeX" type="text" class="form-control" value={dato.textoEjeX} onChange={(event) => this.handleChangePropiedad(index, event.target.id, event.target.value)}/>
            </div> }
            { dato.tipo === 'arreglo' && <div class="input-group">
              <span class="input-group-addon prefix">Texto Eje Y</span>
              <input id="textoEjeY" type="text" class="form-control" value={dato.textoEjeY} onChange={(event) => this.handleChangePropiedad(index, event.target.id, event.target.value)}/>
            </div> }
            { dato.tipo === 'arreglo' && <div class="input-group">
              <span class="input-group-addon prefix">Tipo opcion</span>
              <select id="tipoOpcion" class="form-control select" value={dato.tipoOpcion} onChange={(event) => this.handleChangePropiedad(index, event.target.id, event.target.value)}>
                <option value="texto">Texto</option>
                <option value="imagen">Imagen</option>
              </select>
            </div> }
            { dato.tipo === 'arreglo' && <div class="input-group">
              <span class="input-group-addon prefix">Opcion</span>
              <input id="opcion" type="text" class="form-control" value={dato.opcion} onChange={(event) => this.handleChangePropiedad(index, event.target.id, event.target.value)}/>
            </div> }
            { dato.tipo === 'arreglo' && <div class="input-group">
              <span class="input-group-addon prefix">Alto Opcion</span>
              <input id="altoOpcion" type="text" class="form-control" value={dato.altoOpcion} onChange={(event) => this.handleChangePropiedad(index, event.target.id, event.target.value)}/>
            </div> }
            { (dato.tipo === 'arreglo' && dato.tipoOpcion === 'texto') && <div class="input-group">
              <span class="input-group-addon prefix">Color texto</span>
              <input id="colorTextoOpcion" type="text" class="form-control" value={dato.colorTextoOpcion} onChange={(event) => this.handleChangePropiedad(index, event.target.id, event.target.value)}/>
            </div> }
            { (dato.tipo === 'arreglo' || dato.tipo === 'imagen') && <div class="input-group">
              <span class="input-group-addon prefix">Alto Imagen</span>
              <input id="altoImagen" type="text" class="form-control" value={dato.altoImagen} onChange={(event) => this.handleChangePropiedad(index, event.target.id, event.target.value)}/>
            </div> }
            { dato.tipo === 'texto' && <div class="input-group">
              <span class="input-group-addon prefix">Nombre Fuente</span>
              <input id="nombreFuente" type="text" class="form-control" value={dato.nombreFuente} onChange={(event) => this.handleChangePropiedad(index, event.target.id, event.target.value)}/>
            </div> }
            { dato.tipo === 'texto' && <div class="input-group">
              <span class="input-group-addon prefix">Alto Texto</span>
              <input id="altoTexto" type="text" class="form-control" value={dato.altoTexto} onChange={(event) => this.handleChangePropiedad(index, event.target.id, event.target.value)}/>
            </div> }
            { dato.tipo === 'texto' && <div class="input-group">
              <span class="input-group-addon prefix">Texto</span>
              <input id="texto" type="text" class="form-control" value={dato.texto} onChange={(event) => this.handleChangePropiedad(index, event.target.id, event.target.value)}/>
            </div> }
            <div class="input-group">
              <span class="input-group-addon prefix">Separacion</span>
              <input id="separacion" type="text" class="form-control" value={dato.separacion} onChange={(event) => this.handleChangePropiedad(index, event.target.id, event.target.value)}/>
            </div>
            <button class="btn btn-primary" onClick={(event) => this.handleDeleteElement(index)}>Eliminar</button>
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