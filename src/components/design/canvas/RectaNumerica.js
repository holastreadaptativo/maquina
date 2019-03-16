  import React, { Component } from 'react'
  import { Input, Item, Select, Editor/*, Switch*/ } from 'components'
  import * as numeracion from 'actions'
  import { COLORS } from 'stores'
  import $ from 'actions'

  export default class RectaNumerica extends Component {
    constructor(props) {
      super(props)
      this.state = props.push ? { 
        active:0, 
        // General
        rectType: 'mixta decimal', decimalScale: 'no', height:450, width:720, background:COLORS['background'],
        // Borde
        borderWidth:0, borderColor:'#E58433', borderStyle:'solid', borderRadius:20, 
        // Títulos
        titleValue: 'EL Título', titleColor: '#8B1013', titleSize: 18, titleWeight: 'bold',
        // Padding
        canvasPadding: '0,0,0,0', containerPadding: '20,20,20,20', chartPadding: '10,10,10,10',
        // Escala
        scaleValue: 1, scaleDivisions: 10, scaleWidth: 3, scaleLength: 15, scaleColor: '#E58433',
        // Valor
        initValue: '3.56', valuesSeparator: 'coma',
        // Mostrar
        showExValues: 'si', showFirstValue: 'no', showAllValues: 'no', selectValuesToShow: '', showPointValue: 'no', 
        wichPointValue: '5.15,5.87,5.66', showFigValue: 'no', wichFigValues: '5.15',
        srcFig1:'',altoFig1:'',ubicacionFig1:'arriba',textoFig1:'',posicionesFig1:'',
        srcFig2:'',altoFig2:'',ubicacionFig2:'arriba',textoFig2:'',posicionesFig2:'',
        showArcs: 'no', initArcPt: '5.26', endArcPt: '5.71', showConstant:'no',
        showTramoLlave:'no',tramoInicio:'0',tramoFin:'0',tramoTexto:'',tramoAltoTexto:'30',tramoColor:'#000',tramoForma:'igual',tramoAltura:'40',
        // Mini Escala
        showMiniScale: 'no', showMiniTheValue: '5.71', showMiniExValues: 'si', showMiniAllValues: 'no',
        showMiniPointValue: 'no', showMiniFig: 'no', wichMiniFigValues: '5.72,5.76', showMiniArcs: 'no',
        initArcPtMini: '5.72', endArcPtMini: '5.76', showMiniGuides: 'no', showLens: 'no', alignLens:'punto',
        // Ejes
        axisColor: '#E58433', withArrows: 'si', axisWidth: 4,
        // Fuente
        fontColor: '#8B1013', fontSize:14, fontFamily: 'Larke Neue Thin', fontWeight: 'normal'
        // rectValues: '5.38',   
        // showTheValue: 'no',
      } : props.params
    }
    componentDidUpdate() {
      numeracion.rectNumFn({ container:$('container'), params:this.state, variables:this.props.variables, vt:true })
    }
    
    render() {
      const { rectType, showAllValues, showArcs, showPointValue, showFigValue,wichFigValues, showMiniScale, /*showMiniFig,*/ showMiniArcs, showFirstValue, showConstant,
        showTramoLlave,tramoInicio,tramoFin,tramoTexto,tramoAltoTexto,tramoColor,tramoForma,tramoAltura,
        srcFig1,altoFig1,ubicacionFig1,textoFig1,posicionesFig1,
        srcFig2,altoFig2,ubicacionFig2,textoFig2,posicionesFig2,
         } = this.state

      let k = 0, rectTypeOptions = ['enteros','enteros con decimales', 'decimal', 'centesimal', 'mixta', 'mixta decimal', 'mixta centesimal'],
          borderCanvas = ['solid','dashed','dotted','double'], fontWeightOptions = ['normal', 'bold'],
          fontFamilyOptions = ['Larke Neue Thin', 'Arial', 'Montserrat'], valuesSeparatorOptions = ['coma','punto'], 
          yesNoOptions = ['no', 'si'], /*scaleDivisionsOptions = [1,5,10],*/ arcsDirectionOptions = ['no','derecha','izquierda'],
          showTheValuesOpt = ['no', 'todos','mostrar','ocultar'], showFigValueOpt = ['no','arriba','abajo'], showPointValueOpt = ['no','escoger']
      // ocultar condicionales
      let mostrarMiniRecta = (rectType === 'enteros' || rectType === 'enteros con decimales' || rectType === 'centesimal' || rectType === 'mixta' || rectType === 'mixta centesimal')
      const grid = ["1","2","3","4","5","6","7","8","9","10","11","12"];
      return (
        <Editor params={this.state} store={this.props} parent={this}>
          <Item id={k++} title="General" parent={this}>
            <Select id="rectType" prefix="recta" options={rectTypeOptions} parent={this}/>
            <Select id="decimalScale" prefix={'decimal'} options={yesNoOptions} parent={this} hide={mostrarMiniRecta}/>
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
          <Item id={k++} title="Escala" parent={this}>
            <Input id="scaleValue" prefix="valor" placeholder={'1'} parent={this} />
            <Input id="scaleDivisions" prefix="divisiones" placeholder={'10'} parent={this} />
            <Input id="scaleWidth" prefix="ancho" placeholder={'5'} type="number" parent={this}/>
            <Input id="scaleLength" prefix="largo" placeholder={'15'} type="number" parent={this}/>
            <Input id="scaleColor" prefix="color" type="color" parent={this}/>
          </Item>
          <Item id={k++} title="Valores" parent={this}>
            <Input id="initValue" prefix="valor inicial" type="text" placeholder={'$a.$b$c,2.34,2.56'} parent={this}/>
            <Select hide={true} id="valuesSeparator" prefix="separador" hide={rectType === 'enteros' || rectType === 'mixta' || rectType === 'mixta decimal' || rectType === 'mixta centesimal'} options={valuesSeparatorOptions} parent={this}/>
          </Item>
          <Item id={k++} title="Mostrar" parent={this}>
            <Select id="showExValues" prefix="valores ext" options={yesNoOptions} parent={this}/>
            <Select id="showFirstValue" prefix="primer val" options={['si','no']} parent={this} value={showFirstValue}/>
            <Select id="showAllValues" prefix="valores" options={showTheValuesOpt} parent={this} />
            <Input id="selectValuesToShow" prefix="escoger" type="text" parent={this} hide={showAllValues === 'no' || showAllValues === 'todos'}/>
            <Select id="showPointValue" prefix="punto" options={showPointValueOpt} parent={this}/>
            <Input id="wichPointValue" prefix="valores" type="text" placeholder={'$a.$b$c,2.34,2.56'} parent={this}  hide={showPointValue === 'no'} />
            <Select id="showArcs" prefix="arcos" options={arcsDirectionOptions} parent={this}/>
            <Input id="initArcPt" prefix="desde" type="text" parent={this} hide={showArcs === 'no'}/>
            <Input id="endArcPt" prefix="hasta" type="text" parent={this} hide={showArcs === 'no'}/>
            <Select id="showConstant" prefix="constante" parent={this} hide={showArcs === 'no'} options={['si','no']} value={showConstant}/>
            <Select id="showMiniScale" prefix="mini escala" options={yesNoOptions} parent={this} hide={mostrarMiniRecta}/>
          </Item>
          <Item id={k++} title="Mostrar Imagen" parent={this}>
            <Select id="showFigValue" prefix="figura" options={yesNoOptions} parent={this} value={showFigValue}/>
            { showFigValue === 'si' && <Input id="srcFig1" prefix="src 1" type="text" parent={this} hide={showFigValue == 'no'} value={srcFig1}/> }
            { srcFig1 !== '' && 
              <div>
                <Input id="altoFig1" prefix="alto" type="text" parent={this} hide={showFigValue == 'no'} value={altoFig1}/>
                <Select id="ubicacionFig1" prefix="posicion" parent={this} options={['arriba','abajo']} hide={showFigValue == 'no'} value={ubicacionFig1}/>
                <Input id="textoFig1" prefix="texto" type="text" parent={this} hide={showFigValue == 'no'} value={textoFig1}/>
                <Input id="posicionesFig1" prefix="posiciones" type="text" parent={this} hide={showFigValue == 'no'} value={posicionesFig1}/>
              </div> }
            { showFigValue === 'si' && <Input id="srcFig2" prefix="src 2" type="text" parent={this} hide={showFigValue == 'no'} value={srcFig2}/> }
            { srcFig2 !== '' && 
              <div>
                <Input id="altoFig2" prefix="alto" type="text" parent={this} hide={showFigValue == 'no'} value={altoFig2}/>
                <Select id="ubicacionFig2" prefix="posicion" type="text" parent={this} options={['arriba','abajo']} hide={showFigValue == 'no'} value={ubicacionFig2}/>
                <Input id="textoFig2" prefix="texto" type="text" parent={this} hide={showFigValue == 'no'} value={textoFig2}/>
                <Input id="posicionesFig2" prefix="posiciones" type="text" parent={this} hide={showFigValue == 'no'} value={posicionesFig2}/>
              </div> }
          </Item>
          <Item id={k++} title="Mostrar Tramo Llave" parent={this}>
            <Select id="showTramoLlave" prefix="tramo llave" options={yesNoOptions} parent={this} value={showTramoLlave} />
            <Input id="tramoInicio" prefix="inicio" value={tramoInicio} hide={showTramoLlave === 'no'} parent={this}/>  
            <Input id="tramoFin" prefix="fin" value={tramoFin} hide={showTramoLlave === 'no'} parent={this}/>
            <Input id="tramoColor" prefix="color tramo" value={tramoColor} hide={showTramoLlave === 'no'} parent={this}/>
            <Input id="tramoTexto" prefix="texto" value={tramoTexto} hide={showTramoLlave === 'no'} parent={this}/>
            <Input id="tramoAltoTexto" prefix="alto texto" value={tramoAltoTexto} hide={showTramoLlave === 'no'} parent={this}/>
            <Select id="tramoForma" prefix="forma" options={['igual', 'incluido', 'sin incluir']} value={tramoForma} hide={showTramoLlave === 'no'} parent={this} />
            <Input id="tramoAltura" prefix="altura" value={tramoAltura} hide={showTramoLlave === 'no'} parent={this} />
          </Item>
          <Item id={k++} title="Mini Escala" parent={this} hide={(mostrarMiniRecta  || (showMiniScale === 'no'))}>
            <Input id="showMiniTheValue" prefix="valor" placeholder={'$a.$b$c o 2.34'} parent={this} />
            <Select id="showMiniExValues" prefix="valores ext" options={yesNoOptions} parent={this}/>
            <Select id="showMiniAllValues" prefix="valores" options={yesNoOptions} parent={this}/>
            <Select id="showMiniPointValue" prefix="punto" options={yesNoOptions} parent={this}/>
            <Select id="showMiniFig" prefix="figura" options={showFigValueOpt} parent={this}/>
            {/*<Input id="wichMiniFigValues" prefix="valores" type="text" placeholder={'$a.$b$c,2.34,2.56'} parent={this}  hide={showMiniFig === 'no'} />*/}
            <Select id="showMiniArcs" prefix="arcos" options={arcsDirectionOptions} parent={this}/>
            <Input id="initArcPtMini" prefix="desde" type="text" parent={this} hide={showMiniArcs === 'no'}/>
            <Input id="endArcPtMini" prefix="hasta" type="text" parent={this} hide={showMiniArcs === 'no'}/>
            <Select id="showMiniGuides" prefix="guías" options={yesNoOptions} parent={this}/>
            <Select id="showLens" prefix="lupa" options={yesNoOptions} parent={this} hide={rectType === 'enteros'}/>
            <Select id="alignLens" prefix="alinear" options={['punto','segmento']} parent={this} hide={rectType === 'enteros'}/>
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