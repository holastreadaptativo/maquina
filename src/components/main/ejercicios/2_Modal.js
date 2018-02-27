import React, { Component } from 'react'
import { Save } from 'components'
import { SIZES } from 'stores'

export default class Modal extends Component {
	render() {
		const { background, width, height, borderWidth, borderStyle, borderColor, borderRadius } = this.props.params
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
					<Save {...this.props.store} params={this.props.params}/>
				</div>
				<div class="react-header">
					<h5>{this.props.title}</h5>
				</div>
				<div class="react-footer">	
					<h6>Devices:</h6>
					<h6>
						<i>desktop_windows</i>
						<select defaultValue={12}>
						{
							SIZES.map((m, i) => { return (
								<option key={i} value={m}>{Math.round(250/3*m, 2)/10+'%'}</option>
							)})
						}	
						</select>
					</h6>
					<h6>
						<i>tablet_mac</i>
						<select defaultValue={12}>
						{
							SIZES.map((m, i) => { return (
								<option key={i} value={m}>{Math.round(250/3*m, 2)/10+'%'}</option>
							)})
						}	
						</select>
					</h6>
					<h6>
						<i>phone_iphone</i>
						<select defaultValue={12}>
						{
							SIZES.map((m, i) => { return (
								<option key={i} value={m}>{Math.round(250/3*m, 2)/10+'%'}</option>
							)})
						}	
						</select>
					</h6>
				</div>
			</div>
		)
	}
}			