import React, { Component } from 'react'
import { Input, Item, Select, Editor/*, Switch*/ } from 'components'
import * as numeracion from 'actions'
import { COLORS } from 'stores'
import $ from 'actions'

export default class RepeticionPictoricos extends Component {
  constructor(props) {
    super(props)
    this.state = props.push ? { 
      active:0, 
      // General
      height:450, width:720, background:COLORS['background'],
      // Borde
      borderWidth:0, borderColor:'#E58433', borderStyle:'solid', borderRadius:20,
      // Título
      titleValue: 'EL Título', titleColor: '#8B1013', titleSize: 18, titleWeight: 'bold',
      // Padding
      canvasPadding: '0,0,0,0', containerPadding: '20,20,20,20', chartPadding: '10,10,10,10',
      // Fuente
      fontColor: '#8B1013', fontSize:14, fontFamily: 'Larke Neue Thin', fontWeight: 'normal',
      // Valores
      /*cantElem: 1*/
      repetElem1: 1, urlElem1: 'https://desarrolloadaptatin.blob.core.windows.net/imagenesprogramacion/Ordenar/Billetes_Grupos/1_1.png',
      repetElem2: 1, urlElem2: 'https://desarrolloadaptatin.blob.core.windows.net/imagenesprogramacion/Ordenar/Billetes_Grupos/5_1.png',
      repetElem3: 1, urlElem3: 'https://desarrolloadaptatin.blob.core.windows.net/imagenesprogramacion/Ordenar/Billetes_Grupos/10_1.png',
      repetElem4: 1, urlElem4: 'https://desarrolloadaptatin.blob.core.windows.net/imagenesprogramacion/Ordenar/Billetes_Grupos/50_1.png',
      repetElem5: 1, urlElem5: 'https://desarrolloadaptatin.blob.core.windows.net/imagenesprogramacion/Ordenar/Billetes_Grupos/100_1.png',
      repetElem6: 1, urlElem6: 'https://desarrolloadaptatin.blob.core.windows.net/imagenesprogramacion/Ordenar/Billetes_Grupos/500_1.png',
      repetElem7: 1, urlElem7: 'https://desarrolloadaptatin.blob.core.windows.net/imagenesprogramacion/Ordenar/Billetes_Grupos/1000_1.png',

    } : props.params
  }
  componentDidUpdate() {
    numeracion.repeticionPic({ container:$('container'), params:this.state, variables:this.props.variables, vt:true })
  }
  render() {
    const { cantElem } = this.state

    let k = 0, fontWeightOptions = ['normal', 'bold'], borderCanvas = ['solid','dashed','dotted','double'], 
        fontFamilyOptions = ['Larke Neue Thin', 'Arial', 'Montserrat'], arrInputs = []
    
    /*
    for (let i = 0; i < cantElem; i++) {
      <Input key={'repetElem'+i} id={'repetElem' + i} prefix={'cantidad '+(i+1)} type="number" placeholder={''} parent={this}/>,
      <Input key={'urlElem' + i} id={'urlElem' + i} prefix={'url Img '+(i+1)} type="text" placeholder={''} parent={this}/>
      arrInputs.push(
      )
    }
    */

    return (
      <Editor params={this.state} store={this.props} parent={this}>
        <Item id={k++} title="General" parent={this}>
          <Input id="height" prefix="alto" postfix="px" type="number" parent={this}/>	
          <Input id="width" prefix="ancho" postfix="px" type="number" parent={this}/>	
          <Input id="background" prefix="fondo" type="color" parent={this}/>
        </Item>
        <Item id={k++} title="Borde" parent={this}>
          <Input id="borderWidth" prefix="ancho" postfix="px" type="number" parent={this}/>	
          <Input id="borderColor" prefix="color" type="color" parent={this}/>
          <Select id="borderStyle" prefix="estilo" options={borderCanvas} parent={this}/>
          <Input id="borderRadius" prefix="radio" postfix="px" type="number" parent={this}/>
        </Item>
        <Item id={k++} title="Títulos" parent={this}>
          <Input id="titleValue" prefix="título" placeholder={'Título'} parent={this}/>
          <Input id="titleColor" type="color" parent={this}/>
          <Input id="titleSize" prefix="tamaño" postfix="px" type="number" parent={this}/>
          <Select id="titleWeight" prefix="estilo" options={fontWeightOptions} parent={this}/>
        </Item>
        <Item id={k++} title="padding" parent={this}>
          <Input id="canvasPadding" prefix="canvas" postfix="px" parent={this} placeholder={'top,right,bottom,left'} />
          <Input id="containerPadding" prefix="container" postfix="px" parent={this} placeholder={'top,right,bottom,left'} />
          <Input id="chartPadding" prefix="chart" postfix="px" parent={this} placeholder={'top,right,bottom,left'} />
        </Item>
        <Item id={k++} title="Fuente" parent={this}>
          <Input id="fontColor" type="color" parent={this}/>
          <Input id="fontSize" prefix="tamaño" postfix="px" type="number" parent={this}/>
          <Select id="fontFamily" prefix="tipo" options={fontFamilyOptions} parent={this}/>
          <Select id="fontWeight" prefix="estilo" options={fontWeightOptions} parent={this}/>
        </Item>
        <Item id={k++} title="Valores" parent={this}>
          <Input id={'repetElem1'} prefix={'cantidad 1'} type="number" placeholder={''} parent={this}/>
          <Input id={'urlElem1'} prefix={'url Img 1'} type="text" placeholder={''} parent={this}/>
          <Input id={'repetElem2'} prefix={'cantidad 2'} type="number" placeholder={''} parent={this}/>
          <Input id={'urlElem2'} prefix={'url Img 2'} type="text" placeholder={''} parent={this}/>
          <Input id={'repetElem3'} prefix={'cantidad 3'} type="number" placeholder={''} parent={this}/>
          <Input id={'urlElem3'} prefix={'url Img 3'} type="text" placeholder={''} parent={this}/>
          <Input id={'repetElem4'} prefix={'cantidad 4'} type="number" placeholder={''} parent={this}/>
          <Input id={'urlElem4'} prefix={'url Img 4'} type="text" placeholder={''} parent={this}/>
          <Input id={'repetElem5'} prefix={'cantidad 5'} type="number" placeholder={''} parent={this}/>
          <Input id={'urlElem5'} prefix={'url Img 5'} type="text" placeholder={''} parent={this}/>
          <Input id={'repetElem6'} prefix={'cantidad 6'} type="number" placeholder={''} parent={this}/>
          <Input id={'urlElem6'} prefix={'url Img 6'} type="text" placeholder={''} parent={this}/>
          <Input id={'repetElem7'} prefix={'cantidad 7'} type="number" placeholder={''} parent={this}/>
          <Input id={'urlElem7'} prefix={'url Img 7'} type="text" placeholder={''} parent={this}/>
          {/*
            <Input id="cantElem" prefix="elementos" options={1} type="number" parent={this}/>
            {arrInputs}
          */}
        </Item>
      </Editor>
    )
  }
}