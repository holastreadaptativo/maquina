import React, { Component } from 'react'
import { DEFAULT } from 'stores'

export class Buscador extends Component {
	constructor() {
		super()
		this.state = DEFAULT.SEARCH
	}
	render() {
		return (
			<div class="buscador">
				<Search {...this.state} setCode={this.props.setCode} setState={::this.setState}/>
				<Table {...this.state} setCode={this.props.setCode} setState={::this.setState}/>
			</div>
		)
	}
}

import Search from './0_Search'
import Table from './0_Table'