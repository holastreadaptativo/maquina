import React, { Component } from 'react'
import $ from 'actions'

export class Versiones extends Component {
    constructor(props) {
		super(props); this.state = { clicked:false, drag:'', versions:[], selection:[] }
		this.setClicked = this.setClicked.bind(this)
		this.drag = this.drag.bind(this)
		this.drop = this.drop.bind(this)
	}
	componentDidMount() {
		let versions = []
		for (let i = 0; i < 25; i++) {
			versions.push({ id:`version-${i}`, count:i })
		} 
		versions.sort(function(){return 0.5 - Math.random()})

		this.setState({ selection:versions.slice(0, 10) , versions:versions.slice(10, versions.length) })
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
	    if (!ev.target.id.includes('version'))
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
							<div id="options" class="combinaciones">
								<h5>Versiones:</h5>
								{
									this.state.versions.map(m => { return (
										<h4 id={m.id} draggable="true" onDragStart={this.drag}>Version {m.count + 1}</h4>
									)})
								}
							</div>
						</div>	
						<div class="col-md-3">
							<div id="selection" class="seleccion" onDrop={this.drop} onDragOver={this.allowDrop}>
								<h5>Selección:</h5>
								{
									this.state.selection.map(m => { return (
										<h4 id={m.id} draggable="true" onDragStart={this.drag}>Version {m.count + 1}</h4>
									)})
								}
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