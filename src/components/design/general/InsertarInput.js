import React, { Component } from 'react'
import { Editor, Input, Item, Select, Text } from 'components'
import { glyph } from 'actions'

export default class InsertInput extends Component {
	constructor(props) {
		super(props)
		this.state = props.push ? { 
			active:0, answer:0, inputSize:4, inputType:'radio', value1:'1', value2:'2', value3:'3', value4:'4', error2:'0', error3:'0', error4:'0', 
			feed0:'', feed1:'', feed2:'', feed3:'', feed4:''
		} : props.params
	}
	render() {
		let k = 0, i = this.state.inputSize
		return (
			<Editor params={this.state} store={this.props} parent={this}>
				<Item id={k++} title="Opciones" parent={this}>
					<Select id="inputType" parent={this} update={::this.update} prefix="tipo" options={['input', 'checkbox', 'radio', 'select', 'textarea']}/>
					<Text id="answer" prefix="respuesta" postfix={<span class={glyph('ok')}/>} hide={i > 1} parent={this}/> 
					<Text id="value1" prefix="opción 1" postfix={<span class={glyph('ok')}/>} hide={i < 3} parent={this}/> 
					<Text id="value2" prefix="opción 2" postfix={<span class={glyph('remove')}/>} hide={i < 3} parent={this}/> 
					<Text id="value3" prefix="opción 3" postfix={<span class={glyph('remove')}/>} hide={i < 3} parent={this}/> 
					<Text id="value4" prefix="opción 4" postfix={<span class={glyph('remove')}/>} hide={i < 4} parent={this}/> 				
				</Item>
				<Item id={k++} title="Errores" parent={this} hide={i < 3}>
					<Input id="error2" prefix="error 2" type="number" hide={i < 3} parent={this}/> 
					<Input id="error3" prefix="error 3" type="number" hide={i < 3} parent={this}/> 
					<Input id="error4" prefix="error 4" type="number" hide={i < 4} parent={this}/>
				</Item>
				<Item id={k++} title="Feedback" parent={this}>
					<Input id="feed0" prefix="genérico" parent={this}/>
					<Input id="feed1" prefix="correcto" parent={this}/>
					<Input id="feed2" prefix="feed 2" hide={i < 3} parent={this}/>
					<Input id="feed3" prefix="feed 3" hide={i < 3} parent={this}/>
					<Input id="feed4" prefix="feed 4" hide={i < 4} parent={this}/>
				</Item>
			</Editor>
		)
	}
	update(state) {
		let inputSize = 1
		switch (state.inputType) {
			case 'radio': { inputSize = 4; break }
			case 'checkbox': { inputSize = 4; break }
			case 'select': { inputSize = 3; break }
		}
		this.setState({ ...state, inputSize })
	}
}