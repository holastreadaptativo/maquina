import React, { Component } from 'react'

export default class Design extends Component {
	 constructor(props) {
		super(props); this.state = { active:0, width:'960px' }
		this.setActive = this.setActive.bind(this)
	}
    setActive(active) {
        this.setState({ active:active, width:active == 0 ? '960px' : active == 1 ? '768px' : '320px' })
    }
	render() {
		const { active, width } = this.state
		return (
			<div>
				<h5><b>Diseño</b></h5>
				<nav class="devices">
					<i class={`${active == 0 ? 'active' : ''}`} onClick={() => this.setActive(0)}>desktop_windows</i>
					<i class={`${active == 1 ? 'active' : ''}`} onClick={() => this.setActive(1)}>tablet_mac</i>
					<i class={`${active == 2 ? 'active' : ''}`} onClick={() => this.setActive(2)}>phone_iphone</i>
				</nav>
				<div id="ex-design" class="device canvas" style={{width:width}} onDrop={this.props.drop} onDragOver={this.props.allowDrop}/>
			</div>
		)
	}
}