import React, { Component } from 'react'
import { Input, Item, Select, Editor } from 'components'
import * as datos from 'actions'
import { COLORS } from 'stores'
import $ from 'actions'

export default class GraficoDatos extends Component {
	constructor(props) {
		super(props)
		this.state = props.push ? { 
			active:0, background:COLORS['background'], height:450, width:720, axisColor:COLORS['datos'], axisWidth:2, axisTitleX:'Título X', axisTitleY:'Título Y',
			borderColor:'#006400', borderRadius:20, borderWidth:0, borderStyle:'solid', fontColor:COLORS['datos'], lineColor:'#006400', lineWidth:2, 
			dataTag: '1,1,1,1,1', /*withAxis: 'no',*/ chartPosition:'vertical', chartColor:COLORS['datos'], chartValues:'7,1,6,8,4', fontWeight:'normal',
			chartTags:'A,B,C,D,E', titleValue:'Título Principal', titleSize:22, titleColor:'#006400', chartBorder:COLORS['datos'], scaleMax:1, 
			scaleMin:0, scaleInterval:1, scaleColor:'#f2f2f2', scaleWidth:1, fontSize:14, limitVal:'', projectionVal:'1,1,1,1,1', highlightBar:'1,1,1,1,1',
			// Nuevos parámetros
			pictoImg: 'https://desarrolloadaptatin.blob.core.windows.net/imagenesprogramacion/Eje_4/OA-24/cubo_medicion.svg',
			typeGraph: ''/*pictorico*/, chartType: '', /*captVal: '1',*/ captText: 'helado', /*caption: false,*/ rotateTags: 0, rotateValues: 0, barSeparation: 60, 
			showTags: 'si', showValues: 'si', showOrigin: 'no', titleWeight: 'normal', fontFamily: 'Larke Neue Thin', borderBars: 2, canvasPadding: '0,0,0,0',
			containerPadding: '0,0,0,10', chartPadding: '20,10,40,10', innerChartPadding: '30,60', valuesSeparator: 'normal', titleXYSize: 18, dobLinesSize: '10',
			dobLinesGradient: 30,
			// Nuevos Parámetros 03/05
			showCaption: 'si', showValCapt: 'si', captBg: '#ffffff', captBorder: '#dedede', captBorderWidth: '2', showAxisX: 'si', showAxisY: 'si',
			heightImgTag: '40'
		} : props.params
	}
	componentDidUpdate() {
		datos.graficoDatos({ container:$('container'), params:this.state, variables:this.props.variables, vt:true })
	}
	render() {
		let k = 0, fontFamilyOptions = ['Larke Neue Thin', 'Arial', 'Montserrat'], fontWeightOptions=['normal', 'bold'],
				valuesSeparatorOptions=['normal','punto','coma','espacio'], borderCanvas=['solid','dashed','dotted','double'],
				yesNoOptions=['no', 'si']
		return (
			<Editor params={this.state} store={this.props} parent={this}>
				<Item id={k++} title="General" parent={this}>
					<Select id="chartType" prefix="tipo gráfico" options={['simbólico', 'pictórico']} parent={this}/>
					<Select id="chartPosition" prefix="orientación" options={['vertical','horizontal']} parent={this}/>
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
					<Input id="titleColor" type="color" parent={this}/>
					<Input id="titleSize" prefix="tamaño" postfix="px" type="number" parent={this}/>
					<Select id="titleWeight" prefix="estilo" options={fontWeightOptions} parent={this}/>
					<Input id="titleValue" prefix="título" placeholder={'Título'} parent={this}/>
					<Input id="titleXYSize" prefix="tamaño" postfix="px" type="number" parent={this}/>
					<Input id="axisTitleX" prefix="título X" placeholder={'Eje X'} parent={this}/>
					<Input id="axisTitleY" prefix="título Y" placeholder={'Eje Y'} parent={this}/>
				</Item>
				<Item id={k++} title="padding" parent={this}>
					<Input id="canvasPadding" prefix="canvas" postfix="px" parent={this} placeholder={'top,right,bottom,left'} />
					<Input id="containerPadding" prefix="container" postfix="px" parent={this} placeholder={'top,right,bottom,left'} />
					<Input id="chartPadding" prefix="chart" postfix="px" parent={this} placeholder={'top,right,bottom,left'} />
					<Input id="innerChartPadding" prefix="innerchart" postfix="px" parent={this} placeholder={'x,y'} />
				</Item>
				<Item id={k++} title="Valores" parent={this}>
					<Select id="showValues" prefix="mostrar" options={yesNoOptions} parent={this}/>
					<Select id="showOrigin" prefix="mostrar 0" options={yesNoOptions} parent={this}/>
					<Input id="chartValues" prefix="valores" placeholder={'1, 2, 3, 4, 5'} parent={this}/>
					<Select id="valuesSeparator" prefix="separador" options={valuesSeparatorOptions} parent={this}/>
				</Item>
				<Item id={k++} title="Etiquetas" parent={this}>
					<Select id="showTags" prefix="mostrar" options={yesNoOptions} parent={this}/>
					<Input id="chartTags" prefix="etiquetas" placeholder={'A, B, C, D, E'} parent={this}/>
					<Input id="rotateTags" prefix="inclinación" postFix={'°'} placeholder={'0° a 90°'} type="number" parent={this}/>
					<Input id="heightImgTag" prefix="alto" postfix={'%'} placeholder={'imagen etiqueta'} type="number" parent={this}/>
				</Item>
				<Item id={k++} title="barras" parent={this}>
					<Input id="borderBars" prefix="borde" type="number" postfix="px" min="0" max="20" parent={this}/>
					<Input id="chartBorder" prefix="borde" type="color" parent={this}/>
					<Input id="chartColor" prefix="color" type="color" parent={this}/>
					<Input id="barSeparation" prefix="ancho" postfix="%" type="number" min="1" max="100" parent={this}/>
					<Input id="highlightBar" prefix="resaltar" placeholder={'0, 1, 0, 0, 1'} parent={this}/>
				</Item>
				<Item id={k++} title="Escala" parent={this}>
					<Input id="scaleColor" type="color" parent={this}/>
					<Input id="scaleInterval" prefix="intervalo" min="1" type="number" parent={this}/>
					<Input id="scaleWidth" prefix="grosor" postfix="px" type="number" parent={this}/>
					<Input id="scaleMax" prefix="máximo" type="number" parent={this}/>
					<Input id="scaleMin" prefix="mínimo" type="number" parent={this}/>
					<Input id="dobLinesSize" prefix="doblelínea" type="number" min="1" max="100" parent={this}/>
					<Input id="dobLinesGradient" prefix="inclinación" type="number" min="1" max="100" parent={this}/>
				</Item>
				<Item id={k++} title="Ejes" parent={this}>
					<Select id="showAxisX" prefix="eje x" options={yesNoOptions} parent={this}/>
					<Select id="showAxisY" prefix="eje y" options={yesNoOptions} parent={this}/>
					<Input id="axisWidth" prefix="grosor" postfix="px" type="number" parent={this}/>
					<Input id="axisColor" type="color" parent={this}/>
					<Select id="withArrowsX" prefix="flecha x" options={yesNoOptions} parent={this}/>
					<Select id="withArrowsY" prefix="flecha y" options={yesNoOptions} parent={this}/>
				</Item>
				<Item id={k++} title="Lineas" parent={this}>
					<Input id="lineColor" type="color" placeholder={'0, 1, 0, 0, 1'} parent={this}/>
					<Input id="lineWidth" prefix="grosor" postfix="px" type="number" parent={this}/>
					<Input id="dataTag" prefix="etiquetas" placeholder={'0, 1, 0, 0, 1'} parent={this}/>
					<Input id="limitVal" prefix="limites" type="text" placeholder={'2,5,3'} parent={this}/>
					<Input id="projectionVal" prefix="proyectar" type="text" placeholder={'0, 1, 0, 0, 1'} parent={this}/>
				</Item>
				<Item id={k++} title="Fuente" parent={this}>
					<Input id="fontColor" type="color" parent={this}/>
					<Input id="fontSize" prefix="tamaño" postfix="px" type="number" parent={this}/>
					<Select id="fontFamily" prefix="tipo" options={fontFamilyOptions} parent={this}/>
					<Select id="fontWeight" prefix="estilo" options={fontWeightOptions} parent={this}/>
				</Item>
				<Item id={k++} title="Leyenda" parent={this}>
					<Select id="showCaption" prefix="mostrar" options={yesNoOptions} parent={this}/>
					<Input id="pictoImg" prefix="url imagen" type="text" parent={this}/>
					{/*<Input id="captVal" prefix="valor" postfix="px" type="number" parent={this}/>*/}
					<Select id="showValCapt" prefix="mostrar valor" options={yesNoOptions} parent={this}/>
					<Input id="captText" prefix="texto" type="text" parent={this}/>
					<Input id="captBg" prefix="fondo" type="color" parent={this}/>
					<Input id="captBorder" prefix="borde color" type="color" parent={this}/>
					<Input id="captBorderWidth" prefix="borde ancho" type="number" parent={this}/>
				</Item>
			</Editor>
		)
	}
}