import React, { Component } from 'react'
import { Input, Item, Select, Editor } from 'components'
import * as geometria from 'actions'
import { COLORS } from 'stores'
import $ from 'actions'

export default class PlanoCartesiano extends Component {
	constructor(props) {
		super(props)
		this.state = props.push ? { 
			height:320, width:320, background:COLORS['background'], rows:10, cols:10, active:0, borderColor:COLORS['border'], borderRadius:20, borderWidth:3, 
			borderStyle:'solid', gridColor:COLORS['grid'], gridWidth:2, imageDisplay:'none', fontColor:COLORS['geometria'], fontFamily:'arial', axisColor:'#bb0000', 
			axisWidth:3, axisDisplay:'none', fontSize:'auto', fontWeight:'bold', gridType:'simbólico', exerciseType:'traslación', line:0, figureType:'default', 
			px1:2, py1:7, px2:7, py2:2
		} : props.params
	}
	componentDidUpdate() {
		geometria.planoCartesiano({ container:$('container'), params:this.state, variables:this.props.variables, vt:true })
	}
	render() {
		let k = 0
		return (
			<Editor params={this.state} store={this.props} parent={this}>
				<Item id={k++} title="General" parent={this}>
					<Select id="gridType" prefix="tipo plano" options={['simbólico', 'pictórico']} parent={this}/>
					<Select id="exerciseType" prefix="tipo ejercicio" options={['traslación', 'reflexión']} parent={this}/>
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
				<Item id={k++} title="Ejes" parent={this} hide={this.state.exerciseType != 'reflexión'}>
					<Input id="axisWidth" prefix="ancho" postfix="px" type="number" parent={this}/>
					<Input id="axisColor" type="color" parent={this}/>
					<Select id="axisDisplay" prefix="mostrar" options={['si','no']} parent={this}/>
				</Item>
				<Item id={k++} title="Figuras" parent={this}>
					<Select id="figureType" prefix="tipo" options={['default','imágenes']} parent={this}/>
					<Input id="px1" type="number" prefix="posición x1" parent={this}/>
					<Input id="py1" type="number" prefix="posición y1" parent={this}/>
					<Input id="px2" type="number" prefix="posición x2" parent={this}/>
					<Input id="py2" type="number" prefix="posición y2" parent={this}/>
				</Item>
				<Item id={k++} title="Fuente" parent={this}>
					<Input id="fontColor" type="color" parent={this}/>
					<Select id="fontWeight" prefix="estilo" options={['bold']} parent={this}/>
					<Select id="fontFamily" prefix="familia" options={['arial']} parent={this}/>
					<Select id="fontSize" prefix="tamaño" options={['auto']} parent={this}/>
				</Item>
			</Editor>
		)
	}
}