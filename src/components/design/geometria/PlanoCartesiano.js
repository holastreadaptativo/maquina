import React, { Component } from 'react'
import { Tabs, Input, Item, Select } from 'components'
import * as geometria from 'actions'
import { COLORS } from 'stores'

export default class PlanoCartesiano extends Component {
	constructor() {
		super()
		this.state = { height:320, width:320, background:COLORS['background'], rows:10, cols:10, active:0,
			borderColor:COLORS['border'], borderRadius:20, borderWidth:3, borderStyle:'solid', gridColor:COLORS['grid'], gridWidth:2,
			fontColor:COLORS['geometria'], fontFamily:'arial', axisColor:'#bb0000', axisWidth:3, axisDisplay:'none'
		}
	}
	componentDidUpdate() {
		let canvas = this.refs.canvas
		geometria.generarPlanoCartesiano(canvas, this.state)
		geometria.generarCuadradosUnidos(canvas, this.state)
		//geometria.generarPlanoCartesiano(canvas, this.state)
		//geometria.dividirPlanoCartesiano(canvas, this.state)
   		//geometria.reflejarCuadrado(canvas, this.state)  
	}
	handleActive(active) {
		this.setState({ active:active })
	}
	render() {
		const { active, background, borderColor, borderWidth, borderRadius, borderStyle, cols, height, fontColor, fontFamily, 
			gridColor, gridWidth, rows, width, axisColor, axisWidth, axisDisplay } = this.state
		let items = ['wallpaper','border_style','apps','border_inner','text_fields','image']
		return (
			<div class="modal-canvas modal-geometria">
				<h4 class="modal-title">Plano Cartesiano</h4>
				<Tabs active={active} setActive={(i) => this.handleActive.bind(this, i)} items={items}/>
				<div class="modal-items">
					<Item id={0} active={active} title="Canvas">
						<Input id="width" default={width} prefix="width" postfix="px" update={this.setState.bind(this)} type="number"/>	
						<Input id="height" default={height} prefix="height" postfix="px" update={this.setState.bind(this)} type="number"/>	
						<Input id="background" default={background} update={this.setState.bind(this)} type="color"/>
					</Item>
					<Item id={1} active={active} title="Border">
						<Input id="borderWidth" default={borderWidth} prefix="width" postfix="px" update={this.setState.bind(this)} type="number"/>	
						<Select id="borderStyle" default={borderStyle} prefix="style" update={this.setState.bind(this)} options={['solid']}/>
						<Input id="borderColor" default={borderColor} update={this.setState.bind(this)} type="color"/>
						<Input id="borderRadius" default={borderRadius} prefix="radius" postfix="px" update={this.setState.bind(this)} type="number"/>
					</Item>
					<Item id={2} active={active} title="Grid">
						<Input id="rows" default={rows} prefix="rows" postfix="#" update={this.setState.bind(this)} type="number"/>
						<Input id="cols" default={cols} prefix="cols" postfix="#" update={this.setState.bind(this)} type="number"/>
						<Input id="gridWidth" default={gridWidth} prefix="width" postfix="px" update={this.setState.bind(this)} type="number"/>
						<Input id="gridColor" default={gridColor} update={this.setState.bind(this)} type="color"/>
					</Item>
					<Item id={3} active={active} title="Axis">
						<Select id="axisDisplay" default={axisDisplay} prefix="display" update={this.setState.bind(this)} options={['none','block']}/>
						<Input id="axisWidth" default={axisWidth} prefix="width" postfix="px" update={this.setState.bind(this)} type="number"/>
						<Input id="axisColor" default={axisColor} update={this.setState.bind(this)} type="color"/>
					</Item>
					<Item id={4} active={active} title="Font">
						<Select id="fontFamily" default={fontFamily} prefix="family" update={this.setState.bind(this)} options={['arial']}/>
						<Select id="fontSize" default={'auto'} prefix="size" update={this.setState.bind(this)} options={['auto']}/>
						<Select id="fontWeight" default={'bold'} prefix="weight" update={this.setState.bind(this)} options={['bold']}/>
						<Input id="fontColor" default={fontColor} update={this.setState.bind(this)} type="color"/>
					</Item>
					<Item id={5} active={active} title="Images">
						<Select id="imageDisplay" default={'none'} prefix="display" update={this.setState.bind(this)} options={['none','block']}/>
					</Item>
				</div>
				<div class="canvas">
					<canvas ref="canvas" id="canvas" style={{ background:background, width:`${width}px`, height:`${height}px`, 
					border:`${borderWidth}px ${borderStyle} ${borderColor}`, borderRadius:`${borderRadius}px` }}>
						Your browser does not support the HTML5 canvas.
					</canvas>
				</div>	
				<div class="button">
					<button onClick={this.props.add(this.refs.canvas)}>Agregar</button>
				</div>	
			</div>
		)
	}
}