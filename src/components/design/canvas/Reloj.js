import React, { Component } from 'react'
import { Input, Item, Select, Editor/*, Switch*/ } from 'components' // Editor => '../../editor/index'
import * as acciones from 'actions'
import $ from 'actions'

export default class Reloj extends Component {
  constructor(props) {
    super(props)
    this.state = props.push ? { 
      active:0,
      //hora
      horas: this.props.vt ? this.props.vt.vars[0].val : 11,
      minutos: this.props.vt ? this.props.vt.vars[1].val : 30,
      segundos: this.props.vt ? this.props.vt.vars[2].val : 45,
      //opciones
      clockType: 'Digital',  //tipo de reloj, digital o analogico
      formato: '12', //formato de 24 o 12 horas
      hora: 'am', //mostrar am o pm en reloj digital
      conSegundos: 'no', // mostrar segundos en imagen
      sumarMinutos: 'no' // considerar los minutos en el horario reloj digital
    } : props.params;
  }
  componentDidUpdate() {
    acciones.reloj({ container:$('container'), params:this.state, variables:this.props.variables, vt:true })
  }
  render() {
    let k = 0, 
    tiposReloj = ['Digital', 'Analogo'], 
    formato = ['12', '24'], 
    hora = ['am', 'pm'], 
    siono = ['no','si'];
    return (
      <Editor params={this.state} store={this.props} parent={this}>
        <Item id={k++} title="General" parent={this}>
          <Select id="clockType" prefix="tipo" options={tiposReloj} parent={this}/>
          <Select id="formato" prefix="formato" options={formato} parent={this}/>
          <Select id="hora" prefix="hora" options={hora} parent={this}/>
          <Select id="conSegundos" prefix="mostrar segs" options={siono} parent={this}/>
          <Select id="sumarMinutos" prefix="sumar mins" options={siono} parent={this}/>
        </Item>
        <Item id={k++} title="Hora" parent={this}>
          <Input id="horas" type="text" prefix="Horas" parent={this} value={this.state.horas} />
          <Input id="minutos" type="text" prefix="Minutos" parent={this} value={this.state.minutos} />
          <Input id="segundos" type="text" prefix="segundos" parent={this} value={this.state.segundos} />
        </Item>
      </Editor>
    )
  }
}