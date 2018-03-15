import React, { Component } from 'react'
import { Input, Item, Select, Editor } from 'components'
import { ButtonToolbar, ToggleButton, ToggleButtonGroup } from 'react-bootstrap'

export default class RespRadioButtons extends Component {

  render() {
    return(
      <div>
        <Editor title="Radio Buttons" /*params={this.state} store={this.props}*/>
          <ButtonToolbar>
            <ToggleButtonGroup type="checkbox" defaultValue={[1, 3]}>
              <ToggleButton value={1}>Checkbox 1 (pre-checked)</ToggleButton>
              <ToggleButton value={2}>Checkbox 2</ToggleButton>
              <ToggleButton value={3}>Checkbox 3 (pre-checked)</ToggleButton>
            </ToggleButtonGroup>
          </ButtonToolbar>
        
          <ButtonToolbar>
            <ToggleButtonGroup type="radio" name="options" defaultValue={1}>
              <ToggleButton value={1}>Radio 1 (pre-checked)</ToggleButton>
              <ToggleButton value={2}>Radio 2</ToggleButton>
              <ToggleButton value={3}>Radio 3</ToggleButton>
            </ToggleButtonGroup>
          </ButtonToolbar>
        </Editor>
      </div>
    )
  }
} 
