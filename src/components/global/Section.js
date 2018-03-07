import React, { Component } from 'react'
import { browserHistory } from 'react-router'
import { ROUTES } from 'stores'
import { show } from 'actions'

export default class Section extends Component {
    handlerSubmit(e) {
		e.preventDefault()
		let i = this.props.active + 1
		this.props.setActive(i)
		browserHistory.push(ROUTES[i].path)
	}
	render() {
		return(
        	<div class={this.props.style}>
        		<div class="container">
        			{this.props.children}
        			<div class={show(this.props.condition, 'row')}>
						<div class="continue">						
							<div class="react-continue">
								<button class={'btn btn-success'} onClick={::this.handlerSubmit}>Continuar</button>
							</div>
						</div>
					</div>
        		</div>
        	</div>
        )
    }
}