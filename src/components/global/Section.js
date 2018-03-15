import React, { Component } from 'react'
import { browserHistory } from 'react-router'
import { ROUTES } from 'stores'
import { show } from 'actions'

export default class Section extends Component {
    handlerSubmit(e) {
		e.preventDefault()
    	const { active, setActive, download } = this.props

		if (!download) {
			let i = active + 1; setActive(i)
			browserHistory.push(ROUTES[i].path)
		} else {
			download()
		}
	}
	render() {
		return(
        	<div class={this.props.style}>
        		<div class="container">
        			{this.props.children}
        			<div class={show(this.props.condition, 'row')}>
						<div class="continue">						
							<div class="react-continue">
								<button class={'btn btn-success'} onClick={::this.handlerSubmit}>
									{!this.props.download ? 'Continuar' : 'Descargar'}
								</button>
							</div>
						</div>
					</div>
        		</div>
        	</div>
        )
    }
}