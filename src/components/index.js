import React, { Component } from 'react'
import { auth, users, uid } from 'stores'
import { Header } from 'components'

export class App extends Component {
  	constructor(props) {
		super(props)
		this.state = { fn:'', ln:'', code:DEFAULT, setCode:this.setCode.bind(this), active:0, setActive:this.setActive.bind(this) }
	}
	componentWillMount() {
		auth.onAuthStateChanged(() => {
			if (auth.currentUser) {
				users.child(uid()).once('value').then(user => {
					if (user.exists()) { this.setState({ fn:user.val().first_name, ln:user.val().last_name }) }	
	  			})
	  		}
		})
	}
	setCode(code) {
		this.setState({ code:code })
	}
    setActive(active) {
        this.setState({ active:active })
    }
	render() {
    	return (
      		<div class="react-app"><Header {...this.state}/>{ React.cloneElement( this.props.children, {...this.state} )}</div>
    	)
  	}	
}

export * from './main'
export * from './global'
export const DEFAULT = '000000000000000'