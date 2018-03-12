import React, { Component } from 'react'
//import { SIZES, DEVICES } from 'stores'
//import { data } from 'stores'
//import { respuestas, focus } from 'actions'
import { Tab, Row, Col, Nav, NavItem } from 'react-bootstrap';
import { TextEditor } from 'components'

export default class Editor extends Component {

	constructor(props) {
		super(props)
		// let b = props
		// //let a = data.child(b)
		// let feedback = props.store.answers.feedback
		// let feedBackState = feedback ? feedback : ''
		// this.state = {
		// 	...this.props,
		// 	feedBackState
		// }
	}

	componentWillUnmount() {
		//let code = this.store.code
		//respuestas('UPDATE', {this.store.code})
	}


	render() {
		const { background, width, height, borderWidth, borderStyle, borderColor, borderRadius } = this.props.params
		const { add, update, push } = this.props.store
		let onSave = push ? add : update
		return(
			<div class="react-functions">
				<Tab.Container id="left-tabs-example" defaultActiveKey="first">
					<div class="react-config">
						<div class="title">
							<h3>Configuración</h3>
						</div>
						<div>
							<Row className="clearfix">
								<Col sm={12}>
									<Nav bsStyle="pills" stacked>
										<NavItem style={{color: '#ffffff', fontWeight: 'bold',borderRadius: '5px', margin:'0 10px',width: '40%', display: 'inline-block', backgroundColor: '#262F3D'}} eventKey="first">Respuesta</NavItem>
										<NavItem style={{color: '#ffffff', fontWeight: 'bold',borderRadius: '5px', margin:'0 10px',width: '40%', display: 'inline-block', backgroundColor: '#262F3D'}} eventKey="second">FeedBack</NavItem>
									</Nav>
								</Col>
								<Col sm={12}>
									<Tab.Content animation>
										<Tab.Pane eventKey="first">
											{this.props.children}
										</Tab.Pane>
										<Tab.Pane eventKey="second" style={{color: '#ffffff', fontWeight: 'normal', padding: '20px'}}>
											Insertar el feedback de esta respuesta el editor de texto, no necesita hacer clic para guardar, la misma guarda el contenido automáticamente.
										</Tab.Pane>
									</Tab.Content>
								</Col>
							</Row>							
						</div>
						<div class="react-container-respuestas">
							<Row className="clearfix">
								<Col sm={12}>
									<Tab.Content animation>
										<Tab.Pane eventKey="first">
											<div class="text-center">
											<span class="react-close glyphicon glyphicon-remove" onClick={this.props.store.onHide}/>
												<canvas id="container" style={{ background:background, width:`${width}px`, height:`${height}px`, 
												border:`${borderWidth}px ${borderStyle} ${borderColor}`, borderRadius:`${borderRadius}px` }}>
													Your browser does not support the HTML5 canvas.
												</canvas>
												<button id="btn-save" class="react-submit-respuesta" onClick={onSave(this.props.params)}>Guardar</button>
											</div>
										</Tab.Pane>
										<Tab.Pane eventKey="second">
											<TextEditor {...this.state}/>
										</Tab.Pane>
									</Tab.Content>
								</Col>
							</Row>							
						</div>
					</div>
				</Tab.Container>
			</div>
		)
	}
}