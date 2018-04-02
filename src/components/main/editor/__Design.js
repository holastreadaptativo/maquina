import React, { Component } from 'react'
import { DEFAULT, DEVICES } from 'stores'
import { action, focus } from 'actions'

export default class Design extends Component {
	constructor(props) {
		super(props)
		this.state = { device:DEFAULT.DEVICE, container:props.container }
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
	render() {
		const { device, container } = this.state
		return (
			<section class="design">			
				<div class="row">
					<menu class="devices">
					{
						DEVICES.map((m, i) =>
							<li key={i} class={focus(device == m.size, 'active')} onClick={() => this.handleDevice(m.size)}>
								<i>{m.icon}</i>
							</li>
						)
					}
					</menu>
					<main class="device" style={{ width:device == DEFAULT.DEVICE ? '100%' : device+'px' }}>
					{
						this.props[this.props.path].map((m, i) => { 
							let size = device <= DEVICES[2].size ? m.width.xs : device <= DEVICES[1].size ? m.width.sm : m.width.md
							return (
								<div key={i} class={`col-md-${size} col-sm-${m.width.sm} col-sm-${m.width.xs} div-${m.tag} tags`}>
								{
									m.tag != 'general' ? 
									<canvas id={`${container}-${i}`} class="center-block" style={{background:m.params.background}}></canvas> :
									<div id={`${container}-${i}`} class="general"></div>
								}
								</div>
							)
						})
					}
					</main>
				</div>
			</section>
		)
	}
    handleDevice(device) {
        this.setState({ device:device })
    }
	print() {
		action.exe('PRINT', { ...this.props, vt:true })
	}
}