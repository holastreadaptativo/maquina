import React, { Component } from 'react'
import { Editor, Item, Select } from 'components'

export default class GraficoDatos extends Component {
	constructor(props) {
		super(props)
		this.state = props.push ? { 
			active:0, inputType:'radio'
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
		const { active, inputType } = this.state
		return (
			<Editor title={this.props.fn} params={this.state} store={this.props}>
				<Item id={0} active={active} title="Options" setActive={::this.handleActive}>
					<Select id="inputType" default={inputType} prefix="tipo" update={::this.update} options={['input', 'checkbox', 'radio', 'select', 'textarea']}/>
				</Item>
			</Editor>
		)
	}
}