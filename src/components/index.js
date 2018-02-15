import React, { Component } from 'react'
import { auth, users, uid } from 'stores'
import { Header } from 'components'
import { DEFAULT } from 'stores'
import { data } from 'stores'

export class App extends Component {
  	constructor(props) {
		super(props)
		this.state = { fn:'', ln:'', code:DEFAULT, setCode:this.setCode.bind(this), active:0, setActive:this.setActive.bind(this), 
			variables:[], functions:[] 
		}
	}
	componentWillMount() {
		const { code } = this.state
		auth.onAuthStateChanged(() => {
			if (auth.currentUser) {
				users.child(uid()).once('value').then(user => {
					if (user.exists()) { this.setState({ fn:user.val().first_name, ln:user.val().last_name }) }	
	  			})
	  		}
		})
		data.child(code).once('value').then(r => {
			if (r.hasChild('variables'))
			data.child(`${code}/variables`).orderByChild('var').on('value', snap => {
				let variables = []
				snap.forEach(v => {
					variables.push({ id:v.key, var:v.val().var, type:v.val().type, val:v.val().val, vt:v.val().vt, res:v.val().res })
					this.setState({ variables:variables })
				})
			})
			if (r.hasChild('functions'))
			data.child(`${code}/functions`).orderByChild('position').on('value', snap => {
				let functions = []
				snap.forEach(f => {
					functions.push({ id:f.key, function:f.val().function, params:f.val().params, hub:f.val().hub, 
						width:f.val().width, position:f.val().position })
					this.setState({ functions:functions })
				})
			})
		})
	}
	componentWillUnmount() {
		const { code } = this.state
		data.child(`${code}/variables`).off()
		data.child(`${code}/functions`).off()
	}
	setCode(code) {
		this.setState({ code:code })
	}
    setActive(active) {
        this.setState({ active:active })
    }
	render() {
    	return (
      		<div class="react-app">
      			<Header {...this.state}/>

      			{ React.cloneElement( this.props.children, {...this.state} )}

      		</div>
    	)
  	}	
}

export * from './design'
export * from './global'
export * from './main'
export * from './tools'