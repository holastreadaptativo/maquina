import React, { Component } from 'react'
import { browserHistory } from 'react-router'
import { data, DEFAULT } from 'stores'
import $, { focus } from 'actions'

export default class Search extends Component {
	onChange(e) {
		let n = e.target.value, l = n.length, 
			m = parseInt(n.substring(l - 1, l))

		if (!Number.isInteger(m)) 
			n = e.target.value = n.substring(0, l - 1)
		
		this.props.setState({ length:n.length, temp:n })

		if (n.length == 0) {
			this.props.setState({ code:DEFAULT.CODE, selected:false, search:[] })
			this.props.setCode(DEFAULT.CODE)
		}
		else if (n.length > 2) {
			let search = []
			data.once('value').then(snap => {
				snap.forEach(c => {
					if (c.key.toString().includes(n)) {
						let t = 0, l = 0, v = 0
						if (c.hasChild('versions')) {
							let m = c.val().versions; v = m.selected; t = m.total; l = m.limit
						}
						search.push({ id:c.key, total:t, limit:l, versions:v })
						this.props.setState({ search:search })
					}
				})
			})
		}
		else
			this.props.setState({ selected:false })
	}
	handleSubmit(e) {
		e.preventDefault()
		let code = $('search-code').value
		
		if (code.length == 15) {
			this.props.setActive(1)
			browserHistory.push('/variables')
			this.props.setNotification(null, this.props.alert)
			this.props.setCode(code)
		}					

		this.props.setState({ code:code, selected:code != DEFAULT.CODE && code.length > 2 })
	}
	handleKeyPress(e) {
		if (e.charCode == 13)
			this.handleSubmit(e)
	}
	render() {
		const { selected, length, temp } = this.props
		let items = ['Nivel', 'Eje', 'OA', 'IE', 'Tipo', 'Ejercicio']
		return (
			<div>
				<h3 class={focus(selected, 'selected')}>Buscar por código</h3>
				<div class="input-group" onKeyPress={::this.handleKeyPress}>
					<span class="input-group-addon"><span class="glyphicon glyphicon-search"/></span>
					<input id="search-code" type="text" class="form-control" placeholder="15 caracteres" 
						onChange={::this.onChange} maxLength="15"></input>
					<span class="input-group-btn">
						<button class="btn btn-default" onClick={::this.handleSubmit}>Buscar</button>
					</span>
				</div>
				<div class="color-line"/>
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