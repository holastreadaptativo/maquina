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
			borderColor:COLORS['border'], borderRadius:20, borderWidth:3, borderStyle:'solid', gridColor:COLORS['grid'], gridWidth:2, imageDisplay:'none',
			fontColor:COLORS['geometria'], fontFamily:'arial', axisColor:'#bb0000', axisWidth:3, axisDisplay:'none', fontSize:'auto', fontWeight:'bold'
		} : props.params
	}
	componentDidUpdate() {
		geometria.planoCartesiano({ container:$('container'), params:this.state, variables:this.props.variables, vt:true })
	}
	render() {
		let k = 0
		return (
			<Editor params={this.state} store={this.props} parent={this}>
				<Item id={k++} title="Canvas" parent={this}>
					<Input id="width" prefix="width" postfix="px" type="number" parent={this}/>	
					<Input id="height" prefix="height" postfix="px" type="number" parent={this}/>	
					<Input id="background" type="color" parent={this}/>
				</Item>
				<Item id={k++} title="Border" parent={this}>
					<Input id="borderWidth" prefix="width" postfix="px" type="number" parent={this}/>	
					<Select id="borderStyle" prefix="style" options={['solid']} parent={this}/>
					<Input id="borderColor" type="color" parent={this}/>
					<Input id="borderRadius" prefix="radius" postfix="px" type="number" parent={this}/>
				</Item>
				<Item id={k++} title="Grid" parent={this}>
					<Input id="rows" prefix="rows" postfix="#" type="number" parent={this}/>
					<Input id="cols" prefix="cols" postfix="#" type="number" parent={this}/>
					<Input id="gridWidth" prefix="width" postfix="px" type="number" parent={this}/>
					<Input id="gridColor" type="color" parent={this}/>
				</Item>
				<Item id={k++} title="Axis" parent={this}>
					<Select id="axisDisplay" prefix="display" options={['none','block']} parent={this}/>
					<Input id="axisWidth" prefix="width" postfix="px" type="number" parent={this}/>
					<Input id="axisColor" type="color" parent={this}/>
				</Item>
				<Item id={k++} title="Font" parent={this}>
					<Select id="fontFamily" prefix="family" options={['arial']} parent={this}/>
					<Select id="fontSize" prefix="size" options={['auto']} parent={this}/>
					<Select id="fontWeight" prefix="weight" options={['bold']} parent={this}/>
					<Input id="fontColor" type="color" parent={this}/>
				</Item>
				<Item id={k++} title="Images" parent={this}>
					<Select id="imageDisplay" prefix="display" options={['none','block']} parent={this}/>
				</Item>
			</Editor>
		)
	}
}