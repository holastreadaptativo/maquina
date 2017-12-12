import React, { Component } from 'react'

export default class Ejercicios extends Component {
    constructor(props) {
		super(props); this.state = { clicked:false, active:0 }
		this.setClicked = this.setClicked.bind(this)
		this.setActive = this.setActive.bind(this)
	}
	setClicked() {
		this.setState({ clicked:!this.state.clicked })
	}
    setActive(active) {
        this.setState({ active:active })
    }
	render() {
		const { active } = this.state
        return(
        	<div class="ejercicios">
        		<div class="container">
					<h3>Crear ejercicio
						<span class="glyphicon glyphicon-option-vertical" onClick={this.setClicked}>
							<div class={`options ${this.state.clicked ? 'clicked' : ''}`}>
								<ul>
									<li><a>-</a></li>
								</ul>
							</div>
						</span>
						<span class="glyphicon glyphicon-info-sign">
							<div class="info">Información sobre el funcionamiento de esta sección y la creación de ejercicios</div>
						</span>
					</h3>
					<div class="row">
						<div class="col-md-12 design">
							<h5><b>Diseño</b></h5>
							<nav class="devices">
								<i class={`${active == 0 ? 'active' : ''}`} onClick={() => this.setActive(0)}>desktop_windows</i>
								<i class={`${active == 1 ? 'active' : ''}`} onClick={() => this.setActive(1)}>tablet_mac</i>
								<i class={`${active == 2 ? 'active' : ''}`} onClick={() => this.setActive(2)}>phone_iphone</i>
							</nav>
						</div>
					</div>
        		</div>
        	</div>
        )
    }
}