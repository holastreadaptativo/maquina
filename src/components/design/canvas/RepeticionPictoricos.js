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
      _tituloCanvas: '',_canvasBorder:'',_canvasBorderRadius:'',_agruparRepeticiones:"",
      _imagen1:'',_altoImagen1:'0',_formaRepeticion1:'',_repeticiones1:'1',_separacion1:'10',_separaciony1:'0',_repBiY1:"0",
      _imagen2:'',_altoImagen2:'0',_formaRepeticion2:'',_repeticiones2:'1',_separacion2:'10',_separaciony2:'0',_repBiY2:"0",
      _imagen3:'',_altoImagen3:'0',_formaRepeticion3:'',_repeticiones3:'1',_separacion3:'10',_separaciony3:'0',_repBiY3:"0",
      _imagen4:'',_altoImagen4:'0',_formaRepeticion4:'',_repeticiones4:'1',_separacion4:'10',_separaciony4:'0',_repBiY4:"0",
      _imagen5:'',_altoImagen5:'0',_formaRepeticion5:'',_repeticiones5:'1',_separacion5:'10',_separaciony5:'0',_repBiY5:"0",
      _imagen6:'',_altoImagen6:'0',_formaRepeticion6:'',_repeticiones6:'1',_separacion6:'10',_separaciony6:'0',_repBiY6:"0",
      _imagen7:'',_altoImagen7:'0',_formaRepeticion7:'',_repeticiones7:'1',_separacion7:'10',_separaciony7:'0',_repBiY7:"0",
      _imagen8:'',_altoImagen8:'0',_formaRepeticion8:'',_repeticiones8:'1',_separacion8:'10',_separaciony8:'0',_repBiY8:"0",
      _imagen9:'',_altoImagen9:'0',_formaRepeticion9:'',_repeticiones9:'1',_separacion9:'10',_separaciony9:'0',_repBiY9:"0",
      _imagen10:'',_altoImagen10:'0',_formaRepeticion10:'',_repeticiones10:'1',_separacion10:'10',_separaciony10:'0',_repBiY10:"0",
      _imagen11:'',_altoImagen11:'0',_formaRepeticion11:'',_repeticiones11:'1',_separacion11:'10',_separaciony11:'0',_repBiY11:"0",
      _imagen12:'',_altoImagen12:'0',_formaRepeticion12:'',_repeticiones12:'1',_separacion12:'10',_separaciony12:'0',_repBiY12:"0",
      errFrec: "", feed: ""
    } : props.params
  }
  
  componentDidUpdate() {
    repeticionPic.repeticionPic({ container:$('container'), params:this.state, variables:this.props.variables, vt:true })
  }

  render() {
    var k = 0;
    const { _pictoricos,_separacion,heightCanvas,widthCanvas,opcionPictorica,_tituloCanvas,_canvasBorder,_canvasBorderRadius,_agruparRepeticiones,
      _imagen1,_altoImagen1,_formaRepeticion1,_repeticiones1,_separacion1,_separaciony1,_repBiY1,
      _imagen2,_altoImagen2,_formaRepeticion2,_repeticiones2,_separacion2,_separaciony2,_repBiY2,
      _imagen3,_altoImagen3,_formaRepeticion3,_repeticiones3,_separacion3,_separaciony3,_repBiY3,
      _imagen4,_altoImagen4,_formaRepeticion4,_repeticiones4,_separacion4,_separaciony4,_repBiY4,
      _imagen5,_altoImagen5,_formaRepeticion5,_repeticiones5,_separacion5,_separaciony5,_repBiY5,
      _imagen6,_altoImagen6,_formaRepeticion6,_repeticiones6,_separacion6,_separaciony6,_repBiY6,
      _imagen7,_altoImagen7,_formaRepeticion7,_repeticiones7,_separacion7,_separaciony7,_repBiY7,
      _imagen8,_altoImagen8,_formaRepeticion8,_repeticiones8,_separacion8,_separaciony8,_repBiY8,
      _imagen9,_altoImagen9,_formaRepeticion9,_repeticiones9,_separacion9,_separaciony9,_repBiY9,
      _imagen10,_altoImagen10,_formaRepeticion10,_repeticiones10,_separacion10,_separaciony10,_repBiY10,
      _imagen11,_altoImagen11,_formaRepeticion11,_repeticiones11,_separacion11,_separaciony11,_repBiY11,
      _imagen12,_altoImagen12,_formaRepeticion12,_repeticiones12,_separacion12,_separaciony12,_repBiY12, } = this.state;
    var opcionesDePictoricos = ['Seleccione','Monedas y billetes', 'Bloques Multibase'];
    var cantidad = ['0','1','2','3','4','5','6','7','8','9','10','11','12'];
    var opcionesDeRepeticion = ['Seleccionar','dado', 'diagonal/apilado', 'diagonal', 'horizontal/vertical', 'horizontal', 'vertical', 'bidimensional'];
    var imagenes;
    if(opcionPictorica == 'Monedas y billetes') {
      imagenes = ['Seleccionar','billete mil', 'moneda diez', 'moneda cien', 'moneda uno', 'moneda quinientos', 'moneda cincuenta', 'moneda cinco', 'signo resta', 'signo igual', 'signo mayor', 'signo menor', 'signo suma', 'signo distinto', 'rectangulo'];
    } else if(opcionPictorica == 'Bloques Multibase') {
      imagenes = ['Seleccionar','bloque mil', 'bloque cien', 'bloque diez', 'bloque uno', 'signo resta', 'signo igual', 'signo mayor', 'signo menor', 'signo suma', 'signo distinto', 'rectangulo'];
    }
    const grid = ["1","2","3","4","5","6","7","8","9","10","11","12"];
    return (
      <Editor params={this.state} store={this.props} parent={this}>
        <Item id={k++} title="General" parent={this}>
          <Input id="heightCanvas" prefix="alto" postfix="px" type="number" parent={this} value={heightCanvas}/>	
          <Input id="widthCanvas" prefix="ancho" postfix="px" type="number" parent={this} value={widthCanvas}/>
          <Input id="_tituloCanvas" prefix="Titulo" type="text" parent={this} value={_tituloCanvas}/>
          <Input id="_canvasBorder" prefix="Borde" type="text" parent={this} value={_canvasBorder}/>
          { _canvasBorder !== '' && <Input id="_canvasBorderRadius" prefix="Radio borde" type="text" parent={this} value={_canvasBorderRadius}/> }
        </Item>
        <Item id={k++} title="Imágenes" parent={this}>
          <Input id="_separacion" type="number" value={_separacion} prefix="Sep Repeticion" parent={this}/>
          <Select id="opcionPictorica" prefix="tipo" options={opcionesDePictoricos} parent={this} value={opcionPictorica}/>
          <Select id="_pictoricos" prefix={'cantidad'} options={cantidad} parent={this} value={_pictoricos}/>
          <Input id="_agruparRepeticiones" prefix="agrupar" parent={this} value={_agruparRepeticiones} />
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
          { _formaRepeticion1 === 'bidimensional' &&
              <Input id="_repBiY1" type="number" prefix="Y" parent={this} value={_repBiY1} />  }
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
            { _formaRepeticion2 === 'bidimensional' &&
                <Input id="_repBiY2" type="number" prefix="Y" parent={this} value={_repBiY2} />  }
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
            { _formaRepeticion3 === 'bidimensional' &&
                <Input id="_repBiY3" type="number" prefix="Y" parent={this} value={_repBiY3} />  }
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
            { _formaRepeticion4 === 'bidimensional' &&
                <Input id="_repBiY4" type="number" prefix="Y" parent={this} value={_repBiY4} />  }
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
            { _formaRepeticion5 === 'bidimensional' &&
                <Input id="_repBiY5" type="number" prefix="Y" parent={this} value={_repBiY5} />  }
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
            { _formaRepeticion6 === 'bidimensional' &&
                <Input id="_repBiY6" type="number" prefix="Y" parent={this} value={_repBiY6} />  }
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
            { _formaRepeticion7 === 'bidimensional' &&
                <Input id="_repBiY7" type="number" prefix="Y" parent={this} value={_repBiY7} />  }
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
            { _formaRepeticion8 === 'bidimensional' &&
                <Input id="_repBiY8" type="number" prefix="Y" parent={this} value={_repBiY8} />  }
        </Item> }

        { _pictoricos > 8 &&
        <Item id={k++} title="Imagen 9" parent={this}>
          <Select id="_imagen9" prefix="Imagen" options={imagenes} parent={this} value={_imagen9} /> 
            <Select id="_formaRepeticion9" prefix="forma rep" options={opcionesDeRepeticion} parent={this} value={_formaRepeticion9} />
            <Input id="_repeticiones9" prefix="Cantidad" parent={this} value={_repeticiones9} />
            <Input id="_altoImagen9" type="number" prefix="Alto Imagen" parent={this} value={_altoImagen9} />
            <Input id="_separacion9" type="number" prefix="Separacion" parent={this} value={_separacion9} />
            { (_formaRepeticion9 === 'diagonal' || _formaRepeticion9 === 'diagonal/apilado') && 
                <Input id="_separaciony9" type="number" prefix="Separacion y " parent={this} value={_separaciony9} /> }
            { _formaRepeticion9 === 'bidimensional' &&
                <Input id="_repBiY9" type="number" prefix="Y" parent={this} value={_repBiY9} />  }
        </Item> }

        { _pictoricos > 9 &&
        <Item id={k++} title="Imagen 10" parent={this}>
          <Select id="_imagen10" prefix="Imagen" options={imagenes} parent={this} value={_imagen10} /> 
            <Select id="_formaRepeticion10" prefix="forma rep" options={opcionesDeRepeticion} parent={this} value={_formaRepeticion10} />
            <Input id="_repeticiones10" prefix="Cantidad" parent={this} value={_repeticiones10} />
            <Input id="_altoImagen10" type="number" prefix="Alto Imagen" parent={this} value={_altoImagen10} />
            <Input id="_separacion10" type="number" prefix="Separacion" parent={this} value={_separacion10} />
            { (_formaRepeticion10 === 'diagonal' || _formaRepeticion10 === 'diagonal/apilado') && 
                <Input id="_separaciony10" type="number" prefix="Separacion y " parent={this} value={_separaciony10} /> }
            { _formaRepeticion10 === 'bidimensional' &&
                <Input id="_repBiY10" type="number" prefix="Y" parent={this} value={_repBiY10} />  }
        </Item> }

        { _pictoricos > 10 &&
        <Item id={k++} title="Imagen 11" parent={this}>
          <Select id="_imagen11" prefix="Imagen" options={imagenes} parent={this} value={_imagen11} /> 
            <Select id="_formaRepeticion11" prefix="forma rep" options={opcionesDeRepeticion} parent={this} value={_formaRepeticion11} />
            <Input id="_repeticiones11" prefix="Cantidad" parent={this} value={_repeticiones11} />
            <Input id="_altoImagen11" type="number" prefix="Alto Imagen" parent={this} value={_altoImagen11} />
            <Input id="_separacion11" type="number" prefix="Separacion" parent={this} value={_separacion11} />
            { (_formaRepeticion11 === 'diagonal' || _formaRepeticion11 === 'diagonal/apilado') && 
                <Input id="_separaciony11" type="number" prefix="Separacion y " parent={this} value={_separaciony11} /> }
            { _formaRepeticion11 === 'bidimensional' &&
                <Input id="_repBiY11" type="number" prefix="Y" parent={this} value={_repBiY11} />  }
        </Item> }

        { _pictoricos > 11 &&
        <Item id={k++} title="Imagen 12" parent={this}>
          <Select id="_imagen12" prefix="Imagen" options={imagenes} parent={this} value={_imagen12} /> 
            <Select id="_formaRepeticion12" prefix="forma rep" options={opcionesDeRepeticion} parent={this} value={_formaRepeticion12} />
            <Input id="_repeticiones12" prefix="Cantidad" parent={this} value={_repeticiones12} />
            <Input id="_altoImagen12" type="number" prefix="Alto Imagen" parent={this} value={_altoImagen12} />
            <Input id="_separacion12" type="number" prefix="Separacion" parent={this} value={_separacion12} />
            { (_formaRepeticion12 === 'diagonal' || _formaRepeticion12 === 'diagonal/apilado') && 
                <Input id="_separaciony12" type="number" prefix="Separacion y " parent={this} value={_separaciony12} /> }
            { _formaRepeticion12 === 'bidimensional' &&
                <Input id="_repBiY12" type="number" prefix="Y" parent={this} value={_repBiY12} />  }
        </Item> }
        
        { this.props.section === 'answers' && <Item id="k++" title="Valores Respuesta" parent={this}>
					<Input id="errFrec" prefix="Error Frecte." type="text" parent={this} value={this.state.errFrec} />
					<Input id="feed" prefix="Feedback" type="text" parent={this} value={this.state.feed} />
					<Input id="textoOpcion" prefix="Texto Opcion" type="text" parent={this} value={this.state.textoOpcion} />
					<Select id="col" prefix="Ancho Mobil" parent={this} value={this.state.col} options={grid}/>
					<Select id="colsm" prefix="Ancho Tablet" parent={this} value={this.state.colsm} options={grid}/>
					<Select id="colmd" prefix="Ancho Escritorio" parent={this} value={this.state.colmd} options={grid}/>
				</Item> }

      </Editor>
    )
  }
}