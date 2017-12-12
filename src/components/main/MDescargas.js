import React, { Component } from 'react'

export default class Descargas extends Component {
    constructor(props) {
		super(props); this.state = { clicked:false }
		this.setClicked = this.setClicked.bind(this)
	}
	setClicked() {
		this.setState({ clicked:!this.state.clicked })
	}
	render() {
        return(
        	<div>
        		<div class="container">
					<h3>Descargar archivos
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
        		</div>
        	</div>
        )
    }
}