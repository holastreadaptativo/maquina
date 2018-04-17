import React, { Component } from 'react'
import { DEFAULT, DEVICES, LABELS } from 'stores'
import { action, focus } from 'actions'

export default class Design extends Component {
	constructor(props) {
		super(props)
		this.state = { container:props.container, device:DEFAULT.DEVICE }
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
		action.ver('PRINT', { ...this.props, versions:this.props.vars, vt:false })
	}
	render() {
		const { device } = this.state, feed = 'feedback'
		return (
			<section class="design">
				<div class="row">
					<menu class="devices">
					{
						DEVICES.map((m, i) =>
							<li key={i} class={focus(device == m.size, 'active')} onClick={() => this.handleDevice(m.size)}><i>{m.icon}</i></li>
						)
					}
					</menu>
					<main class="device" style={{ width:device == DEFAULT.DEVICE ? '100%' : device+'px' }}>
					{
						DEFAULT.FNS.slice(0, 2).map(path => 
							action.exe('GET', { ...this.props, container:LABELS.CONT[path], device, path }) 
						)
					}
					</main>
				</div>
				<div class="row">
		        	<main class="feedback">
		        		<article>
						{	
							this.props[feed].map((m, i) => 
								<div key={i} class={`col-md-${m.width.md} col-sm-${m.width.sm} col-sm-${m.width.xs} div-${m.tag} tags`}>
								{
									m.tag != 'general' ? 
									<canvas id={`${LABELS.CONT[feed]}-${i}`} style={{background:m.params.background}}></canvas> :
									<div id={`${LABELS.CONT[feed]}-${i}`} class="general"></div>
								}
								</div>
							)
						}		
						</article>	
	        			<div class="img-duck"/>
	        			<div class="triangle"/>
	        			<footer/>
	        		</main>
	    		</div>
			</section>
		)
	}
}