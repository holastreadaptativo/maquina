import React, { Component } from 'react'
import { Editor } from 'components'
import { Input, Item, Select } from 'components'

export default class InsertarBotones extends Component {
  constructor(props) {
    super(props)
    this.state = {
      background: '',
      active: 0,
      config: {
        quantity: 1,
        position: 'horizontal',
        btnGroup: 'no',
        size: 'medium',
        type: 'normal'
      },
      buttons: [{
        id: 1,
        name: 'botón-1',
        value: ''
      }]
    }
  }

  onQttyChange() {
    const { config, buttons } = this.state
    let arrBtn = buttons
    arrBtn.push({
      id: arrBtn.length + 1,
      name: 'botón-' + (arrBtn.length + 1),
      value: ''
    })
    this.setState({
      buttons: arrBtn
    })
  }

  handleActive(active) {
    this.setState({ active:active })
  }

  render() {
    let k = 0
    const { active, config, buttons } = this.state
    return(
      <Editor title="Insertar Botones" params={this.state} store={this.props}>
        <Item id={k++} active={active} title="Configuración" setActive={::this.handleActive}>
          <Input id="quantity" default={config.quantity} prefix="Quantity" postfix="" update={::this.setState} update={::this.onQttyChange} type="number"/>
          <Select id="btnGroup" default={config.btnGroup} prefix="Group" /*update={::this.setState}*/ options={['si','no']}/>
          <Select id="position" default={config.position} prefix="Position" /*update={::this.setState}*/ options={['horizontal','vertical']}/>
          <Select id="size" default={config.size} prefix="Size" /*update={::this.setState}*/ options={['extra-small','small', 'medium', 'large', 'block']}/>
          <Select id="type" default={config.type} prefix="Type" /*update={::this.setState}*/ options={['normal','radio', 'checkbox']}/>
        </Item>
        {
          buttons && buttons.map((button, index)=> {
            return(
              <Item id={k++} key={'btnItem'+index} active={active} title={button.name} setActive={::this.handleActive}>
                <Input id={'value'} default={button.value} placeholder="$a" prefix="value" postfix="" update={::this.setState} type="text"/>
              </Item>
            )
          })
        }
      </Editor>
    )
  }
}
