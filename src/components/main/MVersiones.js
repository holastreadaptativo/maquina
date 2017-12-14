import React, { Component } from 'react'

export default class Versiones extends Component {
    constructor(props) {
		super(props); this.state = { clicked:false }
		this.setClicked = this.setClicked.bind(this)
	}
	setClicked() {
		this.setState({ clicked:!this.state.clicked })
	}
	render() {
        return(
        	<div class="versiones">
        		<div class="container">
					<h3>Generar versiones
						<span class="glyphicon glyphicon-option-vertical" onClick={this.setClicked}>
							<div class={`options ${this.state.clicked ? 'clicked' : ''}`}>
								<ul>
									<li><a>-</a></li>
								</ul>
							</div>
						</span>
						<span class="glyphicon glyphicon-info-sign">
							<div class="info">Información sobre el funcionamiento de esta sección y la generación de versiones</div>
						</span>
					</h3>
					<div class="row">
						<div class="col-md-3">
							<div class="combinaciones">
								<h5>Versiones:</h5>
							</div>
						</div>	
						<div class="col-md-3">
							<div class="seleccion">
								<h5>Selección:</h5>
							</div>
						</div>	
						<div class="col-md-6">
							<div class="preview">
								<h5>Vista previa:</h5>
							</div>
						</div>	
					</div>
        		</div>
        	</div>
        )
    }
}