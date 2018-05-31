import React, { Component } from 'react'
import { Input, Item, Select, Editor } from 'components'
import * as geometria from 'actions'
import { COLORS } from 'stores'
import $ from 'actions'

export default class PlanoCartesiano extends Component {
	constructor(props) {
		super(props)
		this.state = props.push ? { 
			active:0, height:320, width:320, background:COLORS['background'], rows:10, cols:10, borderColor:COLORS['border'], borderRadius:10, borderWidth:2, 
			borderStyle:'solid', gridColor:COLORS['grid'], gridWidth:2, imageDisplay:'none', fontColor:COLORS['geometria'], fontFamily:'arial', axisColor:'#ffa500', 
			axisWidth:3, axisOrientation:'vertical', fontSize:'auto', fontWeight:'bold', gridType:'simbólico', exerciseType:'traslación', line:0, figureType:'default', 
			px1:2, py1:7, px2:7, py2:2, px3:5, py3:4, px4:3, py4:8, img1:'', img2:'', img3:'', img4:'', figureSize:2, axisTags:'si', exerciseImg:'imágenes'
		} : props.params
	}
	componentDidUpdate() {
		geometria.planoCartesiano({ container:$('container'), params:this.state, variables:this.props.variables, vt:true })
	}
	render() {
		const { gridType } = this.state
		let k = 0, t = this.state.exerciseType, s = this.state.figureSize
		return (
			<Editor params={this.state} store={this.props} parent={this}>
				<Item id={k++} title="General" parent={this}>
					<Select id="gridType" prefix="tipo plano" options={['simbólico', 'pictórico']} parent={this}/>
					<Select id="exerciseType" prefix="tipo ejercicio" options={['traslación', 'reflexión']} parent={this} hide={gridType != 'simbólico'}/>
					<Select id="exerciseImg" prefix="tipo ejercicio" options={['imágenes']} parent={this} hide={gridType != 'pictórico'} disabled/>
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
				<Item id={k++} title="Ejes" parent={this} hide={t != 'reflexión' || gridType == 'pictórico'}>
					<Input id="axisWidth" prefix="ancho" postfix="px" type="number" parent={this}/>
					<Input id="axisColor" type="color" parent={this}/>
					<Select id="axisOrientation" prefix="mostrar" options={['vertical','horizontal', 'ascendente', 'descendente']} parent={this}/>
				</Item>
				<Item id={k++} title="Ejes" parent={this} hide={t != 'traslación' || gridType == 'pictórico'}>
					<Select id="axisTags" prefix="etiquetas" options={['si', 'no']} parent={this}/>
				</Item>
				<Item id={k++} title="Figuras" parent={this}>
					<Select id="figureType" prefix="tipo" options={['default','images']} parent={this} hide={gridType != 'simbólico'}/>
					<Select id="figureImg" prefix="tipo" options={['images']} parent={this} hide={gridType != 'pictórico'} disabled/>
					<Select id="figureSize" prefix="cantidad" options={[1,2,3,4]} parent={this} hide={t != 'reflexión' && gridType == 'simbólico'}/>
					<Input id="img1" prefix="imágen 1" parent={this} postfix="url"/>
					<Input id="img2" prefix="imágen 2" parent={this} postfix="url" hide={(t == 'reflexión' || gridType == 'pictórico') && s < 2}/>
					<Input id="img3" prefix="imágen 3" parent={this} postfix="url" hide={(t != 'reflexión' && gridType == 'simbólico') || s < 3}/>
					<Input id="img4" prefix="imágen 4" parent={this} postfix="url" hide={(t != 'reflexión' && gridType == 'simbólico') || s < 4}/>
				</Item>
				<Item id={k++} title="Posición" parent={this}>
					<Input id="px1" prefix="posición x1" parent={this}/>
					<Input id="py1" prefix="posición y1" parent={this}/>
					<Input id="px2" prefix="posición x2" parent={this} hide={(t == 'reflexión' || gridType == 'pictórico') && s < 2}/>
					<Input id="py2" prefix="posición y2" parent={this} hide={(t == 'reflexión' || gridType == 'pictórico') && s < 2}/>
					<Input id="px3" prefix="posición x3" parent={this} hide={(t != 'reflexión' && gridType == 'simbólico') || s < 3}/>
					<Input id="py3" prefix="posición y3" parent={this} hide={(t != 'reflexión' && gridType == 'simbólico') || s < 3}/>
					<Input id="px4" prefix="posición x4" parent={this} hide={(t != 'reflexión' && gridType == 'simbólico') || s < 4}/>
					<Input id="py4" prefix="posición y4" parent={this} hide={(t != 'reflexión' && gridType == 'simbólico') || s < 4}/>
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