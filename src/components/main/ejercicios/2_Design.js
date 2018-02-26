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
		window.addEventListener('resize', ::this.print )
	}
	componentDidUpdate() {
		setTimeout(() => this.print(), 300)
	}
	componentWillUnmount() {
		window.removeEventListener('resize', ::this.print )
	}
    setActive(active) {
        this.setState({ active:active, width:active == 0 ? 960 : active == 1 ? 768 : 320 })
    }
	print() {
		const { functions, variables } = this.props
		functions.forEach((m, i) => {
			let j = FUNCIONES.findIndex(x => x.tag == m.tag)
			let k = FUNCIONES[j].fns.findIndex(x => x.id == m.function)
			FUNCIONES[j].fns[k].action({
				container:$(`container-${i}`), params:m.params, variables:variables
			})
		}) 		
	}
	render() {
		const { active, width } = this.state
		let items = ['desktop_windows', 'tablet_mac', 'phone_iphone']
		let tablet = width <= 768, phone = width <= 320
		return (
			<div class="row">
				<div class="col-md-12 design">
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
							this.props.functions.map((m, i) => { 
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