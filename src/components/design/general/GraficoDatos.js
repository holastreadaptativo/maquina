import React, { Component } from 'react'
import { Input, Item, Select, Editor } from 'components'
import * as datos from 'actions'
import { COLORS } from 'stores'
import $ from 'actions'

export default class GraficoDatos extends Component {
	constructor(props) {
		super(props)
		this.state = props.push ? { 
			active:0, background:COLORS['background'], height:450, width:720, axisColor:COLORS['datos'], axisWidth:2, axisTitleX:'', axisTitleY:'',
			borderColor:'#006400', borderRadius:20, borderWidth:0, borderStyle:'solid', fontColor:COLORS['datos'], lineColor:'#006400', lineWidth:2, 
			dataTag: '0,1', withAxis: 'no', margin:'70, 90', chartPosition:'vertical', chartColor:COLORS['datos'], chartValues:'7, 5, 6, 8, 4', 
			chartTags:'A, B, C, D, E', titleValue:'', titleSize:22, titleColor:'#006400', titleTop:35, chartBorder:COLORS['datos'], scaleMax:0, 
			scaleMin:0, scaleInterval:1, scaleColor:COLORS['datos'], scaleWidth:1, fontSize:14, limitVal:'0,1', projectionVal:'0,1', highlightBar:''
		} : props.params
	}
	componentDidUpdate() {
		datos.graficoDatos({ container:$('container'), params:this.state, variables:this.props.variables, vt:true })
	}
	handleActive(active) {
		this.setState({ active:active })
	}
	render() {
		const { active, background, borderColor, borderWidth, borderRadius, borderStyle, height, fontColor, fontFamily, width, axisColor, axisWidth,
			chartPosition, chartColor, chartValues, chartTags, titleValue, titleSize, titleColor, axisTitleX, axisTitleY, lineColor, lineWidth, dataTag, 
			withArrowsX, withArrowsY, margin, titleTop, chartBorder, scaleMin, scaleMax, scaleInterval, scaleColor, scaleWidth, fontSize, limitVal, 
			projectionVal, highlightBar } = this.state; let k = 0
		return (
			<Editor title="Gráfico Datos" params={this.state} store={this.props}>
				<Item id={k++} active={active} title="Canvas" setActive={::this.handleActive}>
					<Input id="height" default={height} prefix="alto" postfix="px" update={::this.setState} type="number"/>	
					<Input id="width" default={width} prefix="ancho" postfix="px" update={::this.setState} type="number"/>	
					<Input id="background" default={background} update={::this.setState} type="color"/>
					<Input id="margin" default={margin} prefix="margen" postfix="px" update={::this.setState} type="text"/>
				</Item>
				<Item id={k++} active={active} title="Títulos" setActive={::this.handleActive}>
					<Input id="titleColor" default={titleColor} update={::this.setState} type="color"/>
					<Input id="titleTop" default={titleTop} prefix="margen" postfix="px" update={::this.setState} type="number"/>
					<Input id="titleSize" default={titleSize} prefix="tamaño" postfix="px" update={::this.setState} type="number"/>
					<Input id="titleValue" default={titleValue} prefix="texto" placeholder={'Título'} update={::this.setState} type="text"/>
				</Item>
				<Item id={k++} active={active} title="Gráfico" setActive={::this.handleActive}>
					<Input id="chartBorder" default={chartBorder} prefix="borde" update={::this.setState} type="color"/>
					<Input id="chartColor" default={chartColor} update={::this.setState} type="color"/>
					<Input id="chartTags" default={chartTags} prefix="etiquetas" placeholder={'A, B, C, D, E'} update={::this.setState} type="text"/>
					<Select id="chartPosition" default={chartPosition} prefix="orientación" update={::this.setState} options={['vertical','horizontal']}/>
					<Input id="chartValues" default={chartValues} prefix="valores" placeholder={'1, 2, 3, 4, 5'} update={::this.setState} type="text"/>
				</Item>
				<Item id={k++} active={active} title="Escala" setActive={::this.handleActive}>
					<Input id="scaleColor" default={scaleColor} update={::this.setState} type="color"/>
					<Input id="scaleInterval" default={scaleInterval} prefix="intervalo" min="1" update={::this.setState} type="number"/>
					<Input id="scaleWidth" default={scaleWidth} prefix="grosor" postfix="px" update={::this.setState} type="number"/>
					<Input id="scaleMax" default={scaleMax} prefix="máximo" update={::this.setState} type="number"/>
					<Input id="scaleMin" default={scaleMin} prefix="mínimo" update={::this.setState} type="number"/>
				</Item>
				<Item id={k++} active={active} title="Ejes" setActive={::this.handleActive}>
					<Input id="axisColor" default={axisColor} update={::this.setState} type="color"/>
					<Select id="withArrowsX" default={withArrowsX} prefix="flecha x" update={::this.setState} options={['no', 'si']}/>
					<Select id="withArrowsY" default={withArrowsY} prefix="flecha y" update={::this.setState} options={['no', 'si']}/>
					<Input id="axisWidth" default={axisWidth} prefix="grosor" postfix="px" update={::this.setState} type="number"/>
					<Input id="axisTitleX" default={axisTitleX} prefix="titulo x" placeholder={'Eje X'} update={::this.setState} type="text"/>
					<Input id="axisTitleY" default={axisTitleY} prefix="titulo y" placeholder={'Eje Y'} update={::this.setState} type="text"/>
				</Item>
				<Item id={k++} active={active} title="Lineas" setActive={::this.handleActive}>
					<Input id="lineColor" default={lineColor} update={::this.setState} type="color" placeholder={'0,1,0,0,1'}/>
					<Input id="lineWidth" default={lineWidth} prefix="grosor" postfix="px" update={::this.setState} type="number"/>
					<Input id="dataTag" default={dataTag} prefix="etiquetas" update={::this.setState} placeholder={'0,1,0,0,1'}/>
					<Input id="limitVal" default={limitVal} prefix="limites" update={::this.setState} type="text" placeholder={'$a,$b,$c'}/>
					<Input id="projectionVal" default={projectionVal} prefix="proyectar" update={::this.setState} type="text" placeholder={'0,1,0,0,1'}/>
					<Input id="highlightBar" default={highlightBar} prefix="resaltar" placeholder={'0,1,0,0,1'} update={::this.setState} type="text"/>
				</Item>
				<Item id={k++} active={active} title="Borde" setActive={::this.handleActive}>
					<Input id="borderColor" default={borderColor} update={::this.setState} type="color"/>
					<Select id="borderStyle" default={borderStyle} prefix="estilo" update={::this.setState} options={['solid']}/>
					<Input id="borderWidth" default={borderWidth} prefix="grosor" postfix="px" update={::this.setState} type="number"/>	
					<Input id="borderRadius" default={borderRadius} prefix="radio" postfix="px" update={::this.setState} type="number"/>
				</Item>
				<Item id={k++} active={active} title="Fuente" setActive={::this.handleActive}>
					<Input id="fontColor" default={fontColor} update={::this.setState} type="color"/>
					<Select id="fontWeight" default={'bold'} prefix="estilo" update={::this.setState} options={['bold']}/>
					<Input id="fontSize" default={fontSize} prefix="tamaño" postfix="px" update={::this.setState} type="number"/>
					<Select id="fontFamily" default={fontFamily} prefix="tipo" update={::this.setState} options={['Larke Neue Thin']}/>
				</Item>
			</Editor>
		)
	}
}