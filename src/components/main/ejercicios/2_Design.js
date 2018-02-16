import React, { Component } from 'react'
import { focus } from 'actions'

export default class Design extends Component {
	 constructor() {
		super()
		this.state = { active:0, width:'960px' }
	}
    setActive(active) {
        this.setState({ active:active, width:active == 0 ? '960px' : active == 1 ? '768px' : '320px' })
    }
	render() {
		const { active, width } = this.state
		const { functions } = this.props
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
				<div id="ex-design" class="device canvas" style={{width:width}}>
				{
					functions.map((m, i) => { return (
						<div key={i} class={`col-md-${m.width} col-sm-6 div-${m.hub}`} style={{ height:160, border:'3px solid white' }}/>
					)})
				}
				</div>
			</div>
		)
	}
}