import React, { Component } from 'react'
import { respuestas, focus } from 'actions'
import { DEFAULT, DEVICES } from 'stores'

export default class Design extends Component {
	constructor() {
		super()
		this.state = { device:DEFAULT.DEVICE }
		this.print = this.print.bind(this)
	}
	componentDidMount() {	
		this.print()	
		window.addEventListener('resize', this.print )
	}
	componentDidUpdate() {
		setTimeout(() => this.print(), 300)
	}
	componentWillUnmount() {
		window.removeEventListener('resize', this.print )
	}
    handleDevice(device) {
        this.setState({ device:device })
    }
	print() {
		respuestas('GET', { ...this.props, vt:true })
	}
	render() {
		const { device } = this.state
		let tablet = device <= 768, phone = device <= 320
		return (
			<div class="row">
				<div class="col-md-12 design">
					<nav class="devices">
					{
						DEVICES.map((m, i) => { return (
							<i key={i} class={focus(device == m.size, 'active')} onClick={() => this.handleDevice(m.size)}>{m.icon}</i>
						)})
					}
					</nav>
					<div class="device canvas" style={{ width:device+'px' }}>
					{
						this.props.answers.map((m, i) => { 
							let size = phone ? 12 : tablet && m.tag != 'general' ? 6 : m.width
							return (
								<div key={i} class={`col-md-${size} col-sm-6 div-${m.tag} tags`}>
								{
									m.tag != 'general' ? 
									<canvas id={`container-${i}`} style={{background:m.params.background}}></canvas> :
									<div id={`container-${i}`} class="general"></div>
								}
								</div>
							)
						})
					}
					</div>
				</div>
			</div>
		)
	}
}