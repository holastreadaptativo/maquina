import React, { Component } from 'react'
import $ from 'actions'

export default class Versiones extends Component {
    constructor(props) {
		super(props); this.state = { clicked:false, drag:'' }
		this.setClicked = this.setClicked.bind(this)
		this.se
	}
	setClicked() {
		this.setState({ clicked:!this.state.clicked })
	}
	allowDrop(ev) {
    	ev.preventDefault()
	}	
	drag(ev) {
		this.setState({ drag:ev.target.id })
		ev.dataTransfer.setData('text', $(ev.target.id))
	}
	drop(ev) {
	    ev.preventDefault()
	   	$(ev.target.id).appendChild($(this.state.drag))
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
							<div id="div1" class="combinaciones" onDrop={this.drop.bind(this)} onDragOver={this.allowDrop}>
								<h5>Versiones:</h5>
								<h4 id="h4-1" draggable="true" onDragStart={this.drag.bind(this)}>Version 1</h4>
								<h4 id="h4-2" draggable="true" onDragStart={this.drag.bind(this)}>Version 2</h4>
								<h4 id="h4-3" draggable="true" onDragStart={this.drag.bind(this)}>Version 3</h4>
								<h4 id="h4-4" draggable="true" onDragStart={this.drag.bind(this)}>Version 4</h4>
								<h4 id="h4-5" draggable="true" onDragStart={this.drag.bind(this)}>Version 5</h4>
								<h4 id="h4-6" draggable="true" onDragStart={this.drag.bind(this)}>Version 6</h4>
								<h4 id="h4-7" draggable="true" onDragStart={this.drag.bind(this)}>Version 7</h4>
								<h4 id="h4-8" draggable="true" onDragStart={this.drag.bind(this)}>Version 8</h4>
								<h4 id="h4-9" draggable="true" onDragStart={this.drag.bind(this)}>Version 9</h4>
								<h4 id="h4-10" draggable="true" onDragStart={this.drag.bind(this)}>Version 10</h4>
								<h4 id="h4-11" draggable="true" onDragStart={this.drag.bind(this)}>Version 11</h4>
								<h4 id="h4-12" draggable="true" onDragStart={this.drag.bind(this)}>Version 12</h4>
								<h4 id="h4-13" draggable="true" onDragStart={this.drag.bind(this)}>Version 13</h4>
								<h4 id="h4-14" draggable="true" onDragStart={this.drag.bind(this)}>Version 14</h4>
								<h4 id="h4-15" draggable="true" onDragStart={this.drag.bind(this)}>Version 15</h4>
							</div>
						</div>	
						<div class="col-md-3">
							<div id="div2" class="seleccion" onDrop={this.drop.bind(this)} onDragOver={this.allowDrop}>
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