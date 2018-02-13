import React, { Component } from 'react'
import { render } from 'react-dom'
import $ from 'actions'

export class Ejercicios extends Component {
    constructor() {	
		super()
		this.state = { clicked:false, drag:'', functions:[], count:0, value:1 }
		this.setClicked = this.setClicked.bind(this)
		this.drag = this.drag.bind(this)
		this.drop = this.drop.bind(this)
	}
	componentDidMount() {
		let functions = []
		for (let i = 0; i < 28; i++) { functions.push({ id:`fn-${i}` }) }
		this.setState({ functions:functions })
	}	
	setClicked() {
		this.setState({ clicked:!this.state.clicked })
	}
	allowDrop(e) {
    	e.preventDefault()
	}	
	drag(e) {
		this.setState({ drag:e.target.id })
		e.dataTransfer.setData('text', $(e.target.id))
	}
	drop(e) {
	    e.preventDefault()

	    let copy = $(this.state.drag).cloneNode(true), count = this.state.count + 1
	    copy.id = `fnx-${count}`; copy.draggable = false;

	    if (!e.target.id.includes('fn')) {
	   		$('ex-selected').appendChild( copy )
	   		render( <span>{copy.innerText} <span class="glyphicon glyphicon-info-sign" onClick={() => alert(`abrir un modal ${copy.id}`)}/></span>, $(copy.id))
	   		this.setState({ count:count })
	    }
	}
	handleChange(value) {
		this.setState({ value:value })
	}
	render() {
		const { value } = this.state
		const { code } = this.props
		let items = [{icon:'spellcheck', text:'Ejercicio'}, {icon:'dashboard', text:'Funciones'}, {icon:'code', text:'Código'}]
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
							<Design drop={this.drop.bind(this)} allowDrop={this.allowDrop}/>
							<div id="ex-selected" class="selection selected hidden" onDrop={this.drop} onDragOver={this.allowDrop} 
								data-text="Funcionalidades..."/>
						</div>
					</div>

					<div class="row">
						<ul class="selector">
							{
								items.map((m, i) => { return (
									<li key={i} class={`col-xs-4 ${value == i ? 'active' : ''}`} onClick={this.handleChange.bind(this, i)}>
										<a><i>{m.icon}</i><span>{m.text}</span></a>
									</li>
								)})
							}
						</ul>
						{ 
							value == 0 ? <Overview code={code}/> :
							value == 1 ? <Functions code={code} active={Math.floor(code / Math.pow(10, 11))}/> : 
							value == 2 ? <Editor/> : '' 
						}
					</div>

					<div class="row hidden">
						<div class="col-md-12 fn">
							<h5><b>Funcionalidades:</b></h5>
							<div id="ex-functions" class="selection">	
							{
								this.state.functions.map((m, i) => { return (
									<h4 key={i} id={m.id} draggable="true" onDragStart={this.drag}>FN_{i < 9 ? '0' : ''}{i + 1}</h4>
								)})
							}
							</div>
						</div>	
					</div>
        		</div>
        	</div>
        )
    }
}

import Design from './2_Design'
import Functions from './2_Functions'
import Editor from './2_Editor'
import Overview from './2_Overview'