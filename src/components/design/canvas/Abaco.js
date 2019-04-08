import React from 'react'
import { Input, Item, Select, Editor/*, Switch*/ } from 'components' // Editor => '../../editor/index'
import * as acciones from 'actions'
import $ from 'actions'
import { pick } from 'lodash';

export default class Abaco extends React.Component {
  constructor(props) {
    super(props)
    this.state = props.push ? { 
      active:0,
      datos:[],
      valores:[],
      _altoCanvas:'200',
      _anchoCanvas:'500',
    } : props.params;
  }
  componentDidUpdate() {
    acciones.abaco({ container:$('container'), params:this.state, variables:this.props.variables, vt:true })
  }

  handleAgregarElemento = () => {
    this.setState((state,props) => { 
      state.datos.push({
        tipo: 'abaco',
        unidad: '0',
        decena: '0',
        centena: '0',
        numComp: '0',
        esAgrupado: 'no',
        grupos: '0',
        agrupar:'no',
        numerosArriba: 'no',
        agruparCanje: 'no'
      });
      return { datos: state.datos }
    });
  }

  getObjectProperties = (valor) => {
    let propiedades;
    switch(valor) {
      case 'abaco':
        propiedades = {
          tipo: 'abaco',
          altoImg:'',
          unidad:'0',
          decena:'0',
          centena:'0',
          numComp:'',
          esAgrupado:'no',
          grupos:'0',
          agrupar:'no',
          numerosArriba:'no',
          agruparCanje:'no'
        };
        break;
      case 'imagen':
        propiedades = {
          tipo: 'imagen',
          src:'',
          altoImg:'',
          texto1:'',
          texto2:'',
          texto3:'',
          texto4:'',
          yTexto1:'',
          yTexto2:'',
          yTexto3:'',
          yTexto4:'',
          altoTexto:'',
          colorTexto:'#000'
        };
        break;
      case 'texto':
        propiedades = {
          tipo: 'texto',
          texto1:'',
          texto2:'',
          texto3:'',
          texto4:'',
          yTexto1:'',
          yTexto2:'',
          yTexto3:'',
          yTexto4:'',
          altoTexto:'',
          colorTexto:'#000'
        };
        break;
    }
    return propiedades;
  }

  handleChangePropiedad = (posicionArray, propiedad, valor) => {
    this.setState((state, props) => {
      if(propiedad === 'tipo') {
        state.datos[posicionArray] = this.getObjectProperties(valor);
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
  render() {
    const {
      datos,
      _anchoCanvas,
      _altoCanvas
    } = this.state;
    let k = 0;
    console.log(datos);
    const grid = ["1","2","3","4","5","6","7","8","9","10","11","12"];
    return (
      <Editor params={this.state} store={this.props} parent={this}>
        <Item id={k++} title="General" parent={this}>
          <Input id="_anchoCanvas" prefix="Ancho Canvas" parent={this} value={_anchoCanvas}/>
          <Input id="_altoCanvas" prefix="Alto Canvas" parent={this} value={_altoCanvas}/>
        </Item>
        {datos.map((dato, index) => <Item id={k++} key={index} title={`Objeto ${index+1}`} parent={this}>
          <div class="form-config">
            <div class="input-group">
              <span class="input-group-addon prefix">tipo</span>
              <select id="tipo" class="form-control select" value={dato.tipo} onChange={(event) => this.handleChangePropiedad(index, event.target.id, event.target.value)}>
                <option value="abaco">abaco</option>
                <option value="imagen">imagen</option>
                <option value="texto">texto</option>
              </select>
            </div>
            {dato.tipo === 'abaco' &&
              <div>
                <div class="input-group">
                  <span class="input-group-addon prefix">altoImg</span>
                  <input id="altoImg" type="text" class="form-control" value={dato.altoImg} onChange={(event) => this.handleChangePropiedad(index, event.target.id, event.target.value)}/>
                </div>
                {dato.numComp === '0' && 
                  <div class="input-group">
                    <span class="input-group-addon prefix">unidad</span>
                    <input id="unidad" type="text" class="form-control" value={dato.unidad} onChange={(event) => this.handleChangePropiedad(index, event.target.id, event.target.value)}/>
                  </div> 
                }
                {dato.numComp === '0' && 
                  <div class="input-group">
                    <span class="input-group-addon prefix">decena</span>
                    <input id="decena" type="text" class="form-control" value={dato.decena} onChange={(event) => this.handleChangePropiedad(index, event.target.id, event.target.value)}/>
                  </div> 
                }
                {dato.numComp === '0' && 
                  <div class="input-group">
                    <span class="input-group-addon prefix">centena</span>
                    <input id="centena" type="text" class="form-control" value={dato.centena} onChange={(event) => this.handleChangePropiedad(index, event.target.id, event.target.value)}/>
                  </div> 
                }
                {(dato.unidad === '0' && dato.decena === '0' && dato.centena === '0') && 
                  <div class="input-group">
                    <span class="input-group-addon prefix">numComp</span>
                    <input id="numComp" type="text" class="form-control" value={dato.numComp} onChange={(event) => this.handleChangePropiedad(index, event.target.id, event.target.value)}/>
                  </div> 
                }
                <div class="input-group">
                  <span class="input-group-addon prefix">agrupado</span>
                  <select id="esAgrupado" class="form-control select" value={dato.esAgrupado} onChange={(event) => this.handleChangePropiedad(index, event.target.id, event.target.value)}>
                    <option value="no">no</option>
                    <option value="si">si</option>
                  </select>
                </div>
                {dato.esAgrupado === 'si' && 
                  <div class="input-group">
                    <span class="input-group-addon prefix">grupos</span>
                    <input id="grupos" type="text" class="form-control" value={dato.grupos} onChange={(event) => this.handleChangePropiedad(index, event.target.id, event.target.value)}/>
                  </div>
                }
                {dato.esAgrupado === 'si' &&
                  <div class="input-group">
                    <span class="input-group-addon prefix">agrupar</span>
                    <select id="agrupar" class="form-control select" value={dato.agrupar} onChange={(event) => this.handleChangePropiedad(index, event.target.id, event.target.value)}>
                      <option value="no">no</option>
                      <option value="si">si</option>
                    </select>
                  </div>
                }
                <div class="input-group">
                  <span class="input-group-addon prefix">num arriba</span>
                  <select id="numerosArriba" class="form-control select" value={dato.numerosArriba} onChange={(event) => this.handleChangePropiedad(index, event.target.id, event.target.value)}>
                    <option value="no">no</option>
                    <option value="si">si</option>
                  </select>
                </div>
                {dato.numerosArriba === 'no' && 
                  <div class="input-group">
                    <span class="input-group-addon prefix">agr Canje</span>
                    <select id="agruparCanje" class="form-control select" value={dato.agruparCanje} onChange={(event) => this.handleChangePropiedad(index, event.target.id, event.target.value)}>
                      <option value="no">no</option>
                      <option value="si">si</option>
                    </select>
                  </div>
                }
              </div>
            }
            {dato.tipo === 'imagen' && 
              <div>
                <div class="input-group">
                  <span class="input-group-addon prefix">src</span>
                  <input id="src" type="text" class="form-control" value={dato.src} onChange={(event) => this.handleChangePropiedad(index, event.target.id, event.target.value)}/>
                </div>
                <div class="input-group">
                  <span class="input-group-addon prefix">altoImg</span>
                  <input id="altoImg" type="text" class="form-control" value={dato.altoImg} onChange={(event) => this.handleChangePropiedad(index, event.target.id, event.target.value)}/>
                </div>
                <div class="input-group">
                  <span class="input-group-addon prefix">texto1</span>
                  <input id="texto1" type="text" class="form-control" value={dato.texto1} onChange={(event) => this.handleChangePropiedad(index, event.target.id, event.target.value)}/>
                </div>
                <div class="input-group">
                  <span class="input-group-addon prefix">yTexto1</span>
                  <input id="yTexto1" type="text" class="form-control" value={dato.yTexto1} onChange={(event) => this.handleChangePropiedad(index, event.target.id, event.target.value)}/>
                </div>
                <div class="input-group">
                  <span class="input-group-addon prefix">texto2</span>
                  <input id="texto2" type="text" class="form-control" value={dato.texto2} onChange={(event) => this.handleChangePropiedad(index, event.target.id, event.target.value)}/>
                </div>
                <div class="input-group">
                  <span class="input-group-addon prefix">yTexto2</span>
                  <input id="yTexto2" type="text" class="form-control" value={dato.yTexto2} onChange={(event) => this.handleChangePropiedad(index, event.target.id, event.target.value)}/>
                </div>
                <div class="input-group">
                  <span class="input-group-addon prefix">texto3</span>
                  <input id="texto3" type="text" class="form-control" value={dato.texto3} onChange={(event) => this.handleChangePropiedad(index, event.target.id, event.target.value)}/>
                </div>
                <div class="input-group">
                  <span class="input-group-addon prefix">yTexto3</span>
                  <input id="yTexto3" type="text" class="form-control" value={dato.yTexto3} onChange={(event) => this.handleChangePropiedad(index, event.target.id, event.target.value)}/>
                </div>
                <div class="input-group">
                  <span class="input-group-addon prefix">texto4</span>
                  <input id="texto4" type="text" class="form-control" value={dato.texto4} onChange={(event) => this.handleChangePropiedad(index, event.target.id, event.target.value)}/>
                </div>
                <div class="input-group">
                  <span class="input-group-addon prefix">yTexto4</span>
                  <input id="yTexto4" type="text" class="form-control" value={dato.yTexto4} onChange={(event) => this.handleChangePropiedad(index, event.target.id, event.target.value)}/>
                </div>
                <div class="input-group">
                  <span class="input-group-addon prefix">altoTexto</span>
                  <input id="altoTexto" type="text" class="form-control" value={dato.altoTexto} onChange={(event) => this.handleChangePropiedad(index, event.target.id, event.target.value)}/>
                </div>
                <div class="input-group">
                  <span class="input-group-addon prefix">colorTexto</span>
                  <input id="colorTexto" type="text" class="form-control" value={dato.colorTexto} onChange={(event) => this.handleChangePropiedad(index, event.target.id, event.target.value)}/>
                </div>
              </div>
            }
            {dato.tipo === 'texto' && 
              <div>
                <div class="input-group">
                  <span class="input-group-addon prefix">texto1</span>
                  <input id="texto1" type="text" class="form-control" value={dato.texto1} onChange={(event) => this.handleChangePropiedad(index, event.target.id, event.target.value)}/>
                </div>
                <div class="input-group">
                  <span class="input-group-addon prefix">yTexto1</span>
                  <input id="yTexto1" type="text" class="form-control" value={dato.yTexto1} onChange={(event) => this.handleChangePropiedad(index, event.target.id, event.target.value)}/>
                </div>
                <div class="input-group">
                  <span class="input-group-addon prefix">texto2</span>
                  <input id="texto2" type="text" class="form-control" value={dato.texto2} onChange={(event) => this.handleChangePropiedad(index, event.target.id, event.target.value)}/>
                </div>
                <div class="input-group">
                  <span class="input-group-addon prefix">yTexto2</span>
                  <input id="yTexto2" type="text" class="form-control" value={dato.yTexto2} onChange={(event) => this.handleChangePropiedad(index, event.target.id, event.target.value)}/>
                </div>
                <div class="input-group">
                  <span class="input-group-addon prefix">texto3</span>
                  <input id="texto3" type="text" class="form-control" value={dato.texto3} onChange={(event) => this.handleChangePropiedad(index, event.target.id, event.target.value)}/>
                </div>
                <div class="input-group">
                  <span class="input-group-addon prefix">yTexto3</span>
                  <input id="yTexto3" type="text" class="form-control" value={dato.yTexto3} onChange={(event) => this.handleChangePropiedad(index, event.target.id, event.target.value)}/>
                </div>
                <div class="input-group">
                  <span class="input-group-addon prefix">texto4</span>
                  <input id="texto4" type="text" class="form-control" value={dato.texto4} onChange={(event) => this.handleChangePropiedad(index, event.target.id, event.target.value)}/>
                </div>
                <div class="input-group">
                  <span class="input-group-addon prefix">yTexto4</span>
                  <input id="yTexto4" type="text" class="form-control" value={dato.yTexto4} onChange={(event) => this.handleChangePropiedad(index, event.target.id, event.target.value)}/>
                </div>
                <div class="input-group">
                  <span class="input-group-addon prefix">altoTexto</span>
                  <input id="altoTexto" type="text" class="form-control" value={dato.altoTexto} onChange={(event) => this.handleChangePropiedad(index, event.target.id, event.target.value)}/>
                </div>
                <div class="input-group">
                  <span class="input-group-addon prefix">colorTexto</span>
                  <input id="colorTexto" type="text" class="form-control" value={dato.colorTexto} onChange={(event) => this.handleChangePropiedad(index, event.target.id, event.target.value)}/>
                </div>
              </div>
            }
            <button class="btn btn-primary" onClick={(event) => this.handleDeleteElement(index)}>Eliminar</button>
          </div>
        </Item>)}
        <button class="btn btn-block " onClick={this.handleAgregarElemento}>Agregar</button>
        { this.props.section === 'answers' && 
          <Item id="k++" title="Valores Respuesta" parent={this}>
            <Input id="errFrec" prefix="Error Frecte." type="text" parent={this} value={this.state.errFrec} />
            <Input id="feed" prefix="Feedback" type="text" parent={this} value={this.state.feed} />
            <Input id="textoOpcion" prefix="Texto Opcion" type="text" parent={this} value={this.state.textoOpcion} />
            <Select id="col" prefix="Ancho Mobil" parent={this} value={this.state.col} options={grid}/>
            <Select id="colsm" prefix="Ancho Tablet" parent={this} value={this.state.colsm} options={grid}/>
            <Select id="colmd" prefix="Ancho Escritorio" parent={this} value={this.state.colmd} options={grid}/>
          </Item> 
        }
      </Editor>
    );
  }
}