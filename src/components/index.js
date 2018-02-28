import React, { Component } from 'react'
import { auth, users, uid, data, DEFAULT } from 'stores'
import { Header } from 'components'
import { focus } from 'actions'

export class App extends Component {
  	constructor() {
		super()
		this.state = { active:0, setActive:(::this.setActive), option:null, setOption:(::this.setOption), code:DEFAULT, setCode:(::this.setCode), 
			alert:'danger', notification:null, setNotification:(::this.setNotification), variables:[], functions:[]			
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
		this.onCodeChange(code)
	}
	componentWillUnmount() {
		data.child(this.state.code).off()
	}
    onCodeChange(code) {
    	data.child(code).on('value', r => {
			if (r.hasChild('variables'))
				data.child(`${code}/variables`).orderByChild('var').once('value').then(snap => {
					let variables = []
					snap.forEach(v => {
						variables.push({ id:v.key, var:v.val().var, type:v.val().type, val:v.val().val, vt:v.val().vt, res:v.val().res })
						this.setState({ variables:variables })
					})
				})
			else 
				this.setState({ variables:[] })
			if (r.hasChild('functions'))
				data.child(`${code}/functions`).orderByChild('position').once('value').then(snap => {
					let functions = []
					snap.forEach(f => {
						if (f.hasChild('function') && f.hasChild('params') && f.hasChild('tag') && f.hasChild('position'))
						functions.push({ id:f.key, function:f.val().function, params:f.val().params, tag:f.val().tag, 
							width:f.val().width, position:f.val().position })
						this.setState({ functions:functions })
					})
				})
			else 
				this.setState({ functions:[] })
		})
    }
    setActive(active) {
    	this.setState({ active:active, option:null })
    }
	setCode(code) {
		data.child(this.state.code).off()
		this.onCodeChange(code)
		this.setState({ code:code })
	}
	setNotification(message, alert) {
		this.setState({ notification:message, alert:alert })
	}
	setOption(option) {
		this.setState({ option:option })
	}
	render() {  
        return (
      		<div class={`react-app ${focus(this.state.option != null, 'slim')}`}>
      			<Header {...this.state}/>
      			{ 
      				React.cloneElement( this.props.children, {...this.state} )
      			}
      		</div>
    	)
  	}	
}

export * from './design'
export * from './global'
export * from './main'
export * from './tools'