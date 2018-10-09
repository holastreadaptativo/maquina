import React, { Component } from 'react'
import { Input, Item, Select, Editor/*, Switch*/ } from 'components'
import * as acciones from 'actions'
import { COLORS } from 'stores'
import $ from 'actions'

export default class AreaCuadrado extends Component {
  constructor(props) {
    super(props)
    this.state = props.push ? { 
      active:0,
      cuadros: this.props.vt ? this.props.vt.vars[0].val : 4,
      perimetro: this.props.vt ? this.props.vt.vars[1].val : 20,
      canvas: 500
    } : props.params;
  }
  componentDidUpdate() {
    acciones.areaCuadrada({ container:$('container'), params:this.state, variables:this.props.variables, vt:true });
  }
  render() {
    let k = 0;
    return (
      <Editor params={this.state} store={this.props} parent={this}>
        <Item id={k++} title="Hora" parent={this}>
          <Input id="cuadros" type="number" prefix="Cuadros" parent={this} value={this.state.cuadros} />
          <Input id="perimetro" type="number" prefix="Perimetro" parent={this} value={this.state.perimetro} />
          <Input id="canvas" type="number" prefix="Canvas" parent={this} value={this.state.canvas} />
        </Item>
      </Editor>
    );
  }
}