import React, { Component } from 'react'
import { ejercicios, respuestas, focus } from 'actions'
import { DEFAULT, DEVICES } from 'stores'

export default class Design extends Component {
	constructor(props) {
		super(props)
		this.state = { device:DEFAULT.DEVICE, action:props.design ? ejercicios : respuestas }
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
		this.state.action('GET', { ...this.props, vt:true })
	}
	render() {
		const { device } = this.state
		const { answers, design, functions } = this.props
		let aux = design ? functions : answers, container = design ? 'container' : 'content'
		return (
			<div class="row">
				<div class="col-md-12 design">
					<nav class="devices">
					{
						DEVICES.map((m, i) =>
							<i key={i} class={focus(device == m.size, 'active')} onClick={() => this.handleDevice(m.size)}>{m.icon}</i>
						)
					}
					</nav>
					<div class="device canvas" style={{ width:device+'px' }}>
					{
						aux.map((m, i) => { 
							return (
								<div key={i} class={`col-md-${m.width.md} col-sm-${m.width.sm} col-sm-${m.width.xs} div-${m.tag} tags`}>
								{
									m.tag != 'general' ? 
									<canvas id={`${container}-${i}`} style={{background:m.params.background}}></canvas> :
									<div id={`${container}-${i}`} class="general"></div>
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