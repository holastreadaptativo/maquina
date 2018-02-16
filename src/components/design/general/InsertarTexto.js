import React, { Component } from 'react'
import { Tabs, Input, Item } from 'components'
//import * as general from 'actions'
import { COLORS } from 'stores'

export default class InsertTexto extends Component {
	constructor(props) {
		super(props)
		if (props.add) {
			this.state = { active:0, background:COLORS['background'], borderColor:COLORS['border'], borderRadius:20, borderWidth:3, borderStyle:'solid',
				titleValue:'Título' 
			}
		}
		else {
			this.state = props.params
		}
	}
	componentDidUpdate() {
		//let canvas = this.refs.canvas
		
	}
	handleActive(active) {
		this.setState({ active:active })
	}
	render() {
		const { active, background, borderColor, borderWidth, borderRadius, borderStyle, titleValue } = this.state
		let items = ['title']
		return (
			<div class="modal-canvas modal-general">
				<h4 class="modal-title">Insertar Texto</h4>
				<Tabs active={active} setActive={(i) => this.handleActive.bind(this, i)} items={items}/>
				<div class="modal-items">
					<Item id={0} active={active} title="Title">
						<Input id="titleValue" prefix={'texto'} default={titleValue} update={this.setState.bind(this)} type="text"/>
					</Item>
				</div>
				<div class="canvas">
					<div ref="canvas" id="canvas" class="modal-global" style={{ background:background, border:`${borderWidth}px ${borderStyle} ${borderColor}`, 
					borderRadius:`${borderRadius}px` }}>
						Your browser does not support the HTML5 canvas.
					</div>
				</div>	
				<div class="button">
					<button onClick={ this.props.add ? 
						this.props.add(this.refs.canvas, this.state) : this.props.update(this.refs.canvas, this.state)
					}>Guardar</button>
				</div>	
			</div>
		)
	}
}