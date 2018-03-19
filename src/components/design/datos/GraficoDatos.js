import React, { Component } from 'react'
import { Input, Item, Select, Editor } from 'components'
import * as datos from 'actions'
import { COLORS } from 'stores'
import $ from 'actions'

export default class GraficoDatos extends Component {
	constructor(props) {
		super(props)
		this.state = props.push ? { 
			background:COLORS['background'], height:450, width:720, axisColor:COLORS['datos'], axisWidth:2, axisTitleX:'', axisTitleY:'', active:0,
			borderColor:'#006400', borderRadius:20, borderWidth:0, borderStyle:'solid', fontColor:COLORS['datos'], lineColor:'#006400', lineWidth:2, 
			extra:'no', dataTag: '', withAxis: 'no', margin:'no', chartPosition:'vertical', chartColor:COLORS['datos'], chartValues:'7, 5, 6, 8, 4', chartTags:'A, B, C, D, E', 
			titleValue:'', titleSize:22, titleColor:'#006400', titleTop:35, chartBorder:COLORS['datos'], scaleMax:0, scaleMin:0, scaleInterval:1, 
			scaleColor: '' /*COLORS['grid']*/, scaleWidth:1, fontSize:14, limitVal: '', highlightBar: ''
		} : props.params
	}
	componentDidUpdate() {
		datos.graficoDatos({ container:$('container'), params:this.state, variables:this.props.variables, versions:[], vt:true })
	}
	handleActive(active) {
		this.setState({ active:active })
	}
	render() {
		const { active, background, borderColor, borderWidth, borderRadius, borderStyle, height, fontColor, fontFamily, width, axisColor, axisWidth,
			chartPosition, chartColor, chartValues, chartTags, titleValue, titleSize, titleColor, axisTitleX, axisTitleY, lineColor, lineWidth, 
			extra, dataTag, withAxis, margin, titleTop, chartBorder, scaleMin, scaleMax, scaleInterval, scaleColor, scaleWidth, fontSize, limitVal, highlightBar } = this.state
			let k = 0
		return (
			<Editor title="Gráfico Datos" params={this.state} store={this.props}>
				<Item id={k++} active={active} title="Canvas" setActive={::this.handleActive}>
					<Input id="height" default={height} prefix="height" postfix="px" update={::this.setState} type="number"/>	
					<Input id="width" default={width} prefix="width" postfix="px" update={::this.setState} type="number"/>	
					<Input id="background" default={background} update={::this.setState} type="color"/>
					<Select id="margin" default={margin} prefix="margin" update={::this.setState} options={['si', 'no']}/>
				</Item>
				<Item id={k++} active={active} title="Border" setActive={::this.handleActive}>
					<Input id="borderWidth" default={borderWidth} prefix="width" postfix="px" update={::this.setState} type="number"/>	
					<Select id="borderStyle" default={borderStyle} prefix="style" update={::this.setState} options={['solid']}/>
					<Input id="borderColor" default={borderColor} update={::this.setState} type="color"/>
					<Input id="borderRadius" default={borderRadius} prefix="radius" postfix="px" update={::this.setState} type="number"/>
				</Item>
				<Item id={k++} active={active} title="Chart" setActive={::this.handleActive}>
					<Select id="chartPosition" default={chartPosition} prefix="position" update={::this.setState} options={['vertical','horizontal']}/>
					<Input id="chartColor" default={chartColor} update={::this.setState} type="color"/>
					<Input id="chartBorder" default={chartBorder} prefix="border" update={::this.setState} type="color"/>
					<Input id="chartValues" default={chartValues} prefix="values" placeholder={'1, 2, 3, 4, 5'} update={::this.setState} type="text"/>
					<Input id="chartTags" default={chartTags} prefix="tags" placeholder={'A, B, C, D, E'} update={::this.setState} type="text"/>
					<Input id="dataTag" default={dataTag} prefix="datatag" update={::this.setState} placeholder={'0,1,0,0,1'}/>
					<Input id="highlightBar" default={highlightBar} prefix="highlight" placeholder={'0,1,0,0,1'} update={::this.setState} type="text"/>
				</Item>
				<Item id={k++} active={active} title="Axis" setActive={::this.handleActive}>
					<Input id="axisColor" default={axisColor} update={::this.setState} type="color"/>
					<Input id="axisWidth" default={axisWidth} prefix="width" postfix="px" update={::this.setState} type="number"/>
					<Input id="axisTitleX" default={axisTitleX} prefix="title x" placeholder={'Eje X'} update={::this.setState} type="text"/>
					<Input id="axisTitleY" default={axisTitleY} prefix="title y" placeholder={'Eje Y'} update={::this.setState} type="text"/>
					<Select id="withAxis" default={withAxis} prefix="arrows" update={::this.setState} options={['no', 'si']}/>
				</Item>
				<Item id={k++} active={active} title="Scale" setActive={::this.handleActive}>
					<Input id="scaleMax" default={scaleMax} prefix="max" update={::this.setState} type="number"/>
					<Input id="scaleMin" default={scaleMin} prefix="min" update={::this.setState} type="number"/>
					<Input id="scaleInterval" default={scaleInterval} prefix="interval" update={::this.setState} type="number"/>
					<Input id="scaleWidth" default={scaleWidth} prefix="width" postfix="px" update={::this.setState} type="number"/>
					<Input id="scaleColor" default={scaleColor} update={::this.setState} type="color"/>
				</Item>
				<Item id={k++} active={active} title="Title" setActive={::this.handleActive}>
					<Input id="titleValue" default={titleValue} prefix="title" placeholder={'Título'} update={::this.setState} type="text"/>
					<Input id="titleSize" default={titleSize} prefix="size" postfix="px" update={::this.setState} type="number"/>
					<Input id="titleColor" default={titleColor} update={::this.setState} type="color"/>
					<Input id="titleTop" default={titleTop} prefix="top" postfix="px" update={::this.setState} type="number"/>
				</Item>
				<Item id={k++} active={active} title="Font" setActive={::this.handleActive}>
					<Select id="fontFamily" default={fontFamily} prefix="family" update={::this.setState} options={['arial']}/>
					<Select id="fontWeight" default={'bold'} prefix="weight" update={::this.setState} options={['bold']}/>
					<Input id="fontSize" default={fontSize} prefix="size" postfix="px" update={::this.setState} type="number"/>
					<Input id="fontColor" default={fontColor} update={::this.setState} type="color"/>
				</Item>
				<Item id={k++} active={active} title="Lines" setActive={::this.handleActive}>
					<Select id="extra" default={extra} prefix="lines" update={::this.setState} options={['no', 'proyeccion', 'limite']}/>
					{
						extra == 'limite' && (
							<Input id="limitVal" default={limitVal} prefix="values" update={::this.setState} type="text" placeholder="$a,1,$b,2"/>
						)
					}
					<Input id="lineColor" default={lineColor} update={::this.setState} type="color"/>
					<Input id="lineWidth" default={lineWidth} prefix="width" postfix="px" update={::this.setState} type="number"/>	
				</Item>
			</Editor>
		)
	}
}