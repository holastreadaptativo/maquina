import React, { Component } from 'react'
import { Input, Item, Select, Editor, Switch } from 'components'
import * as numeracion from 'actions'
import { COLORS } from 'stores'
import $ from 'actions'

export default class RectaNumerica extends Component {
  constructor(props) {
    super(props)
    this.state = props.push ? { 
      active:0, rectType: 'mixta', rectOrientation: 'horizontal', height:450, width:720, background:COLORS['background'],
      borderWidth:0, borderColor:'#E58433', borderStyle:'solid', borderRadius:20, titleValue: 'EL Título', 
      titleColor: '#8B1013', titleSize: 18, titleWeight: 'bold', canvasPadding: '0,0,0,0', containerPadding: '20,20,20,20',
      chartPadding: '10,10,10,10', innerChartPadding: '0,0,0,0', rectValuesUnit: '5', rectValuesDec: '1', rectValuesCent: '7',
      valuesSeparator: 'coma', axisColor: '#E58433', withArrows: 'si', axisWidth: 4, fontColor: '#8B1013', fontSize:14, 
      fontFamily: 'Larke Neue Thin', fontWeight: 'normal', 
      pictoImg: 'https://desarrolloadaptatin.blob.core.windows.net/imagenesprogramacion/Eje_1/OA_11/IE_04/rombo.svg',
      lupaImg: 'https://desarrolloadaptatin.blob.core.windows.net/imagenesprogramacion/Ordenar/lupa.svg',
      scaleDivisions: 10, scaleValue: 1, scaleWidth: 3, scaleColor: '#E58433', scaleLength: 15, /*showValues: 'ninguno',*/ showExValues: 'si',
      showAllValues: 'todos', showTheValue: 'no', showPointValue: '0,0,0,1,0,0,1,0,1,0', showFigValue: 'no', showLens: 'no', showArcs: 'no', showMiniScale: 'no',
      alignLens:'punto', showMiniArcs: 'no', showMiniExValues: 'no', showMiniAllValues: 'no', showMiniTheValue: 'no', showMiniPointValue: 'no',
      showMiniFigValue: 'no', showMiniGuides: 'no', arcsDirection: 'derecha', initArcPt: 0, endArcPt: 1, selectValuesToShow: '1,1,1,0,1,0,0,0,0,1',

    } : props.params
  }
  componentDidUpdate() {
    numeracion.rectNumFn({ container:$('container'), params:this.state, variables:this.props.variables, vt:true })
  }
  render() {
    let k = 0, rectTypeOptions = ['enteros','enteros con decimales', 'decimal', 'centesimal', 'mixta', 'mixta decimal', 'mixta centesimal'],
        borderCanvas = ['solid','dashed','dotted','double'], fontWeightOptions = ['normal', 'bold'],
        fontFamilyOptions = ['Larke Neue Thin', 'Arial', 'Montserrat'], valuesSeparatorOptions = ['coma','punto'], 
        yesNoOptions = ['no', 'si'], scaleDivisionsOptions = [1,5,10], arcsDirectionOptions = ['derecha','izquierda'],
        showTheValuesOpt = ['todos','escoger']
        const { rectType, showAllValues } = this.state
    return (
      <Editor params={this.state} store={this.props} parent={this}>
        <Item id={k++} title="General" parent={this}>
          <Select id="rectType" prefix="recta" options={rectTypeOptions} parent={this}/>
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
        <Item id={k++} title="Escala" parent={this}>
          <Input id="scaleValue" prefix="valor" placeholder={'1'} type="number" parent={this} hide={rectType !== 'enteros'}/>
          <Select id="scaleDivisions" prefix="divisiones" options={scaleDivisionsOptions} parent={this} hide={rectType !== 'enteros con decimales'}/>
          <Input id="scaleDivisions" prefix="divisiones" placeholder={'10'} type="number" parent={this} hide={rectType === 'enteros con decimales'}/>
          <Input id="scaleWidth" prefix="ancho" placeholder={'5'} type="number" parent={this}/>
          <Input id="scaleLength" prefix="largo" placeholder={'15'} type="number" parent={this}/>
          <Input id="scaleColor" prefix="color" type="color" parent={this}/>
          {/*<Select id="showValues" prefix="mostrar" options={showValuesOptions} parent={this}/>*/}
        </Item>
        <Item id={k++} title="Valores" parent={this}>
          <Input id="rectValuesUnit" prefix="unidad" type="number" placeholder={'$a'} parent={this}/>
          <Input id="rectValuesDec" prefix="decimal" type="number" placeholder={'$b'} parent={this}/>
          <Input id="rectValuesCent" prefix="centesimal" type="number" placeholder={'$c'} parent={this}/>
          <Select id="valuesSeparator" prefix="separador" hide={rectType === 'mixta' || rectType === 'mixta decimal' || rectType === 'mixta centesimal'} options={valuesSeparatorOptions} parent={this}/>
        </Item>
        <Item id={k++} title="Mostrar" parent={this}>
          <Select id="showExValues" prefix="valores ext" options={yesNoOptions} parent={this}/>
          {/*<Select id="showTheValue" prefix="valor" options={yesNoOptions} parent={this}/>*/}
          <Select id="showAllValues" prefix="valores" options={showTheValuesOpt} parent={this}/>
          <Input id="selectValuesToShow" prefix="escoger" type="text" placeholder={'1,0,1,0'} parent={this} hide={showAllValues === 'todos'}/>
          <Input id="showPointValue" prefix="punto" type="text" placeholder={'$a,$b,$c'} parent={this}/>
          <Select id="showPointValue" prefix="punto" options={yesNoOptions} parent={this} hide={true}/>
          <Select id="showFigValue" prefix="figura" options={yesNoOptions} parent={this}/>
          <Select id="showLens" prefix="lupa" options={yesNoOptions} parent={this}/>
          <Select id="alignLens" prefix="alinear" options={['punto','segmento']} parent={this}/>
        </Item>
        <Item id={k++} title="Arcos" parent={this} /*hide={rectType === 'mixta' || rectType === 'enteros con decimales'}*/>
          <Select id="showArcs" prefix="arcos" options={yesNoOptions} parent={this}/>
          <Select id="arcsDirection" prefix="dirección" options={arcsDirectionOptions} parent={this}/>
          <Input id="initArcPt" prefix="desde" type="number" parent={this}/>
          <Input id="endArcPt" prefix="hasta" type="number" parent={this}/>
        </Item>
        <Item id={k++} title="Mini Escala" parent={this} hide={rectType === 'enteros' || rectType === 'mixta' || rectType === 'enteros con decimales'}>
          <Select id="showMiniScale" prefix="mini escala" options={yesNoOptions} parent={this}/>
          <Select id="showMiniExValues" prefix="valores ext" options={yesNoOptions} parent={this}/>
          <Select id="showMiniAllValues" prefix="valores" options={yesNoOptions} parent={this}/>
          <Select id="showMiniTheValue" prefix="valor" options={yesNoOptions} parent={this} />
          <Select id="showMiniPointValue" prefix="punto" options={yesNoOptions} parent={this}/>
          <Select id="showMiniFigValue" prefix="figura" options={yesNoOptions} parent={this}/>
          <Select id="showMiniArcs" prefix="arcos" options={yesNoOptions} parent={this}/>
          <Select id="showMiniGuides" prefix="guías" options={yesNoOptions} parent={this}/>
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
      </Editor>
    )
  }
}