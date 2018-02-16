import React, { Component } from 'react'
import { Modal } from 'react-bootstrap'
import Functions from './Functions'

export class Respuestas extends Component {
	constructor() {
		super()
		this.state = {
			clicked:false,
			active:0,
			width:'960px',
			value:1,
			modal:false,
			option: 0,
			btnsResp: ['Input', 'ComboBox', 'Radio Button', 'Texto', 'Imagen']
		}
		this.setClicked = this.setClicked.bind(this)
		this.setActive = this.setActive.bind(this)
		this.handleModal = this.handleModal.bind(this)
	}
	componentWillUnmount() {
		this.setState({ modal:false })
	}
	setClicked() {
		this.setState({ clicked:!this.state.clicked })
	}
	setActive(active) {
			this.setState({ active:active, width:active == 0 ? '960px' : active == 1 ? '768px' : '320px' })
	}
	handleChange(value) {
		this.setState({ value:value })
	}

	handleModal() {
		this.setState({ modal:!this.state.modal })
	}
	setOption(option) {
		this.setState({
			option: option, 
			modal:!this.state.modal,
		})
	}
	
	
	render() {
		const { active, width, value, modal, option, btnsResp } = this.state
        return(
        	<div class="main-container ejercicios respuestas">
        		<div class="container">
							<h3>Crear respuestas
								<span class="glyphicon glyphicon-option-vertical" onClick={this.setClicked}>
									<div class={`options ${this.state.clicked ? 'clicked' : ''}`}>
										<ul>
											<li><a>-</a></li>
										</ul>
									</div>
								</span>
								<span class="glyphicon glyphicon-info-sign">
									<div class="info">Información sobre el funcionamiento de esta sección y la creación de respuestas</div>
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
									<div class="device" style={{width:width}}/>
								</div>
							</div>	

							<div class="row">
								<ul class="selector">
									<li class={`col-xs-4 ${value == 0 ? 'active' : ''}`} onClick={this.handleChange.bind(this, 0)}>
										<a><i>spellcheck</i><span>Variables</span></a>
									</li>
									<li class={`col-xs-4 ${value == 1 ? 'active' : ''}`} onClick={this.handleChange.bind(this, 1)}>
										<a><i>receipt</i><span>Respuestas</span></a>
									</li>
									<li class={`col-xs-4 ${value == 2 ? 'active' : ''}`} onClick={this.handleChange.bind(this, 2)}>
										<a><i>code</i><span>Código</span></a>
									</li>
								</ul>
							</div>

							<div class="row">
								<br/>
								<label>Respuesta correcta</label>
								<div class="form-group">
									<div class="row">
										<div class="col-sm-12">
											<fieldset>
												<legend>Agregar</legend>
												<div class="button-opt-resp">
													{
														this.state.btnsResp.map((el,index) => {
															return <button onClick={this.setOption.bind(this,el)} type="button" /*compArr={btnsResp}*/ key={index} class="btn btn-default">{el}</button>
														})
													}
												</div>
											</fieldset>
										</div>
									</div>
									<div class="form-group">
										<input type="text" placeholder="formula" class="form-control"/>
									</div>
									<div class="form-group">
										<input type="text" placeholder="feedback" class="form-control"/>
									</div>
								</div>
							</div>	
        		</div>
						<Modal show={modal} onHide={this.handleModal} aria-labelledby="contained-modal-title-lg" bsClass="modal" bsSize="large">
							<Functions option={option}/>
						</Modal>
        	</div>
        )
    }
	}
	
//<div class="form-group">
//	<input type="text" placeholder="glosa" class="form-control"/>
//</div>