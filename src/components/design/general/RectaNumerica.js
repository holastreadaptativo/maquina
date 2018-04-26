import React, { Component } from 'react'
import { Input, Item, Select, Editor } from 'components'
import * as rectasNumericas from 'actions'
import { COLORS } from 'stores'
import $ from 'actions'

export default class RectaNumerica extends Component {
  constructor(props) {
    super(props)
    this.state = props.push ? { 
      rectType: 'mixta', rectOrientation: 'horizontal', height:450, width:720, background:COLORS['background'],
      borderWidth:0, borderColor:'#006400', borderStyle:'solid', borderRadius:20, titleValue: 'EL Título', 
      titleColor: '#EE4223', titleSize: 18, titleWeight: 'bold', canvasPadding: '0,0,0,0', containerPadding: '20,20,20,20',
      chartPadding: '10,10,10,10', innerChartPadding: '0,0,0,0', rectValuesUnit: '5', rectValuesDec: '6', rectValuesCen: '7',
      valuesSeparator: '', axisColor: '#E58433', withArrows: 'si', axisWidth: 5, fontColor: '#8B1013', fontSize:14, 
      fontFamily: 'Larke Neue Thin', fontWeight: 'normal', 
      pictoImg: 'https://desarrolloadaptatin.blob.core.windows.net/imagenesprogramacion/Eje_1/OA_11/IE_04/rombo.svg',
      lupaImg: 'https://desarrolloadaptatin.blob.core.windows.net/imagenesprogramacion/Ordenar/lupa.svg'

    } : props.params
  }
  componentDidUpdate() {
    rectasNumericas.rectNumMixtaFn({ container:$('container'), params:this.state, variables:this.props.variables, vt:true })
  }
  render() {
    let k = 0, rectTypeOptions = ['enteros', 'decimal', 'decimal eje', 'mixta'], rectOrientationOpt = ['vertical','horizontal'],
        borderCanvas=['solid','dashed','dotted','double'], fontWeightOptions=['normal', 'bold'],
        fontFamilyOptions = ['Larke Neue Thin', 'Arial', 'Montserrat'], valuesSeparatorOptions=['normal','punto','coma','espacio'], 
        yesNoOptions=['no', 'si']
    return (
      <Editor params={this.state} store={this.props} parent={this}>
        <Item id={k++} title="General" parent={this}>
          <Select id="rectType" prefix="recta" options={rectTypeOptions} parent={this}/>
          <Select id="rectOrientation" prefix="orientación" options={rectOrientationOpt} parent={this}/>
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
          {/*<Input id="innerChartPadding" prefix="innerchart" postfix="px" parent={this} placeholder={'x,y'} />*/}
        </Item>
        <Item id={k++} title="Valores" parent={this}>
          <Input id="rectValuesUnit" prefix="unidad" placeholder={'$a'} parent={this}/>
          <Input id="rectValuesDec" prefix="decimal" placeholder={'$b'} parent={this}/>
          <Input id="rectValuesCent" prefix="centesimal" placeholder={'$c'} parent={this}/>
          <Select id="valuesSeparator" prefix="separador" options={valuesSeparatorOptions} parent={this}/>
        </Item>
        <Item id={k++} title="Ejes" parent={this}>
          <Input id="axisColor" type="color" parent={this}/>
          <Select id="withArrows" prefix="flechas" options={yesNoOptions} parent={this}/>
          <Input id="axisWidth" prefix="grosor" postfix="px" type="number" parent={this}/>
        </Item>
        <Item id={k++} title="Fuente" parent={this}>
          <Input id="fontColor" type="color" parent={this}/>
          <Input id="fontSize" prefix="tamaño" postfix="px" type="number" parent={this}/>
          <Select id="fontFamily" prefix="tipo" options={fontFamilyOptions} parent={this}/>
          <Select id="fontWeight" prefix="estilo" options={fontWeightOptions} parent={this}/>
        </Item>
        <Item id={k++} title="Pictoricos" parent={this}>
          <Input id="pictoImg" prefix="imagen" type="text" parent={this}/>
          <Input id="lupaImg" prefix="lupa" type="text" parent={this}/>
        </Item>
      </Editor>
    )
  }
}