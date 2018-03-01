import React, { Component } from 'react'
import { browserHistory } from 'react-router'
import { NAVBAR } from 'stores'
import { show } from 'actions'

export default class Continue extends Component {
	handlerSubmit(e) {
		e.preventDefault()
		let i = this.props.active + 1
		this.props.setActive(i)
		browserHistory.push(NAVBAR[i].path)
	}
	render() {
    	return (
    		<div class={show(this.props.condition, 'row')}>
				<div class="continue">						
					<div class="react-continue">
						<button class={'btn btn-success'} onClick={::this.handlerSubmit}>Continuar</button>
					</div>
				</div>
			</div>
    	)
    }
}