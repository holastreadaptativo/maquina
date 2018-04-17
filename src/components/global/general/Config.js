import React, { Component } from 'react'
import { browserHistory } from 'react-router'
import { glyph } from 'actions'

export default class Config extends Component {
	constructor() {
		super()
		this.state = { avatar:[], selected:5 }
	}
	componentWillMount() {
		let avatar = []
		for (let i = 0; i < 3; i++)
			for (let j = 0, k = 6 * i; j < 6; j++, k++) {
				avatar.push({backgroundPosition:`${-j*76 - 1}px ${-i*81 - 1}px`, visibility:`${k < 17 ? 'initial': 'hidden'}`})
				this.setState({ avatar })
			}
	}
    render() {
    	const { avatar, selected } = this.state, { fn, ln, email } = this.props.user
        return (        	
            <section class="config">
            	<center>
            		<main class="content">
	            		<form class="signin config">
	            			<h2>Configuración</h2>
	            			<label>Nombre</label>
	            			<input class="form-control" defaultValue={fn.concat(' ', ln)} type="text" disabled></input>
	            			<label>Correo electrónico</label>
	            			<input class="form-control" defaultValue={email} type="email" disabled></input>
	            		</form>
	            		<h5>Selecciona tu avatar</h5>
	            		{
	            			avatar.map((m, i) =>
	            				<o key={i}>
		            				<div class={`avatar ${i != selected ? '' : 'selected'}`} style={m} onClick={() => this.setState({ selected:i })}/>
		            				{ i % 6 == 5 && <br/> }
	            				</o>
	            			)
	            		}
	            		<span class={glyph('remove close')} onClick={browserHistory.goBack}/>
	            	</main>
            	</center>
	            <div class="react-bg"/>
            </section>
        )
    }
}

/*
import SplitPane from 'react-split-pane'

export class Config2 extends Component {
    render() {
        let min = 20, max = window.innerWidth - min - 240
        return(
        	<div class="config">
        		<div class="slider-control-container">
					<div class="container">
						<h3>Configuración</h3>
						<SplitPane defaultSize="50%" minSize={min} maxSize={max} split="vertical" class="resizable">
				            <div class="static-background"/>
				            <div class="dynamic-background"/>
				        </SplitPane>
					</div>
        		</div>
        	</div>
        )
    }
}
*/