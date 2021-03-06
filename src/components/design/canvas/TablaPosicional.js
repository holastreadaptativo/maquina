import React from 'react'
import { Item, Select, Editor/*, Switch*/ } from 'components' // Editor => '../../editor/index'
import * as acciones from 'actions'
import $ from 'actions'

export default class TablaPosicional extends React.Component {
  constructor(props) {
    super(props)
    this.state = props.push ? { 
      active:0,
      _umil:'a',
      _centena:'a',
      _decena:'a',
      _unidad:'a',
      _miles:'a',
      _centenas:'a',
      _decenas:'a',
      _numero:'a'
    } : props.params;
  }
  componentDidUpdate() {
    acciones.tablaPosicional({ container:$('container'), params:this.state, variables:this.props.variables, vt:true })
  }
  render() {
    const {
      _umil,
      _centena,
      _decena,
      _unidad,
      _miles,
      _centenas,
      _decenas,
      _numero
    } = this.state;
    const { variables } = this.props;
    var vars = variables.map(item => { 
      return item.var
    });
    vars = ['Seleccione'].concat(vars);
    let k = 0;
    return (
      <Editor params={this.state} store={this.props} parent={this}>
        <Item id={k++} title="General" parent={this}>
          <Select id="_umil" prefix="Unidad de Mil" options={vars} parent={this} value={_umil}/>
          <Select id="_centena" prefix="Centena" options={vars} parent={this} value={_centena}/>
          <Select id="_decena" prefix="Decena" options={vars} parent={this} value={_decena}/>
          <Select id="_unidad" prefix="Unidad" options={vars} parent={this} value={_unidad}/>
          <Select id="_miles" prefix="Miles" options={vars} parent={this} value={_miles}/>
          <Select id="_centenas" prefix="Centenas" options={vars} parent={this} value={_centenas}/>
          <Select id="_decenas" prefix="Decenas" options={vars} parent={this} value={_decenas}/>
          <Select id="_numero" prefix="Numero" options={vars} parent={this} value={_numero}/>
        </Item>
      </Editor>
    );
  }
}