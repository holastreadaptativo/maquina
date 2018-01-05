import React, { Component } from 'react'

export default class Functions extends Component {
	constructor() {
		super(); this.state = { active:0, setActive:this.setActive.bind(this) }
	}
	componentDidMount() {
		this.setState({ active:this.props.active % 5 + 1 })
	}
    setActive(active) {
        this.setState({ active:active })
    }
	render() {
        const { active, setActive } = this.state
		return(
			<div class="fn-accordion">
				<ul class="accordion">
				    <li class={`tabs ${active == 1 ? 'active' : ''}`} onClick={() => setActive(1)}>
				        <div class="social-links fn-numeracion">
				          	<a>Numeración</a>
				        </div>
				        <div class="paragraph">
				          	<h1>Numeración</h1>
				          	<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris dapibus vitae felis ac tempor. </p>
				        </div>
				    </li>
				    <li class={`tabs ${active == 2 ? 'active' : ''}`} onClick={() => setActive(2)}>
				        <div class="social-links fn-algebra">
				          	<a>Álgebra</a>
				        </div>
				        <div class="paragraph">
				          	<h1>Álgebra</h1>
				          	<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris dapibus vitae felis ac tempor. </p>
				        </div>
				    </li>
				    <li class={`tabs ${active == 3 ? 'active' : ''}`} onClick={() => setActive(3)}>
				        <div class="social-links fn-datos">
				          	<a>Datos</a>
				        </div>
				        <div class="paragraph">
				          	<h1>Datos</h1>
				          	<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris dapibus vitae felis ac tempor. </p>
				        </div>
				    </li>
				    <li class={`tabs ${active == 4 ? 'active' : ''}`} onClick={() => setActive(4)}>
				        <div class="social-links fn-medicion">
				          	<a>Medición</a>
				        </div>
				        <div class="paragraph">
				          	<h1>Medición</h1>
				          	<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris dapibus vitae felis ac tempor. </p>
				        </div>
				    </li>
				    <li class={`tabs ${active == 5 ? 'active' : ''}`} onClick={() => setActive(5)}>
				        <div class="social-links fn-geometria">
				          	<a>Geometría</a>
				        </div>
				        <div class="paragraph">
				          	<h1>Geometría</h1>
				          	<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris dapibus vitae felis ac tempor. </p>
				        </div>
				    </li>
			    </ul>
		    </div>
		)
	}
}