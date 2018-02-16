import React, { Component } from 'react'

import OptInput from './Opcion/OptInput'
import OptComboBox from './Opcion/OptComboBox'
import OptRadioBtn from './Opcion/OptRadioBtn'
import OptTexto from './Opcion/OptTexto/OptTexto'
import OptImg from './Opcion/OptImg'

class Functions extends Component {

  render() {
    const {option} = this.props
    //let componentArr = {
    //  Input: '<OptInput />',
    //  ComboBox: '<OptCombo />'
    //}
    //{
    //  componentArr.forEach(function(key,val) {
    //    console.log(key + ': ' + key[value])
    //  })
    //}

    return (
      <div class="row">
        <div class="col-sm-12">
          {
            option == 'Input' ? <OptInput /> : 
            option == 'ComboBox' ? <OptComboBox /> : 
            option == 'Radio Button' ? <OptRadioBtn /> : 
            option == 'Texto' ? <OptTexto /> : 
            option == 'Imagen' ? <OptImg /> :
            <h1>Error</h1>
          }
        </div>
      </div>
    )
  }
}

export default Functions