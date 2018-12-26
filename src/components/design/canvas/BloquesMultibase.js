import React from 'react';
import { Input, Item, Select, Editor/*, Switch*/ } from 'components'; // Editor => '../../editor/index'
import * as acciones from 'actions';
import $ from 'actions';

export default class BloquesMultibase extends React.Component {
  constructor(props) {
    super(props);
    this.state = props.push ? { 
      active:0,
      _separacion:'15',
      _miles:'Seleccione',
      _heightWidthMiles:'130',
      _centenas:'Seleccione',
      _heightWidthCentenas:'100',
      _aumentoCentenas:'30',
      _decenas:'Seleccione',
      _unidades:'Seleccione',
      _heightWidthUnidades:'20',
      _aumentoUnidades:'15',
      _distribucion:'ordenado',
      _canvasWidth:'1800',
      _canvasHeight:'300'
    } : props.params;
  }

  componentDidUpdate() {
    acciones.bloquesMultibase({ container:$('container'), params:this.state, variables:this.props.variables, vt:true })
  }

  render() {
    const { 
      _separacion,
      _miles,
      _heightWidthMiles,
      _centenas,
      _heightWidthCentenas,
      _aumentoCentenas,
      _decenas,
      _unidades,
      _heightWidthUnidades,
      _aumentoUnidades,
      _distribucion,
      _canvasWidth,
      _canvasHeight
    } = this.props;
    const { variables } = this.props;
    var vars = variables.map(item => { 
      return item.var
    });
    vars = ['Seleccione'].concat(vars);
    let k = 0;
    var distribucion = ['en linea', 'ordenado'];
    return (
      <Editor params={this.state} store={this.props} parent={this}>
        <Item id={k++} title="General" parent={this}>
          <Select id="_miles" prefix="Miles" options={vars} parent={this} value={_miles}/>
          <Select id="_centenas" prefix="Centenas" options={vars} parent={this} value={_centenas}/>
          <Select id="_decenas" prefix="Decenas" options={vars} parent={this} value={_decenas}/>
          <Select id="_unidades" prefix="Unidad" options={vars} parent={this} value={_unidades}/>
          <Select id="_distribucion" prefix="Distribucion" options={distribucion} parent={this} value={_distribucion} />
        </Item>
        <Item id={k++} title="Dimension" parent={this}>
          <Input id="_separacion" prefix="Separacion" parent={this} value={_separacion}/>
          <Input id="_heightWidthMiles" prefix="Tamaño Miles" parent={this} value={_heightWidthMiles}/>
          <Input id="_heightWidthCentenas" prefix="Tamaño Centenas" parent={this} value={_heightWidthCentenas}/>
          <Input id="_heightWidthUnidades" prefix="Tamaño Unidades" parent={this} value={_heightWidthUnidades}/>
        </Item>
        <Item id={k++} title="Aumentos" parent={this}>
          <Input id="_aumentoCentenas" prefix="Amto Centenas" parent={this} value={_aumentoCentenas}/>
          <Input id="_aumentoUnidades" prefix="Amto Unidades" parent={this} value={_aumentoUnidades}/>
        </Item>
        <Item id={k++} title="Canvas" parent={this}>
          <Input id="_canvasWidth" prefix="Height" parent={this} value={_canvasWidth}/>
          <Input id="_canvasHeight" prefix="Width" parent={this} value={_canvasHeight}/>
        </Item>
      </Editor>
    );
  }

}