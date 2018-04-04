import React, { Component } from 'react'
import { Editor, Input, Item } from 'components'

export default class InsertTexto extends Component {
	constructor(props) {
		super(props)
		this.state = props.push ? { active:0, color:'#ffffff', padding:'10px 10px 0px', content:'' } : props.params
	}
	render() {
		return (
			<Editor params={this.state} store={this.props} parent={this}>
				<Item id={0} title="Texto" parent={this}>
					<Input id="color" type="color" parent={this}/>
					<Input id="padding" prefix="padding" parent={this}/>
				</Item>
			</Editor>
		)
	}
}