import React, { Component } from 'react'
import { browserHistory } from 'react-router'
import $, { random, focus } from 'actions'
import { DEFAULT } from 'stores'

export default class Input extends Component {
	checkCode(e) {
		let n = e.target.value, l = n.length, 
			m = parseInt(n.substring(l - 1, l))

		if (!Number.isInteger(m)) 
			n = e.target.value = n.substring(0, l - 1)
		
		this.props.setState({ length:n.length, temp:n })

		if (n.length == 0) {
			this.props.setState({ code:DEFAULT, selected:false })
			this.props.setCode(DEFAULT)
		}
	}
	handleSubmit(e) {
		e.preventDefault()
		let code = $('search-code').value, search = []
		
		if (code.length == 15) {
			this.props.setActive(1)
			browserHistory.push('/variables')
		}
		else 
			for (let i = 0; i < random(0, 20) + 1; i++)
				search.push({ id:i + 1 })

		this.props.setState({ code:code, search:search, selected:code != DEFAULT && code.length > 2 })
		this.props.setCode(code)
	}
	render() {
		const { selected, length, temp } = this.props
		let items = ['Nivel', 'Eje', 'OA', 'IE', 'Tipo', 'Ejercicio']
		return (
			<div>
				<h3 class={focus(selected, 'selected')}>Buscar por código</h3>
				<div class="input-group">
					<span class="input-group-addon"><span class="glyphicon glyphicon-search"/></span>
					<input id="search-code" type="text" class="form-control" placeholder="15 caracteres" 
						onChange={this.checkCode.bind(this)} maxLength="15"></input>
					<span class="input-group-btn">
						<button class="btn btn-default" onClick={this.handleSubmit.bind(this)}>Buscar</button>
					</span>
				</div>
				<div>
					<h6 class="search-count">{length}/15 
						{length == 15 ? <span class="glyphicon glyphicon-ok"/> : ''}
					</h6>
					<div class="row">
					{
						items.map((m, i) => { let x = i < 5 ? 2 : 5; return (
							<h6 key={i}>{m}: {length >= 2*i + x ? temp.substring(2*i, 2*i + x) : '-' }</h6>
						)})
					}
					</div>
				</div>
			</div>
		)
	}
}