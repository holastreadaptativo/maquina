import React, { Component } from 'react'
import { Editor } from 'components'
import { Input, Item, Select } from 'components'

export default class InsertarInputs extends Component {
  constructor(props) {
    super(props)
    this.state = {
      background: '',
      active: 0,
      config: {
        quantity: 1,
        position: 'horizontal',
        inputsGroup: 'no',
        size: 'medium'
      },
      inputs: [{
        id: 1,
        name: 'input-1',
        value: '',
        placeholder: 'placeholder'
      }]
    }
  }

  onQttyChange() {
    const { config, inputs } = this.state
    let arrinp = inputs
    arrinp.push({
      id: arrinp.length + 1,
      name: 'input-' + (arrinp + 1),
      value: '',
      placeholder: 'placeholder'
    })
    this.setState({
      input: arrBtn
    })
  }

  handleActive(active) {
    this.setState({ active:active })
  }

  render() {
    let k = 0
    const { active, config, inputs } = this.state
    return(
      <Editor title="Insertar Inputs" params={this.state} store={this.props}>
        <Item id={k++} active={active} title="Configuración" setActive={::this.handleActive}>
          <Input id="quantity" default={config.quantity} prefix="Quantity" postfix="" update={::this.setState} update={::this.onQttyChange} type="number"/>
          <Select id="btnGroup" default={config.inputsGroup} prefix="Group" /*update={::this.setState}*/ options={['si','no']}/>
          <Select id="position" default={config.position} prefix="Position" /*update={::this.setState}*/ options={['horizontal','vertical']}/>	
          <Select id="size" default={config.size} prefix="Size" /*update={::this.setState}*/ options={['extra-small','small', 'medium', 'large', 'extra-large']}/>
        </Item>
        {
          inputs && inputs.map((input, index)=> {
            return(
              <Item id={k++} key={'btnItem'+index} active={active} title={input.name} setActive={::this.handleActive}>
                <Input id={'value'} default={input.value} prefix="value" postfix="" /*update={::this.setState}*/ type="text"/>
                <Input id={'placeholder'} default={input.placeholder} prefix="placehold" postfix="" /*update={::this.setState}*/ type="text"/>
                <Select id="type" default={'type'} prefix="type" /*update={::this.setState}*/ options={['texto','entero','decimal','alfanumérico']}/>	
              </Item>
            )
          })
        }
      </Editor>
    )
  }
}
