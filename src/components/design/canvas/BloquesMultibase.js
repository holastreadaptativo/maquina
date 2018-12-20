import React from 'react';
import { Input, Item, Select, Editor/*, Switch*/ } from 'components'; // Editor => '../../editor/index'
import * as acciones from 'actions';
import $ from 'actions';

export default class BloquesMultibase extends React.Component {
  constructor(props) {
    super(props);
    this.state = props.push ? { 
      active:0,
      _separacion:'10',
      _heightWidthMiles:'130',
      _heightWidthCentenas:'100',
      _heightWidthUnidades:'20',
      _miles:'Seleccione',
      _centenas:'Seleccione',
      _decenas:'Seleccione',
      _unidades:'Seleccione'
    } : props.params;
  }

  componentDidUpdate() {
    acciones.bloquesMultibase({ container:$('container'), params:this.state, variables:this.props.variables, vt:true })
  }

  render() {
    const { 
      _separacion,
      _heightWidthMiles,
      _heightWidthCentenas,
      _heightWidthUnidades,
      _miles,
      _centenas,
      _decenas,
      _unidades
    } = this.props;
    const { variables } = this.props;
    var vars = variables.map(item => { 
      return item.var
    });
    vars = ['Seleccione'].concat(vars);
    let k = 0;
    return (
      <Editor params={this.state} store={this.props} parent={this}>
        <Item id={k++} title="General" parent={this}>
          <Select id="_miles" prefix="Miles" options={vars} parent={this} value={_miles}/>
          <Select id="_centenas" prefix="Centenas" options={vars} parent={this} value={_centenas}/>
          <Select id="_decenas" prefix="Decenas" options={vars} parent={this} value={_decenas}/>
          <Select id="_unidades" prefix="Unidad" options={vars} parent={this} value={_unidades}/>
        </Item>
        <Item id={k++} title="Dimension" parent={this}>
          <Input id="_separacion" prefix="Separacion" parent={this} value={_separacion}/>
          <Input id="_heightWidthMiles" prefix="Tamaño Miles" parent={this} value={_heightWidthMiles}/>
          <Input id="_heightWidthCentenas" prefix="Tamaño Centenas" parent={this} value={_heightWidthCentenas}/>
          <Input id="_heightWidthUnidades" prefix="Tamaño Unidades" parent={this} value={_heightWidthUnidades}/>
        </Item>
      </Editor>
    );
  }

}