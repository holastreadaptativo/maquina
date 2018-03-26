import React, { Component } from 'react'
import { browserHistory } from 'react-router'
import { ROUTES } from 'stores'
import { show } from 'actions'

export default class Section extends Component {
    handlerSubmit(e) {
		e.preventDefault()
		if (!this.props.download) {
			let i = this.props.active + 1; this.props.setActive(i)
			browserHistory.push(ROUTES[i].path)
		} else {
			this.props.download()
		}
	}
	render() {
		return (
        	<section class={this.props.style}>
        		<div class="container-fluid">
        			{this.props.children}
        			<div class={show(this.props.condition, 'row')}>
						<div class="react-continue">						
							<button class="btn btn-success" onClick={::this.handlerSubmit}>
								{!this.props.download ? 'Continuar' : 'Descargar'}
							</button>
						</div>
					</div>
        		</div>
        	</section>
        )
    }
}