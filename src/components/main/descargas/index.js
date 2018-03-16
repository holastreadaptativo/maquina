import React, { Component } from 'react'

export class Descargas extends Component {
    constructor() {
		super()
		this.state = { radius:100, color:'red', x:-100, y:-100 }
	}
	onMouseMove(e) {
		const { radius, x, y } = this.state
		this.setState({ x:(e.clientX-radius/2), y:(e.clientY-radius/2), color:`rgb(${x%192+64}, ${y%192+64}, ${(x+y)%192+64})` })
	}
	changeRadius(r) {
		this.setState({ radius:this.state.radius*r })
	}
	render() {
		const { radius, color, x, y } = this.state
		let variables = [{var:'a', val:6}, {var:'a1', val:5}, {var:'a2', val:4}, {var:'e', val:3}]
		let fn = 'a * a1 + Math.pow(e, a2 + 1) + 30'
		let xy = []
		for (let i = 0, k = 0; i < fn.length; i++) {
			if (fn[i].match(/[*+()-,]/)) {
				xy.push(fn.substring(k, i))
				xy.push(fn[i])
				k = i + 1
			} else if (i + 1 == fn.length) {
				xy.push(fn.substring(k, fn.length))
			}
		}
		for (let i = 0; i < xy.length; i++) {
			for (let j = 0; j < variables.length; j++) {
				if (xy[i].toString().trim() == variables[j].var) {
					xy[i] = variables[j].val
				}
			}
		}
		return(
        	<div class="descargas" onMouseMove={::this.onMouseMove}>
        		{ JSON.stringify(variables) }<br/>
        		{ fn }<br/>
        		{ JSON.stringify(xy.join('')) }<br/>
        		{ eval(xy.join('')) }<br/>
        		<div class="hidden">
					<div>
						<div id="circle-css" style={{ height:`${radius}px`, width:`${radius}px`, backgroundColor:color, top:`${y}px`, left:`${x}px` }}></div>
						<button class="hidden" onClick={this.changeRadius.bind(this, 1.1)}><span class="glyphicon glyphicon-plus"/></button>
						<button class="b hidden" onClick={this.changeRadius.bind(this, 0.9)}><span class="glyphicon glyphicon-minus"/></button>
					</div>
        		</div>
        	</div>
        )
    }
}