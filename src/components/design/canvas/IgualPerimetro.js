import React, { Component } from 'react'
import { Input, Item, Select, Editor } from 'components'
import * as datos from 'actions'
import $ from 'actions'

export default class IgualPerimetro extends Component {
	constructor(props) {
		super(props)
		this.state = props.push ? { 
      active:0, 
      alto: 'a',
      ancho: 'a',
      cuadro: 20,
			borderWidth: '5',
			esCorrecta: false,
			errFrec: ""
		} : props.params
	}
	componentDidUpdate() {
		var propiedades = this.state;
		if(this.props.section !== 'answers') {
			delete propiedades.esCorrecta;
		}
		datos.igualPerimetro({ container:$('container'), params:propiedades, variables:this.props.variables, vt:true })
	}
	render() {
    let k = 0;
		const { variables } = this.props;
    var vars = variables.map(item => { 
      return item.var
		});
		return (
			<Editor params={this.state} store={this.props} parent={this}>
				<Item id={k++} title="General" parent={this}>
					<Select id="alto" prefix="Alto" options={vars} parent={this} value={this.state.alto}/>
					<Select id="ancho" prefix="Ancho" options={vars} parent={this} value={this.state.ancho}/>
          <Input id="cuadro" type="text" prefix="Cuadro" parent={this} value={this.state.cuadro}/>
          <Input id="borderWidth" prefix="Borde" postfix="px" type="number" parent={this} value={this.state.borderWidth}/>
					{ this.props.section === 'answers' && <Input id="esCorrecta" prefix="Es Correcta" type="checkbox" parent={this} checked={this.state.esCorrecta} /> }
					{ this.props.section === 'answers' && <Input id="errFrec" prefix="Error Frecte." type="text" parent={this} value={this.state.errFrec} /> }
				</Item>
			</Editor>
		)
	}
}