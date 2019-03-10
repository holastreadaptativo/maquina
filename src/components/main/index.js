import Design from './__Design'
import Download from './__Download'
import Functions from './__Functions'
import Overview from './__Overview'
import Versions from './__Versions'

import React, { Component } from 'react'
import { Modal, Section } from 'components'
import { action } from 'actions'
import { DEFAULT } from 'stores'

import Variables from './__Variables'

export class OnePage extends Component {
	constructor() {
		super()
		this.state = DEFAULT.EXE;
	}
	componentWillMount() {
		this.refresh(this.props.code)
	}
	componentWillReceiveProps(next) {
		if (next.code != this.props.code) this.refresh(next.code)
	}
	download(opcionDescarga) {
		console.log(opcionDescarga);
		this.refresh(this.props.code)
		action.ver('DOWNLOAD2', { ...this.props, vt:this.state.vt, opcionDescarga }) //genera el html de los ejercicios creados
	}
	refresh(code) {
		action.ver('CHECK', { code, update:(::this.setState) })
	}
	render() {
		let k = 0; const { section } = this.state, params = { ...this.props, ...this.state, path:section }
		return (
			<Section style="design" condition={true} {...this.props} download={::this.download}>
				<Functions id={k++} {...params} setState={::this.setState}/>
				<Overview id={k++} {...params} setState={::this.setState}/>
				<Versions id={k++} {...params} setState={::this.setState}/>
				<Download id={k++} {...params}/>
				<Design {...params}/>
				<Modal modal={this.props.modal} setState={this.props.setState}>
					<Variables {...this.props} setState={this.props.setState}/>
				</Modal>
			</Section>
		)
	}
}

export Buscador from './Buscador'