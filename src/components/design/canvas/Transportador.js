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
      fontFamily: 'Larke Neue Thin',
      fontSize: 16,
      fontColor: '',
      elBackgroundColor: '',
      elColor: '',
      // General
      transpType: '180°',
      anguloA: '15',
      anguloB: '75',
      angIntSentido: 'no',
      nombreAnguloInt: 'A',
      angExtDesde: '0°',
      angExtSentido: 'no',
      nombreAnguloExt: 'A',
    } : props.params
  }
  componentDidUpdate() {
    numeracion.transportador({ container:$('container'), params:this.state, variables:this.props.variables, vt:true })
  }
  render() {
    const { transpType } = this.state
    let k = 0, tipoTranspOpc = ['180°', '360°'], siNoOpc = ['si', 'no'], sentidoAngOpc = ['no', 'horario', 'antihorario'],
        sentidoAngExt180 = ['0°', '180°']
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
        <Item id={k++} title="Ángulo Externo" parent={this}>
          <Select id="angExtDesde" prefix="ángulo" options={sentidoAngExt180} parent={this} hide={transpType !== '180°'}/>
          <Select id="angExtSentido" prefix="sentido" options={sentidoAngOpc} parent={this}/>
          <Input id="nombreAnguloExt" prefix="nombre" type="text" parent={this}/>
        </Item>
      </Editor>
    )
  }
}