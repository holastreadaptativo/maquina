import React, { Component } from 'react'
import { Input, Item, Select, Editor/*, Switch*/ } from 'components'
import * as numeracion from 'actions'
import { COLORS } from 'stores'
import $ from 'actions'

export default class Transportador extends Component {
  constructor(props) {
    super(props)
    this.state = props.push ? { 
      active:0,
      // Estilos
      fontFamily: 'Larke Neue Thin', fontSize: 16, fontColor: 'red', primaryBgColor: 'gray', primaryColor: 'blue',
      // General
      transpType: '180°',
      // Ángulos
      anguloA: '15', anguloB: '75',
      // Ángulo interno
      angIntSentido: 'no', nombreAnguloInt: 'A',
      // Ángulo externo
      angExtSentido: 'no', nombreAnguloExt: 'B'
    } : props.params
  }
  componentDidUpdate() {
    numeracion.transportador({ container:$('container'), params:this.state, variables:this.props.variables, vt:true })
  }
  render() {
    const { transpType } = this.state
    let k = 0, tipoTranspOpc = ['180°', '360°'], sentidoAngOpc = ['no', 'horario', 'antihorario']
    return (
      <Editor params={this.state} store={this.props} parent={this}>
        <Item id={k++} title="General" parent={this}>
          <Select id="transpType" prefix="tipo" options={tipoTranspOpc} parent={this}/>
        </Item>
        <Item id={k++} title="Ángulos" parent={this}>
          <Input id="anguloA" prefix="ángulo ini" postfix="°" type="text" parent={this}/>	
          <Input id="anguloB" prefix="ángulo fin" postfix="°" type="text" parent={this}/>	
        </Item>
        <Item id={k++} title="Ángulo Interno" parent={this}>
          <Select id="angIntSentido" prefix="sentido" options={sentidoAngOpc} parent={this}/>
          <Input id="nombreAnguloInt" prefix="nombre" postfix="°" type="text" parent={this}/>	
        </Item>
        <Item id={k++} title="Ángulo Externo" parent={this} hide={transpType === '180°'}>
          <Select id="angExtSentido" prefix="sentido" options={sentidoAngOpc} parent={this}/>
          <Input id="nombreAnguloExt" prefix="nombre" type="text" parent={this}/>
        </Item>
      </Editor>
    )
  }
}