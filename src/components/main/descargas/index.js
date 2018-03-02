import React, { Component } from 'react'

export class Descargas extends Component {
    constructor() {
		super()
		this.state = { radius:100, color:'red', x:-100, y:-100 }
	}
	onMouseMove(e) {
		const { radius, x, y } = this.state
		this.setState({ x:(e.clientX-radius/2), y:(e.clientY-radius/2), color:`rgb(${x%192+64}, ${y%192+64}, ${(x+y)%192+64})` })
	}
	changeRadius(r) {
		this.setState({ radius:this.state.radius*r })
	}
	render() {
		const { radius, color, x, y } = this.state
		return(
        	<div class="descargas" onMouseMove={::this.onMouseMove}>
        		<div class="hidden">
					<div>
						<div id="circle-css" style={{ height:`${radius}px`, width:`${radius}px`, backgroundColor:color, top:`${y}px`, left:`${x}px` }}></div>
						<button class="hidden" onClick={this.changeRadius.bind(this, 1.1)}><span class="glyphicon glyphicon-plus"/></button>
						<button class="b hidden" onClick={this.changeRadius.bind(this, 0.9)}><span class="glyphicon glyphicon-minus"/></button>
					</div>
        		</div>
        	</div>
        )
    }
}