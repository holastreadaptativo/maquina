import React, { Component } from 'react'
import { DEFAULT } from 'stores'

export class Buscador extends Component {
	constructor() {
		super()
		this.state = { code:DEFAULT.CODE, length:0, search:[], selected:false, temp:0 }
	}
	render() {
		return (
			<div class="buscador">
				<form>
					<Search {...this.state} {...this.props} setState={::this.setState}/>
					<Table {...this.state} {...this.props} setState={::this.setState}/>
				</form>
			</div>
		)
	}
}

import Search from './0_Search'
import Table from './0_Table'