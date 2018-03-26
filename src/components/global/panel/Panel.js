import React, { Component } from 'react'

export default class Panel extends Component {
	render() {
		return (
			<section class="col-xs-9 panel">
				<div class={this.props.container}>
					{this.props.children}
				</div>
			</section>
		)
	}
}