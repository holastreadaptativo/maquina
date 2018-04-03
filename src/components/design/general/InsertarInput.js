import React, { Component } from 'react'
import { Editor, Input, Item, Select } from 'components'

export default class GraficoDatos extends Component {
	constructor(props) {
		super(props)
		this.state = props.push ? { 
			active:0, inputType:'checkbox', inputSize:3
		} : props.params
	}
	componentDidUpdate() {
		
	}
	handleActive(active) {
		this.setState({ active:active })
	}
	render() {
		const { active, inputType } = this.state; let k = 0
		return (
			<Editor title="Insertar Input" params={this.state} store={this.props}>
				<Item id={k} active={active} title="Options" setActive={::this.handleActive}>
					<Select id="inputType" default={inputType} prefix="tipo" update={::this.setState} options={['input', 'checkbox', 'select', 'textarea']}/>
					<Input prefix="cantidad" type="number"/>
				</Item>
			</Editor>
		)
	}
}