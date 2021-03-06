import React, { Component } from 'react'
import { Editor, Input, Item, Select, Text } from 'components'
import { glyph } from 'actions'

export default class InsertInput extends Component {
	constructor(props) {
		super(props)
		this.state = props.push ? { 
			active:0, 
			answer:0, 
			answer2: '',
			answer3: '',
			answer4: '',
			inputSize:4, 
			inputType:'radio', 
			value1:'1', 
			value2:'2', 
			value3:'3', 
			value4:'4', 
			error0:'0',
			error2:'0', 
			error3:'0', 
			error4:'0', 
			feed0:'', 
			feed1:'', 
			feed2:'', 
			feed3:'', 
			feed4:'',
			maxLength:'',
			tipoInput:''
		} : props.params
	}
	render() {
		let k = 0, i = this.state.inputSize
		return (
			<Editor params={this.state} store={this.props} parent={this}>
				<Item id={k++} title="Opciones" parent={this}>
					<Select id="inputType" parent={this} update={::this.update} prefix="tipo" options={['input', 'checkbox', 'radio 4', 'radio 3','select', 'textarea']}/>
					{ this.state.inputType === 'input' && <Input id="maxLength" prefix="Largo Max" type="number" parent={this}/> }
					{ this.state.inputType === 'input' && <Select id="tipoInput" parent={this} update={::this.update} prefix="tipo" options={['texto', 'numero', 'alfanumerico']}/> }
					<Text id="answer" prefix="correcta" postfix={<span class={glyph('ok')}/>} hide={i > 1} parent={this}/>
					<Text id="answer2" prefix="respuesta 2" postfix={<span class={glyph('remove')}/>} hide={i > 1} parent={this}/>
					<Text id="answer3" prefix="respuesta 3" postfix={<span class={glyph('remove')}/>} hide={i > 1} parent={this}/>
					<Text id="answer4" prefix="respuesta 4" postfix={<span class={glyph('remove')}/>} hide={i > 1} parent={this}/>   
					<Text id="value1" prefix="opción 1" postfix={<span class={glyph('ok')}/>} hide={i < 3} parent={this}/> 
					<Text id="value2" prefix="opción 2" postfix={<span class={glyph('remove')}/>} hide={i < 3} parent={this}/> 
					<Text id="value3" prefix="opción 3" postfix={<span class={glyph('remove')}/>} hide={i < 3} parent={this}/> 
					<Text id="value4" prefix="opción 4" postfix={<span class={glyph('remove')}/>} hide={i < 4} parent={this}/> 				
				</Item>
				<Item id={k++} title="Errores" parent={this}>
					<Input id="error0" prefix="defecto" type="number" parent={this}/> 
					<Input id="error2" prefix="error 2" type="number" parent={this}/> 
					<Input id="error3" prefix="error 3" type="number" parent={this}/> 
					<Input id="error4" prefix="error 4" type="number" parent={this}/>
				</Item>
				<Item id={k++} title="Feedback" parent={this}>
					<Input id="feed0" prefix="genérico" parent={this}/>
					<Input id="feed1" prefix="correcto" parent={this}/>
					<Input id="feed2" prefix="feed 2" parent={this}/>
					<Input id="feed3" prefix="feed 3" parent={this}/>
					<Input id="feed4" prefix="feed 4" parent={this}/>
				</Item>
			</Editor>
		)
	}
	update(state) {
		let inputSize = 1
		switch (state.inputType) {
			case 'radio 4': inputSize = 4; break 
			case 'radio 3': inputSize = 3; break
			case 'checkbox': inputSize = 4; break 
			case 'select': inputSize = 3; break 
		}
		this.setState({ ...state, inputSize })
	}
}