import React, { Component } from 'react'
import { FUNCIONES } from 'components'
import $, { focus } from 'actions'

export default class Design extends Component {
	constructor() {
		super()
		this.state = { active:0, width:960 }
	}
	componentDidMount() {
		this.print()
	}
	componentDidUpdate() {
		//for (let i = 0, j = 30; i < 300/j; i++) //i * j
		setTimeout(() => this.print(), 300)
	}
	print() {
		this.props.functions.forEach((m, i) => {
			let j = FUNCIONES.findIndex(x => x.tag == m.tag)
			let k = FUNCIONES[j].fns.findIndex(x => x.id == m.function)
			if (m.tag != 'general')
				FUNCIONES[j].fns[k].action($(`canvas-${i}`), m.params)
		}) 		
	}
    setActive(active) {
        this.setState({ active:active, width:active == 0 ? 960 : active == 1 ? 768 : 320 })
    }
	render() {
		const { active, width } = this.state
		const { functions } = this.props
		let items = ['desktop_windows', 'tablet_mac', 'phone_iphone']
		let tablet = width <= 768, phone = width <= 320
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
				<div ref="frame" id="ex-design" class="device canvas" style={{width:width+'px'}}>
				{
					functions.map((m, i) => { return (
						<div key={i} class={`col-md-${phone ? 12 : tablet ? 6 : m.width} col-sm-6 div-${m.tag} tags`}>
						{
							m.tag != 'general' ? 
							<canvas id={`canvas-${i}`} style={{background:m.params.background}}></canvas> : ''
						}
						</div>
					)})
				}
				</div>
			</div>
		)
	}
}