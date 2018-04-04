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
			dataTag: '0,1', withAxis: 'no', margin:'70, 90', chartPosition:'vertical', chartColor:COLORS['datos'], chartValues:'7, 5, 6, 8, 4', fontWeight:'bold',
			chartTags:'A, B, C, D, E', titleValue:'', titleSize:22, titleColor:'#006400', titleTop:35, chartBorder:COLORS['datos'], scaleMax:0, 
			scaleMin:0, scaleInterval:1, scaleColor:COLORS['datos'], scaleWidth:1, fontSize:14, limitVal:'0,1', projectionVal:'0,1', highlightBar:''
		} : props.params
	}
	componentDidUpdate() {
		datos.graficoDatos({ container:$('container'), params:this.state, variables:this.props.variables, vt:true })
	}
	render() {
		let k = 0
		return (
			<Editor params={this.state} store={this.props} parent={this}>
				<Item id={k++} title="Canvas" parent={this}>
					<Input id="height" prefix="alto" postfix="px" type="number" parent={this}/>	
					<Input id="width" prefix="ancho" postfix="px" type="number" parent={this}/>	
					<Input id="background" type="color" parent={this}/>
					<Input id="margin" prefix="margen" postfix="px" parent={this}/>
				</Item>
				<Item id={k++} title="Títulos" parent={this}>
					<Input id="titleColor" type="color" parent={this}/>
					<Input id="titleTop" prefix="margen" postfix="px" type="number" parent={this}/>
					<Input id="titleSize" prefix="tamaño" postfix="px" type="number" parent={this}/>
					<Input id="titleValue" prefix="texto" placeholder={'Título'} parent={this}/>
				</Item>
				<Item id={k++} title="Gráfico" parent={this}>
					<Input id="chartBorder" prefix="borde" type="color" parent={this}/>
					<Input id="chartColor" type="color" parent={this}/>
					<Input id="chartTags" prefix="etiquetas" placeholder={'A, B, C, D, E'} parent={this}/>
					<Select id="chartPosition" prefix="orientación" options={['vertical','horizontal']} parent={this}/>
					<Input id="chartValues" prefix="valores" placeholder={'1, 2, 3, 4, 5'} parent={this}/>
				</Item>
				<Item id={k++} title="Escala" parent={this}>
					<Input id="scaleColor" type="color" parent={this}/>
					<Input id="scaleInterval" prefix="intervalo" min="1" type="number" parent={this}/>
					<Input id="scaleWidth" prefix="grosor" postfix="px" type="number" parent={this}/>
					<Input id="scaleMax" prefix="máximo" type="number" parent={this}/>
					<Input id="scaleMin" prefix="mínimo" type="number" parent={this}/>
				</Item>
				<Item id={k++} title="Ejes" parent={this}>
					<Input id="axisColor" type="color" parent={this}/>
					<Select id="withArrowsX" prefix="flecha x" options={['no', 'si']} parent={this}/>
					<Select id="withArrowsY" prefix="flecha y" options={['no', 'si']} parent={this}/>
					<Input id="axisWidth" prefix="grosor" postfix="px" type="number" parent={this}/>
					<Input id="axisTitleX" prefix="titulo x" placeholder={'Eje X'} parent={this}/>
					<Input id="axisTitleY" prefix="titulo y" placeholder={'Eje Y'} parent={this}/>
				</Item>
				<Item id={k++} title="Lineas" parent={this}>
					<Input id="lineColor" type="color" placeholder={'0, 1, 0, 0, 1'} parent={this}/>
					<Input id="lineWidth" prefix="grosor" postfix="px" type="number" parent={this}/>
					<Input id="dataTag" prefix="etiquetas" placeholder={'0, 1, 0, 0, 1'} parent={this}/>
					<Input id="limitVal" prefix="limites" type="text" placeholder={'$a, $b, $c'} parent={this}/>
					<Input id="projectionVal" prefix="proyectar" type="text" placeholder={'0, 1, 0, 0, 1'} parent={this}/>
					<Input id="highlightBar" prefix="resaltar" placeholder={'0, 1, 0, 0, 1'} parent={this}/>
				</Item>
				<Item id={k++} title="Borde" parent={this}>
					<Input id="borderColor" type="color" parent={this}/>
					<Select id="borderStyle" prefix="estilo" options={['solid']} parent={this}/>
					<Input id="borderWidth" prefix="grosor" postfix="px" type="number" parent={this}/>	
					<Input id="borderRadius" prefix="radio" postfix="px" type="number" parent={this}/>
				</Item>
				<Item id={k++} title="Fuente" parent={this}>
					<Input id="fontColor" type="color" parent={this}/>
					<Select id="fontWeight" prefix="estilo" options={['bold']} parent={this}/>
					<Input id="fontSize" prefix="tamaño" postfix="px" type="number" parent={this}/>
					<Select id="fontFamily" prefix="tipo" options={['Larke Neue Thin']} parent={this}/>
				</Item>
			</Editor>
		)
	}
}