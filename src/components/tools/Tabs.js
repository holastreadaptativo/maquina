import React, { Component } from 'react'

export default class Tabs extends Component {
	render() {
		const { active, items, setActive } = this.props
		return (
			<ul class="modal-tabs">
			{
				items.map((m, i) => { return (
					<li key={i} class={`${active == i ? 'active' : ''}`} style={{ width:`${100/items.length}%` }} onClick={setActive(i)}>
						<a><i>{m}</i></a>
					</li>
				)})
			}
			</ul>
		)
	}
}