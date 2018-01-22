import React, { Component } from 'react'

export default class Tabs extends Component {
	render() {
		const { active, items, setActive } = this.props
		let count = 0
		return (
			<ul class="modal-tabs">
			{
				items.map(m => { return (
					<li key={count} class={`${active == count ? 'active' : ''}`} style={{ width:`${100/items.length}%` }} onClick={setActive(count++)}>
						<a><i>{m}</i></a>
					</li>
				)})
			}
			</ul>
		)
	}
}