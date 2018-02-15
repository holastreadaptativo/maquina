import React, { Component } from 'react'
import SplitPane from 'react-split-pane'
import $ from 'actions'

export default class Editor extends Component {
	constructor() {	
		super()
		this.state = { b1:false, b2:false }
	}
	componentDidMount() {
		let w = $('editor').clientWidth
		this.setState({ w1:w/3, wx:2*w/3, w2:w/3, w3:w/3, w:w })
	}	
	handleDrag(width) {
		const { b1, b2, w2, w3, wx } = this.state, 
			w = $('editor').clientWidth
		let e1 = width, ex = w - width, e2 = !b2 ? (w - width)/2 : ex / wx * w2, e3 = !b2 ? (w - width)/2 : ex / wx * w3
			if (e3 <= 120) { e2 = ex - 120; e3 = 120 } else if (e2 <= 120) { e3 = ex - 120; e2 = 120 }

		if(!b1) this.setState({ b1:true })
		this.setState({ w1:e1, wx:ex, w2:e2, w3:e3 })
	}
	handleDrop(width) {
		const { b1, b2, wx } = this.state
		let w = $('editor').clientWidth
		
		if(!b1) this.setState({ w1:w/3, w2:width, w3:(2*w/3 - width) })
		else this.setState({ w2:width, w3:(wx - width) })
		if(!b2) this.setState({ b2:true })
	}	
	handleChange(id) {
		let text = $(id).value, aux = ''
		if (text.includes('<')) {
			for (let i = 0; i < text.length; i++) {
				let char = text.charAt(i)
				if (char == '<') { 
					aux += char.fontcolor('bb0000')
				} else {
					aux += char.fontcolor('000000')
				}
			}
			$(id).innerHTML = aux
		}
	}
	render() {
		const { w1, w2, w } = this.state
		return (
			<div id="editor" class="editor">
				 <SplitPane defaultSize="33%" minSize={120} maxSize={w-w2-120} split="vertical" class="resizable main" 
				 onChange={this.handleDrag.bind(this)}>
		            <div class="editor-html">
		            	<h5><span class="glyphicon glyphicon-cog"/>HTML<span class="glyphicon glyphicon-menu-down"/></h5>
						<textarea id="editor-html" onChange={this.handleChange.bind(this, 'editor-html')} class="editable"/>
					</div>
		            <SplitPane defaultSize="50%" minSize={120} maxSize={w-w1-120} split="vertical" class="resizable" 
		            onChange={this.handleDrop.bind(this)}>
			            <div class="editor-css">
							<h5><span class="glyphicon glyphicon-cog"/>CSS<span class="glyphicon glyphicon-menu-down"/></h5>
							<textarea id="editor-css" onChange={this.handleChange.bind(this, 'editor-css')} class="editable"/>
						</div>
			            <div class="editor-js">
							<h5><span class="glyphicon glyphicon-cog"/>JS<span class="glyphicon glyphicon-menu-down"/></h5>
							<textarea id="editor-js" onChange={this.handleChange.bind(this, 'editor-js')} class="editable"/>
						</div>
			        </SplitPane>
		        </SplitPane>
			</div> : ''
		)
	}
}