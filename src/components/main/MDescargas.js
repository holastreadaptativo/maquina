import React, { Component } from 'react'

export default class Descargas extends Component {
    constructor(props) {
		super(props); this.state = { clicked:false, radius:100, color:'red', x:-100, y:-100 }
		this.setClicked = this.setClicked.bind(this)
	}
	setClicked() {
		this.setState({ clicked:!this.state.clicked })
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
        	<div class="descargas" onMouseMove={this.onMouseMove.bind(this)}>
        		<div class="container">
					<h3 class="hidden">Descargar archivos
						<span class="glyphicon glyphicon-option-vertical" onClick={this.setClicked}>
							<div class={`options ${this.state.clicked ? 'clicked' : ''}`}>
								<ul>
									<li><a>-</a></li>
								</ul>
							</div>
						</span>
						<span class="glyphicon glyphicon-info-sign">
							<div class="info">Información sobre el funcionamiento de esta sección y la descarga de archivos</div>
						</span>
					</h3>
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