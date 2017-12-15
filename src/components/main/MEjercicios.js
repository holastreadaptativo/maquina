import React, { Component } from 'react'
import $ from 'actions'

export default class Ejercicios extends Component {
    constructor(props) {
		super(props); this.state = { clicked:false, active:0, width:'960px', drag:'', functions:[] }
		this.setClicked = this.setClicked.bind(this)
		this.setActive = this.setActive.bind(this)
		this.drag = this.drag.bind(this)
		this.drop = this.drop.bind(this)
	}
	componentDidMount() {
		let functions = []
		for (let i = 0; i < 20; i++) {
			functions.push({ id:`fn-${i}`, count:i })
		} 
		this.setState({ functions:functions })
	}
	
	setClicked() {
		this.setState({ clicked:!this.state.clicked })
	}
    setActive(active) {
        this.setState({ active:active, width:active == 0 ? '960px' : active == 1 ? '768px' : '320px' })
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
	    if (!ev.target.id.includes('fn'))
	   		$(ev.target.id).appendChild( $(this.state.drag) )
	}
	render() {
		const { active, width } = this.state
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
							<div class="device" style={{width:width}}>

							</div>
						</div>
						<div class="col-md-12">
							<div id="ej-functions" class="selection" onDrop={this.drop} onDragOver={this.allowDrop}>
								<h5>Funcionalidades:</h5>
								{
									this.state.functions.map(m => { return (
										<h4 id={m.id} draggable="true" onDragStart={this.drag}>Funcionalidad {m.count + 1}</h4>
									)})
								}
							</div>
						</div>	
						<div class="col-md-12">
							<div id="ej-selected" class="selection selected" onDrop={this.drop} onDragOver={this.allowDrop}>
								<h5>Selección:</h5>
							</div>
						</div>	
					</div>
        		</div>
        	</div>
        )
    }
}