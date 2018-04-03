import React, { Component } from 'react'
import { Editor, Input, Item, Select } from 'components'
import { glyph } from 'actions'

export default class GraficoDatos extends Component {
	constructor(props) {
		super(props)
		this.state = props.push ? { 
			active:0, inputSize:4, inputType:'radio', value1:'1', value2:'2', value3:'3', value4:'4'
		} : props.params
	}
	componentDidUpdate() {
		
	}
	handleActive(active) {
		this.setState({ active:active })
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
	render() {
		const { active, inputType, value1, value2, value3, value4 } = this.state
		return (
			<Editor title={this.props.fn} params={this.state} store={this.props}>
				<Item id={0} active={active} title="Options" setActive={::this.handleActive}>
					<Select id="inputType" default={inputType} prefix="tipo" update={::this.update} options={['input', 'checkbox', 'radio', 'select', 'textarea']}/>
					<Input id="value1" default={value1} prefix="opción 1" update={::this.setState} type="text"/>
					<Input id="value2" default={value2} prefix="opción 2" update={::this.setState} type="text"/>
					<Input id="value3" default={value3} prefix="opción 3" update={::this.setState} type="text"/>
					<Input id="value4" default={value4} prefix="opción 4" update={::this.setState} type="text"/>
				</Item>
			</Editor>
		)
	}
}// postfix={<span class={glyph('ok')}/>}