import React, { Component } from 'react'
import { browserHistory } from 'react-router'
import { ROUTES } from 'stores'
import { show } from 'actions'

export default class Section extends Component {
    handlerSubmit(e, opcionDescarga) {
			e.preventDefault()
			console.log(opcionDescarga);
			if (!this.props.download) {
				let i = this.props.active + 1; this.props.setActive(i)
				browserHistory.push(ROUTES[i].path)
			} else {
				this.props.download(opcionDescarga)
			}
		}
	render() {
		return (
        	<section class={this.props.style}>
        		<div class="container-fluid">
        			{this.props.children}
        			<div class={show(this.props.condition, 'row')}>
								<article>						
									<button class="btn btn-success" onClick={(e) => this.handlerSubmit(e, 'des')}>
										{!this.props.download ? 'Continuar' : 'Descargar CSS Propio'}
									</button>
								</article>
								<article>						
									<button class="btn btn-success" onClick={(e) => this.handlerSubmit(e, 'prod')}>
										{!this.props.download ? 'Continuar' : 'Descargar CSS Global'}
									</button>
								</article>
								<article>						
									<button class="btn btn-success" onClick={(e) => this.handlerSubmit(e, 'mathjax')}>
										{!this.props.download ? 'Continuar' : 'Descargar Con MathJax'}
									</button>
								</article>
							</div>
						</div>
        	</section>
        )
    }
}