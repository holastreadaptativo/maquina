import React, { Component } from 'react'
import { Input, Item, Select, Editor/*, Switch*/ } from 'components'
import * as repeticionPic from 'actions'
import { COLORS } from 'stores'
import $ from 'actions'
import { show } from 'actions'

export default class RepeticionPictoricos extends Component {
  constructor(props) {
    super(props)
    
    this.state = props.push ? { 
      _pictoricos: '0',opcionPictorica: 'Bloques Multibase',
      _separacion: '20', heightCanvas:'300', widthCanvas:'1000',
      _imagen1:'',_altoImagen1:'0',_formaRepeticion1:'',_repeticiones1:'1',_separacion1:'10',_separaciony1:'0',
      _imagen2:'',_altoImagen2:'0',_formaRepeticion2:'',_repeticiones2:'1',_separacion2:'10',_separaciony2:'0',
      _imagen3:'',_altoImagen3:'0',_formaRepeticion3:'',_repeticiones3:'1',_separacion3:'10',_separaciony3:'0',
      _imagen4:'',_altoImagen4:'0',_formaRepeticion4:'',_repeticiones4:'1',_separacion4:'10',_separaciony4:'0',
      _imagen5:'',_altoImagen5:'0',_formaRepeticion5:'',_repeticiones5:'1',_separacion5:'10',_separaciony5:'0',
      _imagen6:'',_altoImagen6:'0',_formaRepeticion6:'',_repeticiones6:'1',_separacion6:'10',_separaciony6:'0',
      _imagen7:'',_altoImagen7:'0',_formaRepeticion7:'',_repeticiones7:'1',_separacion7:'10',_separaciony7:'0',
      _imagen8:'',_altoImagen8:'0',_formaRepeticion8:'',_repeticiones8:'1',_separacion8:'10',_separaciony8:'0',
      errFrec: "", feed: ""
    } : props.params
  }
  
  componentDidUpdate() {
    repeticionPic.repeticionPic({ container:$('container'), params:this.state, variables:this.props.variables, vt:true })
  }

  render() {
    var k = 0;
    const { _pictoricos,_separacion,heightCanvas,widthCanvas,opcionPictorica,
      _imagen1,_altoImagen1,_formaRepeticion1,_repeticiones1,_separacion1,_separaciony1,
      _imagen2,_altoImagen2,_formaRepeticion2,_repeticiones2,_separacion2,_separaciony2,
      _imagen3,_altoImagen3,_formaRepeticion3,_repeticiones3,_separacion3,_separaciony3,
      _imagen4,_altoImagen4,_formaRepeticion4,_repeticiones4,_separacion4,_separaciony4,
      _imagen5,_altoImagen5,_formaRepeticion5,_repeticiones5,_separacion5,_separaciony5,
      _imagen6,_altoImagen6,_formaRepeticion6,_repeticiones6,_separacion6,_separaciony6,
      _imagen7,_altoImagen7,_formaRepeticion7,_repeticiones7,_separacion7,_separaciony7,
      _imagen8,_altoImagen8,_formaRepeticion8,_repeticiones8,_separacion8,_separaciony8 } = this.state;
    var opcionesDePictoricos = ['Seleccione','Monedas y billetes', 'Bloques Multibase'];
    var cantidad = ['0','1','2','3','4','5','6','7','8'];
    var opcionesDeRepeticion = ['Seleccionar','dado', 'diagonal/apilado', 'diagonal', 'horizontal/vertical', 'horizontal', 'vertical'];
    var imagenes;
    if(opcionPictorica == 'Monedas y billetes') {
      imagenes = ['Seleccionar','billete mil', 'moneda diez', 'moneda cien', 'moneda uno', 'moneda quinientos', 'moneda cincuenta', 'moneda cinco'];
    } else if(opcionPictorica == 'Bloques Multibase') {
      imagenes = ['Seleccionar','bloque mil', 'bloque cien', 'bloque diez', 'bloque uno'];
    }
    const grid = ["1","2","3","4","5","6","7","8","9","10","11","12"];
    return (
      <Editor params={this.state} store={this.props} parent={this}>
        <Item id={k++} title="General" parent={this}>
          <Input id="heightCanvas" prefix="alto" postfix="px" type="number" parent={this} value={heightCanvas}/>	
          <Input id="widthCanvas" prefix="ancho" postfix="px" type="number" parent={this} value={widthCanvas}/>
        </Item>
        <Item id={k++} title="Imágenes" parent={this}>
          <Input id="_separacion" type="number" value={_separacion} prefix="Sep Repeticion" parent={this}/>
          <Select id="opcionPictorica" prefix="tipo" options={opcionesDePictoricos} parent={this} value={opcionPictorica}/>
          <Select id="_pictoricos" prefix={'cantidad'} options={cantidad} parent={this} value={_pictoricos}/>
        </Item>
        { _pictoricos > 0 && 
        <Item id={k++} title="Imagen 1" parent={this}>
          <Select id="_imagen1" prefix="Imagen" options={imagenes} parent={this} value={_imagen1} /> 
          <Select id="_formaRepeticion1" prefix="forma rep" options={opcionesDeRepeticion} parent={this} value={_formaRepeticion1} />
          <Input id="_repeticiones1" prefix="Cantidad" parent={this} value={_repeticiones1} />
          <Input id="_altoImagen1" type="number" prefix="Alto Imagen" parent={this} value={_altoImagen1} />
          <Input id="_separacion1" type="number" prefix="Separacion" parent={this} value={_separacion1} />
          { (_formaRepeticion1 === 'diagonal' || _formaRepeticion1 === 'diagonal/apilado') && 
              <Input id="_separaciony1" type="number" prefix="Separacion y " parent={this} value={_separaciony1} /> }
        </Item> }

        { _pictoricos > 1 && 
        <Item id={k++} title="Imagen 2" parent={this}>
          <Select id="_imagen2" prefix="Imagen" options={imagenes} parent={this} value={_imagen2} /> 
            <Select id="_formaRepeticion2" prefix="forma rep" options={opcionesDeRepeticion} parent={this} value={_formaRepeticion2} />
            <Input id="_repeticiones2" prefix="Cantidad" parent={this} value={_repeticiones2} />
            <Input id="_altoImagen2" type="number" prefix="Alto Imagen" parent={this} value={_altoImagen2} />
            <Input id="_separacion2" type="number" prefix="Separacion" parent={this} value={_separacion2} />
            { (_formaRepeticion2 === 'diagonal' || _formaRepeticion2 === 'diagonal/apilado') && 
                <Input id="_separaciony2" type="number" prefix="Separacion y " parent={this} value={_separaciony2} /> }
        </Item> }

        { _pictoricos > 2 &&
        <Item id={k++} title="Imagen 3" parent={this}>
          <Select id="_imagen3" prefix="Imagen" options={imagenes} parent={this} value={_imagen3} /> 
            <Select id="_formaRepeticion3" prefix="forma rep" options={opcionesDeRepeticion} parent={this} value={_formaRepeticion3} />
            <Input id="_repeticiones3" prefix="Cantidad" parent={this} value={_repeticiones3} />
            <Input id="_altoImagen3" type="number" prefix="Alto Imagen" parent={this} value={_altoImagen3} />
            <Input id="_separacion3" type="number" prefix="Separacion" parent={this} value={_separacion3} />
            { (_formaRepeticion3 === 'diagonal' || _formaRepeticion3 === 'diagonal/apilado') && 
                <Input id="_separaciony3" type="number" prefix="Separacion y " parent={this} value={_separaciony3} /> }
        </Item> }

        { _pictoricos > 3 &&
        <Item id={k++} title="Imagen 4" parent={this}>
          <Select id="_imagen4" prefix="Imagen" options={imagenes} parent={this} value={_imagen4} /> 
            <Select id="_formaRepeticion4" prefix="forma rep" options={opcionesDeRepeticion} parent={this} value={_formaRepeticion4} />
            <Input id="_repeticiones4" prefix="Cantidad" parent={this} value={_repeticiones4} />
            <Input id="_altoImagen4" type="number" prefix="Alto Imagen" parent={this} value={_altoImagen4} />
            <Input id="_separacion4" type="number" prefix="Separacion" parent={this} value={_separacion4} />
            { (_formaRepeticion4 === 'diagonal' || _formaRepeticion4 === 'diagonal/apilado') && 
                <Input id="_separaciony4" type="number" prefix="Separacion y " parent={this} value={_separaciony4} /> }
        </Item> }

        { _pictoricos > 4 &&
        <Item id={k++} title="Imagen 5" parent={this}>
          <Select id="_imagen5" prefix="Imagen" options={imagenes} parent={this} value={_imagen5} /> 
            <Select id="_formaRepeticion5" prefix="forma rep" options={opcionesDeRepeticion} parent={this} value={_formaRepeticion5} />
            <Input id="_repeticiones5" prefix="Cantidad" parent={this} value={_repeticiones5} />
            <Input id="_altoImagen5" type="number" prefix="Alto Imagen" parent={this} value={_altoImagen5} />
            <Input id="_separacion5" type="number" prefix="Separacion" parent={this} value={_separacion5} />
            { (_formaRepeticion5 === 'diagonal' || _formaRepeticion5 === 'diagonal/apilado') && 
                <Input id="_separaciony5" type="number" prefix="Separacion y " parent={this} value={_separaciony5} /> }
        </Item> }

        { _pictoricos > 5 &&
        <Item id={k++} title="Imagen 6" parent={this}>
          <Select id="_imagen6" prefix="Imagen" options={imagenes} parent={this} value={_imagen6} /> 
            <Select id="_formaRepeticion6" prefix="forma rep" options={opcionesDeRepeticion} parent={this} value={_formaRepeticion6} />
            <Input id="_repeticiones6" prefix="Cantidad" parent={this} value={_repeticiones6} />
            <Input id="_altoImagen6" type="number" prefix="Alto Imagen" parent={this} value={_altoImagen6} />
            <Input id="_separacion6" type="number" prefix="Separacion" parent={this} value={_separacion6} />
            { (_formaRepeticion6 === 'diagonal' || _formaRepeticion6 === 'diagonal/apilado') && 
                <Input id="_separaciony6" type="number" prefix="Separacion y " parent={this} value={_separaciony6} /> }
        </Item> }

        { _pictoricos > 6 &&
        <Item id={k++} title="Imagen 7" parent={this}>
          <Select id="_imagen7" prefix="Imagen" options={imagenes} parent={this} value={_imagen7} /> 
            <Select id="_formaRepeticion7" prefix="forma rep" options={opcionesDeRepeticion} parent={this} value={_formaRepeticion7} />
            <Input id="_repeticiones7" prefix="Cantidad" parent={this} value={_repeticiones7} />
            <Input id="_altoImagen7" type="number" prefix="Alto Imagen" parent={this} value={_altoImagen7} />
            <Input id="_separacion7" type="number" prefix="Separacion" parent={this} value={_separacion7} />
            { (_formaRepeticion7 === 'diagonal' || _formaRepeticion7 === 'diagonal/apilado') && 
                <Input id="_separaciony7" type="number" prefix="Separacion y " parent={this} value={_separaciony7} /> }
        </Item> }

        { _pictoricos > 7 &&
        <Item id={k++} title="Imagen 8" parent={this}>
          <Select id="_imagen8" prefix="Imagen" options={imagenes} parent={this} value={_imagen8} /> 
            <Select id="_formaRepeticion8" prefix="forma rep" options={opcionesDeRepeticion} parent={this} value={_formaRepeticion8} />
            <Input id="_repeticiones8" prefix="Cantidad" parent={this} value={_repeticiones8} />
            <Input id="_altoImagen8" type="number" prefix="Alto Imagen" parent={this} value={_altoImagen8} />
            <Input id="_separacion8" type="number" prefix="Separacion" parent={this} value={_separacion8} />
            { (_formaRepeticion8 === 'diagonal' || _formaRepeticion8 === 'diagonal/apilado') && 
                <Input id="_separaciony8" type="number" prefix="Separacion y " parent={this} value={_separaciony8} /> }
        </Item> }
        
        { this.props.section === 'answers' && <Item id="k++" title="Valores Respuesta" parent={this}>
          <Input id="errFrec" prefix="Error Frecte." type="text" parent={this} value={this.state.errFrec} />
          <Input id="feed" prefix="Feedback" type="text" parent={this} value={this.state.feed} />
          <Select id="col" prefix="Ancho Mobil" parent={this} value={this.state.col} options={grid}/>
					<Select id="colsm" prefix="Ancho Tablet" parent={this} value={this.state.colsm} options={grid}/>
					<Select id="colmd" prefix="Ancho Escritorio" parent={this} value={this.state.colmd} options={grid}/>
        </Item> }

      </Editor>
    )
  }
}