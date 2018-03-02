import React, { Component } from 'react'
import { Input, Item, Select, Editor } from 'components'
import * as geometria from 'actions'
import { COLORS } from 'stores'
import $ from 'actions'

export default class PlanoCartesiano extends Component {
	constructor(props) {
		super(props)
		this.state = props.push ? { 
			height:320, width:320, background:COLORS['background'], rows:10, cols:10, active:0,
			borderColor:COLORS['border'], borderRadius:20, borderWidth:3, borderStyle:'solid', gridColor:COLORS['grid'], gridWidth:2,
			fontColor:COLORS['geometria'], fontFamily:'arial', axisColor:'#bb0000', axisWidth:3, axisDisplay:'none'
		} : props.params
	}
	componentDidUpdate() {
		geometria.planoCartesiano({ container:$('container'), params:this.state, variables:this.props.variables })
	}
	handleActive(active) {
		this.setState({ active:active })
	}
	render() {
		const { active, background, borderColor, borderWidth, borderRadius, borderStyle, cols, height, fontColor, fontFamily, 
			gridColor, gridWidth, rows, width, axisColor, axisWidth, axisDisplay } = this.state
		return (
			<Editor title="Plano Cartesiano" params={this.state} store={this.props}>
				<Item id={0} active={active} title="Canvas" setActive={::this.handleActive}>
					<Input id="width" default={width} prefix="width" postfix="px" update={::this.setState} type="number"/>	
					<Input id="height" default={height} prefix="height" postfix="px" update={::this.setState} type="number"/>	
					<Input id="background" default={background} update={::this.setState} type="color"/>
				</Item>
				<Item id={1} active={active} title="Border" setActive={::this.handleActive}>
					<Input id="borderWidth" default={borderWidth} prefix="width" postfix="px" update={::this.setState} type="number"/>	
					<Select id="borderStyle" default={borderStyle} prefix="style" update={::this.setState} options={['solid']}/>
					<Input id="borderColor" default={borderColor} update={::this.setState} type="color"/>
					<Input id="borderRadius" default={borderRadius} prefix="radius" postfix="px" update={::this.setState} type="number"/>
				</Item>
				<Item id={2} active={active} title="Grid" setActive={::this.handleActive}>
					<Input id="rows" default={rows} prefix="rows" postfix="#" update={::this.setState} type="number"/>
					<Input id="cols" default={cols} prefix="cols" postfix="#" update={::this.setState} type="number"/>
					<Input id="gridWidth" default={gridWidth} prefix="width" postfix="px" update={::this.setState} type="number"/>
					<Input id="gridColor" default={gridColor} update={::this.setState} type="color"/>
				</Item>
				<Item id={3} active={active} title="Axis" setActive={::this.handleActive}>
					<Select id="axisDisplay" default={axisDisplay} prefix="display" update={::this.setState} options={['none','block']}/>
					<Input id="axisWidth" default={axisWidth} prefix="width" postfix="px" update={::this.setState} type="number"/>
					<Input id="axisColor" default={axisColor} update={::this.setState} type="color"/>
				</Item>
				<Item id={4} active={active} title="Font" setActive={::this.handleActive}>
					<Select id="fontFamily" default={fontFamily} prefix="family" update={::this.setState} options={['arial']}/>
					<Select id="fontSize" default={'auto'} prefix="size" update={::this.setState} options={['auto']}/>
					<Select id="fontWeight" default={'bold'} prefix="weight" update={::this.setState} options={['bold']}/>
					<Input id="fontColor" default={fontColor} update={::this.setState} type="color"/>
				</Item>
				<Item id={5} active={active} title="Images" setActive={::this.handleActive}>
					<Select id="imageDisplay" default={'none'} prefix="display" update={::this.setState} options={['none','block']}/>
				</Item>
			</Editor>
		)
	}
}