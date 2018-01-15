import React, { Component } from 'react'
import { ExDesign, ExFunctions, ExEditor } from 'components'
import { render } from 'react-dom'
import $ from 'actions'

export class Ejercicios extends Component {
    constructor(props) {	
		super(props); this.state = { clicked:false, drag:'', functions:[], count:0, value:1 }
		this.setClicked = this.setClicked.bind(this)
		this.drag = this.drag.bind(this)
		this.drop = this.drop.bind(this)
	}
	componentDidMount() {
		let functions = []
		for (let i = 0; i < 28; i++) { functions.push({ id:`fn-${i}`, count:i }) }
		this.setState({ functions:functions })
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

	    let copy = $(this.state.drag).cloneNode(true), count = this.state.count + 1
	    copy.id = `fnx-${count}`; copy.draggable = false;

	    if (!ev.target.id.includes('fn')) {
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
							<ExDesign drop={this.drop.bind(this)} allowDrop={this.allowDrop}/>
							<div id="ex-selected" class="selection selected hidden" onDrop={this.drop} onDragOver={this.allowDrop} 
								data-text="Funcionalidades..."/>
						</div>
					</div>

					<div class="row">
						<ul class="selector">
							<li class={`col-xs-4 ${value == 0 ? 'active' : ''}`} onClick={this.handleChange.bind(this, 0)}>
								<a><i>spellcheck</i><span>Variables</span></a>
							</li>
							<li class={`col-xs-4 ${value == 1 ? 'active' : ''}`} onClick={this.handleChange.bind(this, 1)}>
								<a><i>dashboard</i><span>Funciones</span></a>
							</li>
							<li class={`col-xs-4 ${value == 2 ? 'active' : ''}`} onClick={this.handleChange.bind(this, 2)}>
								<a><i>code</i><span>Código</span></a>
							</li>
						</ul>
						{ 
							value == 0 ? <div style={{background:'#1e1f40', height:'275px', width:'97%', color:'white', padding:'65px 10px'}}>Variables</div> :
							value == 1 ? <ExFunctions active={Math.floor(this.props.code / 100000000000)}/> : 
							value == 2 ? <ExEditor/> : '' 
						}
					</div>

					<div class="row hidden">
						<div class="col-md-12 fn">
							<h5><b>Funcionalidades:</b></h5>
							<div id="ex-functions" class="selection">	
							{
								this.state.functions.map(m => { return (
									<h4 key={m.id} id={m.id} draggable="true" onDragStart={this.drag}>FN_{m.count < 9 ? '0' : ''}{m.count + 1}</h4>
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

export ExDesign from './2_ExDesign'
export ExFunctions from './2_ExFunctions'
export ExEditor from './2_ExEditor'