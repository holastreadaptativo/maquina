import React, { Component } from 'react'
import { Modal } from 'react-bootstrap'
import { COLORS } from 'components'

export default class F1 extends Component {
	constructor(props) {
		super(props); this.state = { modal:false, height:300, width:800, rows:15, cols:40, active:0,
			background:COLORS['background'], border:COLORS['border'], font:COLORS['geometria'], grid:COLORS['grid'] 
		}
		this.handleModal = this.handleModal.bind(this)
		this.draw = this.draw.bind(this)
	}
	componentDidMount() {
		this.setState({ width:800, height:300 })
	}
	componentDidUpdate() {
		const { cols, rows, grid, height, width } = this.state
		
		let canvas = this.refs.canvas; canvas.width = width; canvas.height = height
		let ctx = canvas.getContext('2d'), w = width/cols, h = height/rows, ax, ay, bx, by
		ctx.clearRect(0, 0, width, height)
		
		//GENERAR CUADRICULADOS
		ctx.beginPath()
		for (let x = w; x < width; x += w) {
             ctx.moveTo(x, 0); ctx.lineTo(x, height)
   		}
   		for (let y = h; y < height; y += h) {
            ctx.moveTo(0, y); ctx.lineTo(width, y)
   		}
   		ctx.strokeStyle = grid
   		ctx.lineWidth = 1
   		ctx.stroke()
   		ctx.closePath()

   		//GENERAR CUADRADOS RANDOM
   		/*ctx.beginPath()
   		ctx.fillStyle = 'rgba(200, 0, 0, 0.5)'
   		for (let i = 0, a, b; i < 30; i++) {
   			a = Math.floor(Math.random()*cols)*w
   			b = Math.floor(Math.random()*rows)*h
   			ctx.fillRect(a, b, w, h)	
   		}
   		ctx.fillStyle = 'rgba(0, 0, 200, 0.5)'
   		for (let i = 0, a, b; i < 30; i++) {
   			a = Math.floor(Math.random()*cols)*w
   			b = Math.floor(Math.random()*rows)*h
   			ctx.fillRect(a, b, w, h)	
   		}
   		ctx.closePath()*/

   		//GENERAR FIGURA
   		ctx.beginPath()
   		ctx.fillStyle = 'rgba(200, 0, 0, 0.5)'
   		ax = Math.floor(Math.random()*cols)*w
   		ay = Math.floor(Math.random()*rows)*h
   		ctx.fillRect(ax, ay, w, h)	

   		ctx.fillStyle = 'rgba(0, 0, 200, 0.5)'
   		bx = Math.floor(Math.random()*cols)*w
   		by = Math.floor(Math.random()*rows)*h
   		ctx.fillRect(bx, by, w, h)
   		ctx.closePath()
 		
   		let fx, fy, tx, ty, headlen = w/3, rad = Math.PI/180
   		if (ax < bx) {
   			fx = ax; tx = bx; fy = ay; ty = by;
   		} else {
   			fx = bx; tx = ax; fy = by; ty = ay;
   		}

   		//UNIR CON FLECHAS
   		ctx.beginPath()
   		ctx.strokeStyle = 'darkgreen'
   		for (let x = fx, a = Math.atan2(0, w); x < tx; x += w) {
   			ctx.moveTo(x, fy); ctx.arc(x + w/2, fy + h/2 - 3, 220/320*w, 220*rad, 320*rad, false) //ctx.lineTo(x + w, fy)
   			ctx.lineTo(x + w - headlen * Math.cos(a + Math.PI/24), fy - headlen * Math.sin(a + Math.PI/24))
   			ctx.moveTo(x + w, fy)
   			ctx.lineTo(x + w - headlen * Math.cos(a + Math.PI/2), fy - headlen * Math.sin(a + Math.PI/2))
   		}
   		let i = fy < ty ? 1 : -1
   		for (let y = fy, a = Math.atan2(h, 0); i*y < i*ty; y += i*h) {
			ctx.moveTo(tx, y + i*h)
			ctx.moveTo(tx, y + i*h)
			ctx.lineTo(tx - headlen * Math.cos(a + i*Math.PI/2), y + i*h - i*headlen * Math.sin(a + i*Math.PI/2)) 
			ctx.moveTo(tx, y + i*h)
   			ctx.lineTo(tx - headlen * Math.cos(a + i*Math.PI/24), y + i*h - i*headlen * Math.sin(a + i*Math.PI/24))
   			ctx.moveTo(tx, y); ctx.arc(tx - i*w/2 + i*3, y + i*h/2, 220/320*w, (i > 0 ? 310 : 130)*rad, (i > 0 ? 50 : 230)*rad, false) //ctx.lineTo(tx, y + i*h)
   		}
   		ctx.stroke()
   		ctx.closePath()
	}
	componentWillUnmount() {
		this.setState({ modal:false })
	}
	handleModal() {
		this.setState({ modal:!this.state.modal })
	}
	handleActive(active) {
		this.setState({ active:active })
	}
	draw() {
		this.setState({ 
			width:this.refs.x.value, height:this.refs.y.value, rows:this.refs.rows.value, cols:this.refs.cols.value,
			font:this.refs.font.value, background:this.refs.background.value, grid:this.refs.grid.value, border:this.refs.border.value
		})	
	}
	render() {
		const { modal, background, border, width, height, rows, cols, font, grid, active } = this.state
		let tabs = { width:`${100/5}%` }
		return (
			<a onClick={this.handleModal} class="button">{this.props.text}
				<Modal show={modal} onHide={this.handleModal} aria-labelledby="contained-modal-title-lg" bsClass="modal" bsSize="large">
					<div class="modal-geometria">
						<h4 class="modal-title">Plano Cartesiano</h4>
						<ul class="modal-tabs">
							<li class={`${active == 0 ? 'active' : ''}`} style={tabs} onClick={this.handleActive.bind(this, 0)}>
								<a><i>grid_on</i></a>
							</li>
							<li class={`${active == 1 ? 'active' : ''}`} style={tabs} onClick={this.handleActive.bind(this, 1)}>
								<a><i>palette</i></a>
							</li>
							<li class={`${active == 2 ? 'active' : ''}`} style={tabs} onClick={this.handleActive.bind(this, 2)}>
								<a><i>style</i></a>
							</li>
							<li class={`${active == 3 ? 'active' : ''}`} style={tabs} onClick={this.handleActive.bind(this, 3)}>
								<a><i>insert_photo</i></a>
							</li>
							<li class={`${active == 4 ? 'active' : ''}`} style={tabs} onClick={this.handleActive.bind(this, 4)}>
								<a><i>widgets</i></a>
							</li>
						</ul>
						<div>
							<form class={active != 0?'hidden':''}>
								<div class="form-inline">
									<h5>Dimensiones:</h5>
									<label>Alto</label>
									<input ref="y" type="number" placeholder="Alto" class="form-control" defaultValue={height} onChange={this.draw}/>
									<label>Ancho</label>
									<input ref="x" type="number" placeholder="Ancho" class="form-control" defaultValue={width} onChange={this.draw}/>
									<h5>Cuadrícula:</h5>
									<label>Filas</label>
									<input ref="rows" type="number" placeholder="Filas" class="form-control" defaultValue={rows} onChange={this.draw}/>
									<label>Columnas</label>
									<input ref="cols" type="number" placeholder="Columnas" class="form-control" defaultValue={cols} onChange={this.draw}/>
								</div>
							</form>
							<form class={active != 1?'hidden':''}>
								<div class="form-inline">
									<h5>Colores:</h5>
									<label>Fondo</label>
									<input ref="background" type="color" class="form-control" defaultValue={background} onChange={this.draw}/>
									<label>Malla</label>
									<input ref="grid" type="color" class="form-control" defaultValue={grid} onChange={this.draw}/>
									<label>Borde</label>
									<input ref="border" type="color" class="form-control" defaultValue={border} onChange={this.draw}/>
									<label>Texto</label>
									<input ref="font" type="color" class="form-control" defaultValue={font} onChange={this.draw}/>
								</div>
							</form>
							<form class={active != 2?'hidden':''}>
								<div class="form-inline">
										
								</div>
							</form>
							<form class={active != 3?'hidden':''}>
								<div class="form-inline">
										
								</div>
							</form>
							<form class={active != 4?'hidden':''}>
								<div class="form-inline">
										
								</div>
							</form>
						</div>
						<div class="canvas">
							<canvas ref="canvas" style={{ background:background, borderColor:border, width:`${width}px`, height:`${height}px`, color:font }}>
								Your browser does not support the HTML5 canvas.
							</canvas>
						</div>	
						<div class="button hidden">
							<button onClick={this.draw.bind(this)}>Dibujar</button>
						</div>	
					</div>
				</Modal>
			</a>
		)
	}
}