import React from 'react';
import { Editor, Item, Select, Input } from 'components'

export default class InsertarInputFraccion extends React.Component {
  constructor(props) {
    super(props);
    this.state = props.push ? {
      entero: 'e',
      numerador: 'e',
      denominador: 'e',
      feedbackGood: '',
      feedbackBad: '',
      disabled: 'no'
    } : props.params;
  }

  render() {
    const { variables } = this.props;
    var vars = variables.map(item => { 
      return item.var
    });
    var opciones = ['si','no'];
    return (
      <Editor params={this.state} store={this.props} parent={this}>
        <Item title="Valores" parent={this}>
          <Select id="entero" prefix="Entero" options={vars} parent={this} value={this.state.entero} />
          <Select id="numerador" prefix="Numerador" options={vars} parent={this} value={this.state.numerador} />
          <Select id="denominador" prefix="Denominador" options={vars} parent={this} value={this.state.denominador} />
          <Input id="feedbackGood" prefix="Feedback Buena" parent={this} value={this.state.feedbackGood} />
          <Input id="feedbackBad" prefix="Feedback Mala" parent={this} value={this.state.feedbackBad}/>
          <Select id="disabled" prefix="Deshabilitado" options={opciones} parent={this} value={this.state.disabled} />
        </Item>
      </Editor>
    );
  }
}