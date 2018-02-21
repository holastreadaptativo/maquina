import React, { Component } from 'react'
import { FUNCIONES } from 'components'
import $, { focus } from 'actions'

export default class Design extends Component {
	constructor() {
		super()
		this.state = { active:0, width:'960px' }
	}
	componentDidUpdate() {
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
								m.tag == 'general' ? 
									<div>
										<br/><br/>
										{m.function}
										<br/>
										<i>star</i>
										<i>star</i>
										<i>star</i>
										<i>star</i>
										<i>star</i>
									</div>
								: ''
							}
							{
								m.tag != 'general' ? 
								<canvas id={`canvas-${i}`} width="250px" height="140px" onClick={() => alert('coño-verga ' + i)}></canvas> : ''
							}
						</div>
					)})
				}
				</div>
			</div>
		)
	}
}