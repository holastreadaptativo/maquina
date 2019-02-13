import React, { Component } from 'react'
import { browserHistory } from 'react-router'
import { ROUTES } from 'stores'
import { show } from 'actions'

export default class Section extends Component {
    handlerSubmit(e, esProduccion) {
			e.preventDefault()
			console.log(esProduccion);
			if (!this.props.download) {
				let i = this.props.active + 1; this.props.setActive(i)
				browserHistory.push(ROUTES[i].path)
			} else {
				this.props.download(esProduccion)
			}
		}
	render() {
		return (
        	<section class={this.props.style}>
        		<div class="container-fluid">
        			{this.props.children}
        			<div class={show(this.props.condition, 'row')}>
								<article>						
									<button class="btn btn-success" onClick={(e) => this.handlerSubmit(e, false)}>
										{!this.props.download ? 'Continuar' : 'Descargar Desarrollo'}
									</button>
								</article>
								<article>						
									<button class="btn btn-success" onClick={(e) => this.handlerSubmit(e, true)}>
										{!this.props.download ? 'Continuar' : 'Descargar Produccion'}
									</button>
								</article>
							</div>
						</div>
        	</section>
        )
    }
}