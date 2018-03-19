import React, { Component } from 'react'
import { Editor } from 'components'
import { ButtonToolbar, ToggleButtonGroup, ToggleButton } from 'react-bootstrap'

export default class RespRadioButtons extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return(
      <div>
        <ButtonToolbar>
          <ToggleButtonGroup type="checkbox" defaultValue={[1, 3]}>
            <ToggleButton value={1}>Checkbox 1 (pre-checked)</ToggleButton>
            <ToggleButton value={2}>Checkbox 2</ToggleButton>
            <ToggleButton value={3}>Checkbox 3 (pre-checked)</ToggleButton>
          </ToggleButtonGroup>
        </ButtonToolbar>
      </div>
    )
  }
}
