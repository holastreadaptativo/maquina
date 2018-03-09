import React, { Component } from 'react'
import { SIZES, DEVICES } from 'stores'

export default class Modal extends Component {
	render() {
		const { background, width, height, borderWidth, borderStyle, borderColor, borderRadius } = this.props.params
		const { add, update, push } = this.props.store
		let onSave = push ? add : update
        return(
        	<div class="react-functions">
				<div class="react-config">
					<div class="title">
						<h3>Configuración</h3>
					</div>
					{this.props.children}
			    </div>
			    <div class="react-container">				
					<div class="canvas">
						<canvas id="container" style={{ background:background, width:`${width}px`, height:`${height}px`, 
						border:`${borderWidth}px ${borderStyle} ${borderColor}`, borderRadius:`${borderRadius}px` }}>
							Your browser does not support the HTML5 canvas.
						</canvas>
					</div>
					<span class="react-close glyphicon glyphicon-remove" onClick={this.props.store.onHide}/>
					<button id="btn-save" class="react-submit" onClick={onSave(this.props.params)}>Guardar</button>
				</div>
				<div class="react-header">
					<h5>{this.props.title}</h5>
				</div>
				<div class="react-footer">
					<h6>Devices:</h6>
					{
						DEVICES.map((n, j) => 
							<h6 key={j}>
								<i>{n.icon}</i>
								<select defaultValue={12}>
								{
									SIZES.map((m, i) =>
										<option key={i} value={m}>{Math.round(250/3*m, 2)/10+'%'}</option>
									)
								}	
								</select>
							</h6>
						)
					}
					</div>			
			</div>
		)
	}
}