import React, { Component } from 'react'
import { Modal } from 'react-bootstrap'
import { Continue } from 'components'
import Functions from './Functions'
import { focus } from 'actions'

export class Respuestas extends Component {
	constructor() {
		super()
		this.state = {
			width:1200, modal:false, option: 0, active: 0, btnsResp: ['Input', 'ComboBox', 'Radio Button', 'Texto', 'Imagen']
		}
	}
	componentWillUnmount() {
		this.setState({ modal:false })
	}
	handleModal() {
		this.setState({ modal:!this.state.modal })
	}
	setActive(active) {
			this.setState({ active:active, width:active == 0 ? 1200 : active == 1 ? 768 : 320 })
	}
	setOption(option) {
		this.setState({
			option: option, 
			modal:!this.state.modal
		})
	}
	render() {
		const { active, width, modal, option } = this.state
        return(
        	<div class="ejercicios">
        		<div class="container">
					<div class="row">
						<div class="col-md-12 design">
							<h5><b>&nbsp;</b></h5>
							<nav class="devices">
								<i class={`${active == 0 ? 'active' : ''}`} onClick={() => this.setActive(0)}>desktop_windows</i>
								<i class={`${active == 1 ? 'active' : ''}`} onClick={() => this.setActive(1)}>tablet_mac</i>
								<i class={`${active == 2 ? 'active' : ''}`} onClick={() => this.setActive(2)}>phone_iphone</i>
							</nav>
							<div class="device" style={{width:`${width}px`}}/>
						</div>
					</div>	
					<aside class={focus(this.props.option == 0, 'active')}>
						<div class="title">
							<h3>Respuesta</h3>
						</div>
						<div class="respuestas">
							<fieldset>
								<div class="button-opt-resp">
									{
										this.state.btnsResp.map((el,index) => {
											return <button onClick={this.setOption.bind(this,el)} type="button" /*compArr={btnsResp}*/ key={index} class="btn btn-default">{el}</button>
										})
									}
								</div>
							</fieldset>
							<div class="form-group">
								<input type="text" placeholder="formula" class="form-control"/>
							</div>
							<div class="form-group">
								<input type="text" placeholder="feedback" class="form-control"/>
							</div>
						</div>
					</aside>	
					<Continue {...this.props} condition={this.props.functions.length > 0}/>
        		</div>
				<Modal show={modal} onHide={::this.handleModal} aria-labelledby="contained-modal-title-lg" bsClass="modal" bsSize="large">
					<Functions code={this.props.code} option={option}/>
				</Modal>
        	</div>
        )
    }
	}
	
//<div class="form-group">
//	<input type="text" placeholder="glosa" class="form-control"/>
//</div>