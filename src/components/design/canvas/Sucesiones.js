import React, { Component } from 'react'
import { Input, Item, Select, Editor } from 'components'
import * as algebra from 'actions'
import { COLORS } from 'stores'
import $ from 'actions'

export default class Sucesiones extends Component {
	constructor(props) {
		super(props)
		this.state = props.push ? { 
			active:0, height:320, width:320, background:COLORS['background'], rows:10, cols:10, borderColor:COLORS['border'], borderRadius:10, borderWidth:2, 
			borderStyle:'solid', gridColor:COLORS['grid'], gridWidth:2, gridType:'simbólico'
		} : props.params
	}
	componentDidUpdate() {
		algebra.sucesiones({ container:$('container'), params:this.state, variables:this.props.variables, vt:true })
	}
	render() {
		let k = 0
		return (
			<Editor params={this.state} store={this.props} parent={this}>
				<Item id={k++} title="General" parent={this}>
					<Select id="gridType" prefix="tipo plano" options={['simbólico', 'pictórico']} parent={this}/>
					<Input id="height" prefix="alto" postfix="px" type="number" parent={this}/>	
					<Input id="width" prefix="ancho" postfix="px" type="number" parent={this}/>
					<Input id="background" type="color" parent={this}/>
				</Item>
				<Item id={k++} title="Borde" parent={this}>
					<Input id="borderWidth" prefix="ancho" postfix="px" type="number" parent={this}/>	
					<Input id="borderColor" type="color" parent={this}/>
					<Select id="borderStyle" prefix="estilo" options={['solid']} parent={this}/>
					<Input id="borderRadius" prefix="radio" postfix="px" type="number" parent={this}/>
				</Item>
				<Item id={k++} title="Grilla" parent={this}>
					<Input id="rows" prefix="filas" postfix="#" type="number" parent={this}/>
					<Input id="cols" prefix="columnas" postfix="#" type="number" parent={this}/>
					<Input id="gridWidth" prefix="grosor" postfix="px" type="number" parent={this}/>
					<Input id="gridColor" type="color" parent={this}/>
				</Item>
			</Editor>
		)
	}
}