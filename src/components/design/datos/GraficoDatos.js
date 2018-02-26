import React, { Component } from 'react'
import { Tabs, Input, Item, Select, Save } from 'components'
import * as datos from 'actions'
import { COLORS } from 'stores'

export default class GraficoDatos extends Component {
	constructor(props) {
		super(props)
		if (props.push) {
			this.state = { background:COLORS['background'], height:400, width:720, axisColor:COLORS['datos'], axisWidth:2, axisTitleX:'', axisTitleY:'',
				active:0, borderColor:'#006400', borderRadius:20, borderWidth:3, borderStyle:'solid', fontColor:COLORS['datos'], extra:'no', margin:'si', 
				lineColor:'#006400', lineWidth:2, chartPosition:'vertical', chartColor:COLORS['datos'], chartValues:'7, 5, 6', chartTags:'A, B, C', 
				titleValue:'', titleSize:22, titleColor:'#006400', titleTop:40			
			}
		}
		else {
			this.state = props.params
		}
	}
	componentDidUpdate() {
		datos.graficoDatos({ container:this.refs.canvas, params:this.state, variables:this.props.variables })
	}
	handleActive(active) {
		this.setState({ active:active })
	}
	render() {
		const { active, background, borderColor, borderWidth, borderRadius, borderStyle, height, fontColor, fontFamily, width, axisColor, axisWidth,
			chartPosition, chartColor, chartValues, chartTags, titleValue, titleSize, titleColor, axisTitleX, axisTitleY, lineColor, lineWidth, 
			extra, margin, titleTop } = this.state
		let items = ['wallpaper','border_style','equalizer','call_made','title','text_fields', 'dehaze']
		return (
			<div class="modal-canvas modal-datos">
				<h4 class="modal-title">Gráfico Datos</h4>
				<Tabs active={active} setActive={(i) => this.handleActive.bind(this, i)} items={items}/>
				<div class="modal-items">
					<Item id={0} active={active} title="Canvas">
						<Input id="width" default={width} prefix="width" postfix="px" update={this.setState.bind(this)} type="number"/>	
						<Input id="height" default={height} prefix="height" postfix="px" update={this.setState.bind(this)} type="number"/>	
						<Input id="background" default={background} update={this.setState.bind(this)} type="color"/>
						<Select id="margin" default={margin} prefix="margin" update={this.setState.bind(this)} options={['si', 'no']}/>
					</Item>
					<Item id={1} active={active} title="Border">
						<Input id="borderWidth" default={borderWidth} prefix="width" postfix="px" update={this.setState.bind(this)} type="number"/>	
						<Select id="borderStyle" default={borderStyle} prefix="style" update={this.setState.bind(this)} options={['solid']}/>
						<Input id="borderColor" default={borderColor} update={this.setState.bind(this)} type="color"/>
						<Input id="borderRadius" default={borderRadius} prefix="radius" postfix="px" update={this.setState.bind(this)} type="number"/>
					</Item>
					<Item id={2} active={active} title="Chart">
						<Select id="chartPosition" default={chartPosition} prefix="position" update={this.setState.bind(this)} options={['vertical','horizontal']}/>
						<Input id="chartColor" default={chartColor} update={this.setState.bind(this)} type="color"/>
						<Input id="chartValues" default={chartValues} prefix="values" placeholder={'1, 2, 3, 4, 5'} update={this.setState.bind(this)} type="text"/>
						<Input id="chartTags" default={chartTags} prefix="tags" placeholder={'A, B, C, D, E'} update={this.setState.bind(this)} type="text"/>
					</Item>
					<Item id={3} active={active} title="Axis">
						<Input id="axisWidth" default={axisWidth} prefix="width" postfix="px" update={this.setState.bind(this)} type="number"/>
						<Input id="axisColor" default={axisColor} update={this.setState.bind(this)} type="color"/>
						<Input id="axisTitleX" default={axisTitleX} prefix="title x" placeholder={'Eje X'} update={this.setState.bind(this)} type="text"/>
						<Input id="axisTitleY" default={axisTitleY} prefix="title y" placeholder={'Eje Y'} update={this.setState.bind(this)} type="text"/>
					</Item>
					<Item id={4} active={active} title="Title">
						<Input id="titleValue" default={titleValue} prefix="title" placeholder={'Título'} update={this.setState.bind(this)} type="text"/>
						<Input id="titleSize" default={titleSize} prefix="size" postfix="px" update={this.setState.bind(this)} type="number"/>
						<Input id="titleColor" default={titleColor} update={this.setState.bind(this)} type="color"/>
						<Input id="titleTop" default={titleTop} prefix="top" postfix="px" update={this.setState.bind(this)} type="number"/>
					</Item>
					<Item id={5} active={active} title="Font">
						<Select id="fontFamily" default={fontFamily} prefix="family" update={this.setState.bind(this)} options={['arial']}/>
						<Select id="fontSize" default={'auto'} prefix="size" update={this.setState.bind(this)} options={['auto']}/>
						<Select id="fontWeight" default={'bold'} prefix="weight" update={this.setState.bind(this)} options={['bold']}/>
						<Input id="fontColor" default={fontColor} update={this.setState.bind(this)} type="color"/>
					</Item>
					<Item id={6} active={active} title="Lines">
						<Select id="extra" default={extra} prefix="lines" update={this.setState.bind(this)} options={['no', 'proyeccion', 'limite']}/>
						<Input id="lineColor" default={lineColor} update={this.setState.bind(this)} type="color"/>
						<Input id="lineWidth" default={lineWidth} prefix="width" postfix="px" update={this.setState.bind(this)} type="number"/>	
					</Item>
				</div>
				<div class="canvas">
					<canvas ref="canvas" style={{ background:background, width:`${width}px`, height:`${height}px`, 
					border:`${borderWidth}px ${borderStyle} ${borderColor}`, borderRadius:`${borderRadius}px` }}>
						Your browser does not support the HTML5 canvas.
					</canvas>
				</div>
				<Save {...this.props} params={this.state}/>
			</div>
		)
	}
}