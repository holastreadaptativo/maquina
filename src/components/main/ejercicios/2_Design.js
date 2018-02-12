import React, { Component } from 'react'
import { focus } from 'actions'

export default class Design extends Component {
	 constructor() {
		super()
		this.state = { active:0, width:'960px' }
		this.setActive = this.setActive.bind(this)
	}
    setActive(active) {
        this.setState({ active:active, width:active == 0 ? '960px' : active == 1 ? '768px' : '320px' })
    }
	render() {
		const { active, width } = this.state
		let items = ['desktop_windows', 'tablet_mac', 'phone_iphone']
		return (
			<div>
				<h5><b>Diseño</b></h5>
				<nav class="devices">
				{
					items.map((m, i) => { return (
						<i key={i} class={focus(active == i, 'active')} onClick={() => this.setActive(i)}>{m}</i>
					)})
				}
				</nav>
				<div id="ex-design" class="device canvas" style={{width:width}} onDrop={this.props.drop} onDragOver={this.props.allowDrop}/>
			</div>
		)
	}
}