import React, { Component } from 'react'
import { COLORS, Tabs } from 'components'
import * as geometria from 'actions'

export default class F1 extends Component {
	constructor(props) {
		super(props); this.state = { height:300, width:800, rows:15, cols:40, active:0,
			background:COLORS['background'], border:COLORS['border'], font:COLORS['geometria'], grid:COLORS['grid']
		}
		this.update = this.update.bind(this)
	}
	componentDidUpdate() {
		let canvas = this.refs.canvas
		geometria.generarPlanoCartesiano(canvas, this.state)
		geometria.generarCuadradosUnidos(canvas, this.state)
	}
	handleActive(active) {
		this.setState({ active:active })
	}
	update() {
		this.setState({ 
			width:this.refs.x.value, height:this.refs.y.value, rows:this.refs.rows.value, cols:this.refs.cols.value,
			font:this.refs.font.value, background:this.refs.background.value, grid:this.refs.grid.value, border:this.refs.border.value
		})	
	}
	render() {
		const { background, border, width, height, rows, cols, font, grid, active } = this.state
		let items = ['grid_on','palette','style','insert_photo','widgets']
		return (
			<div class="modal-geometria">
				<h4 class="modal-title">Plano Cartesiano</h4>
				<Tabs active={active} setActive={(i) => this.handleActive.bind(this, i)} items={items}/>
				<div>
					<form class={active != 0?'hidden':''}>
						<div class="form-inline">
							<h5>Dimensiones:</h5>
							<label>Alto</label>
							<input ref="y" type="number" placeholder="Alto" class="form-control" defaultValue={height} onChange={this.update}/>
							<label>Ancho</label>
							<input ref="x" type="number" placeholder="Ancho" class="form-control" defaultValue={width} onChange={this.update}/>
							<h5>Cuadrícula:</h5>
							<label>Filas</label>
							<input ref="rows" type="number" placeholder="Filas" class="form-control" defaultValue={rows} onChange={this.update}/>
							<label>Columnas</label>
							<input ref="cols" type="number" placeholder="Columnas" class="form-control" defaultValue={cols} onChange={this.update}/>
						</div>
					</form>
					<form class={active != 1?'hidden':''}>
						<div class="form-inline">
							<h5>Colores:</h5>
							<label>Fondo</label>
							<input ref="background" type="color" class="form-control" defaultValue={background} onChange={this.update}/>
							<label>Malla</label>
							<input ref="grid" type="color" class="form-control" defaultValue={grid} onChange={this.update}/>
							<label>Borde</label>
							<input ref="border" type="color" class="form-control" defaultValue={border} onChange={this.update}/>
							<label>Texto</label>
							<input ref="font" type="color" class="form-control" defaultValue={font} onChange={this.update}/>
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
					<canvas ref="canvas" id="canvas" style={{ background:background, borderColor:border, width:`${width}px`, height:`${height}px`, color:font }}>
						Your browser does not support the HTML5 canvas.
					</canvas>
				</div>	
				<div class="button">
					<button onClick={this.props.add(this.refs.canvas)}>Agregar</button>
				</div>	
			</div>
		)
	}
}