import React, { Component } from 'react'
import { Editor, Input, Item, Select, Text } from 'components'
import { glyph } from 'actions'

export default class InsertInput extends Component {
	constructor(props) {
		super(props)
		this.state = props.push ? { 
			active:0, 
			inputSize:'1', 
			inputType:'input', 
			value1:'', 
			value2:'', 
			value3:'', 
			value4:'', 
			error0:'',
			error2:'', 
			error3:'', 
			error4:'', 
			defaultError:'',
			feed0:'', 
			feed1:'', 
			feed2:'', 
			feed3:'', 
			feed4:'',
			defaultFeed:'',
			maxLength:'',
			tipoInput:'texto',
			colmd:'3',
			colsm:'6',
			col:'12'
		} : props.params
	}
	render() {
		let k = 0;
		var { 
			inputSize, 
			inputType, 
			value1, 
			value2, 
			value3, 
			value4, 
			error0,
			error2, 
			error3, 
			error4, 
			defaultError,
			feed0, 
			feed1, 
			feed2, 
			feed3, 
			feed4,
			defaultFeed,
			maxLength,
			tipoInput,
			colmd,
			colsm,
			col
		} = this.state;
		return (
			<Editor params={this.state} store={this.props} parent={this}>
				<Item id={k++} title="Opciones" parent={this}>
					<Select id="inputType" parent={this} prefix="tipo" options={['input', 'checkbox', 'radio', 'textarea']} value={inputType}/>
					<Select id="inputSize" parent={this} prefix="cantidad" options={['2','3','4']} value={inputSize}/>
					{ inputType === 'input' && <Input id="maxLength" prefix="Largo Max" type="number" parent={this} value={maxLength}/> }
					{ inputType === 'input' && <Select id="tipoInput" parent={this} prefix="tipo" options={['texto', 'numero', 'alfanumerico']} value={tipoInput} /> }
					<Text id="value1" prefix="Correcta" postfix={<span class={glyph('ok')}/>} parent={this} value={value1}/>
					<Text id="value2" prefix="opción 2" postfix={<span class={glyph('remove')}/>} parent={this} value={value2}/> 
					<Text id="value3" prefix="opción 3" postfix={<span class={glyph('remove')}/>} hide={inputSize < 3} parent={this} value={value3}/> 
					<Text id="value4" prefix="opción 4" postfix={<span class={glyph('remove')}/>} hide={inputSize < 4} parent={this} value={value4}/>
					{ this.state.inputType === 'radio' && <Select id="colmd" parent={this} prefix="colmd" options={['2', '3', '4']} value={colmd} /> }
					{ this.state.inputType === 'radio' && <Select id="colsm" parent={this} prefix="colsm" options={['4', '5', '6', '12']} value={colsm} /> }	
					{ this.state.inputType === 'radio' && <Select id="col" parent={this} prefix="col" options={['8', '10', '12']} value={col} /> }		
				</Item>
				<Item id={k++} title="Errores" parent={this}>
					<Input id="error0" prefix="defecto" type="number" parent={this} placeholder="'' Si no aplica" value={error0}/> 
					<Input id="error2" prefix="error 2" type="number" parent={this} value={error2}/> 
					<Input id="error3" prefix="error 3" type="number" parent={this} hide={inputSize < 3} value={error3}/> 
					<Input id="error4" prefix="error 4" type="number" parent={this} hide={inputSize < 4} value={error4}/>
					{ inputType === 'input' && <Input id="defaultError" prefix="Error defecto" parent={this} value={defaultError}/> }
				</Item>
				<Item id={k++} title="Feedback" parent={this}>
					<Input id="feed0" prefix="genérico" parent={this} placeholder="'' Si no aplica" value={feed0}/>
					<Input id="feed1" prefix="correcto" parent={this} value={feed1}/>
					<Input id="feed2" prefix="feed 2" parent={this} value={feed2}/>
					<Input id="feed3" prefix="feed 3" parent={this} hide={inputSize < 3} value={feed3}/>
					<Input id="feed4" prefix="feed 4" parent={this} hide={inputSize < 4} value={feed4}/>
					{ inputType === 'input' && <Input id="defaultFeed" prefix="Feed defecto" parent={this} value={defaultFeed}/> }
				</Item>
			</Editor>
		)
	}
}