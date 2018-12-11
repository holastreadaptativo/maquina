import React from 'react'
import { Input, Item, Select, Editor/*, Switch*/ } from 'components' // Editor => '../../editor/index'
import * as acciones from 'actions'
import $ from 'actions'

export default class ValorPosicional extends React.Component {
  constructor(props) {
    super(props)
    this.state = props.push ? { 
      active:0,
      _tipo:'Numero Escrito',
      _numeroPalabras:'a',
      _texto:'',
      _marca:'U de Mil',
      _separacionNumeros:'0',
      _miles:'a',
      _centenas:'a',
      _decenas:'a',
      _unidades:'a',
      _altoTexo:'45',
      _margenTopBottom:'20'
    } : props.params;
  }
  componentDidUpdate() {
    acciones.valorPosicional({ container:$('container'), params:this.state, variables:this.props.variables, vt:true })
  }
  render() {
    const {
      _tipo,
      _numeroPalabras,
      _texto,
      _marca,
      _separacionNumeros,
      _miles,
      _centenas,
      _decenas,
      _unidades,
      _altoTexo,
      _margenTopBottom
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
          <Select id="_tipo" prefix="Tipo" options={['Numero Escrito','Texto','Numero']} parent={this} value={_tipo} />
          { 
            _tipo === 'Numero Escrito' && <Select id="_numeroPalabras" prefix="Numero escrito" options={vars} parent={this} value={_numeroPalabras}/>
          }
          {
            _tipo === 'Texto' && <Input id="_texto" prefix="Texto" parent={this} value={_texto}/>
          }
          {
            _tipo === 'Numero' && <Select id="_marca" prefix="Numero escrito" options={['U de Mil','Centena']} parent={this} value={_marca}/> 
          }
          {
            _tipo === 'Numero' && <Input id="_separacionNumeros" prefix="Separacion" parent={this} value={_separacionNumeros}/> 
          }
          <Select id="_miles" prefix="Miles" options={vars} parent={this} value={_miles}/>
          <Select id="_centenas" prefix="Centenas" options={vars} parent={this} value={_centenas}/>
          <Select id="_decenas" prefix="Decenas" options={vars} parent={this} value={_decenas}/>
          <Select id="_unidades" prefix="Unidades" options={vars} parent={this} value={_unidades}/>
          <Input id="_altoTexo" prefix="Alto texto" parent={this} value={_altoTexo}/>
          <Input id="_margenTopBottom" prefix="Margen TyB" parent={this} value={_margenTopBottom}/>
        </Item>
      </Editor>
    );
  }
}