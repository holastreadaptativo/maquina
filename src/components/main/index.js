import Design from './__Design'
import Download from './__Download'
import Functions from './__Functions'
import Overview from './__Overview'
import Versions from './__Versions'

import React, { Component } from 'react'
import { Modal, Section } from 'components'
import { action } from 'actions'

import Variables from './__Variables'

export class OnePage extends Component {
	constructor(props) {
		super(props)
		this.state = { active:0, limit:32, section:'functions', selected:128, tab:0, total:8192, vars:[], vt:[] }
	}
	componentWillMount() {
		action.ver('CHECK', { code:this.props.code, update:(::this.setState) })
	}
	download() {
		action.ver('DOWNLOAD', { ...this.props, vt:this.state.vt })
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
					<Variables {...this.props}/>
				</Modal>
			</Section>
		)
	}
}

export Editor from './Editor'
export Buscador from './Buscador'