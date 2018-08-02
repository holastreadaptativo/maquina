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
      // General
      transpType: '180°',
      anguloA: '',
      anguloB: '',
      angIntSentido: 'no',
      angExtSentido: 'no'
    } : props.params
  }
  componentDidUpdate() {
    numeracion.transportador({ container:$('container'), params:this.state, variables:this.props.variables, vt:true })
  }
  render() {
    const { transpType } = this.state
    let k = 0, tipoTranspOpc = ['180°', '360°'], siNoOpc = ['si', 'no'], sentidoAngOpc = ['no', 'horario', 'antihorario']
    return (
      <Editor params={this.state} store={this.props} parent={this}>
        <Item id={k++} title="General" parent={this}>
          <Select id="transpType" prefix="tipo" options={tipoTranspOpc} parent={this}/>
        </Item>
        <Item id={k++} title="Ángulos" parent={this}>
          <Input id="anguloA" prefix="ángulo ini" postfix="°" type="text" parent={this}/>	
          <Input id="anguloB" prefix="ángulo fin" postfix="°" type="text" parent={this}/>	
        </Item>
        <Item id={k++} title="Sentidos Ángulos" parent={this}>
          <Select id="angIntSentido" prefix="interno" options={sentidoAngOpc} parent={this}/>
          <Select id="angExtSentido" prefix="externo" options={sentidoAngOpc} parent={this} hide={transpType === '180°'}/>
        </Item>
      </Editor>
    )
  }
}