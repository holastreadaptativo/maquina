import React, { Component } from 'react'
import { auth, data, uid, users, DEFAULT } from 'stores'
import { browserHistory } from 'react-router'
import { action, focus, show } from 'actions'
import { Header } from 'components'

export class App extends Component {
  	constructor() {
		super()
		this.state = { connected:false, modal:false, variables:[], functions:[], answers: [], versions:[], feedback:[], 
			active:0, setActive:(::this.setActive), option:null, setOption:(::this.setOption), code:'0', setCode:(::this.setCode),
			alert:'danger', notification:null, setNotification:(::this.setNotification)	
		}
	}
	componentWillMount() {
		auth.onAuthStateChanged(() => {
			if (auth.currentUser) {
				browserHistory.push('/')
				users.child(uid()).once('value').then(user => {
					if (user.exists()) {
						this.setState({ connected:true, user:user.val() })
	  				}
	  			})
	  		}
			else { this.setState({ connected:false }); browserHistory.push('/signin') }
		})
		this.onCodeChanged(this.state.code)
	}
	componentWillUnmount() {
		data.child(this.state.code).off()
	}
    setActive(active) {
    	this.setState({ active:active, option:null })
    }
	setCode(code) {
		data.child(this.state.code).off()
		this.onCodeChanged(code)
		this.setState({ code:code, active:1 })
		browserHistory.push('/design')
	}
	setNotification(message, alert) {
		this.setState({ notification:message, alert:alert })
	}
	setOption(option) {
		this.setState({ option:option })
	}
    onCodeChanged(code) {
    	data.child(code).on('value', r => {
    		let state = { code:code, update:(::this.setState) }

			if (r.hasChild('variables')) { action.var('READ', state) }
			else { this.setState({ variables:[] }) }	

			DEFAULT.FNS.forEach(m => {
				if (r.hasChild(m)) { action.exe('READ', { ...state, path:m }) }
				else { this.setState({ [m]:[] }) }
			})

			if (r.hasChild('versions')) { action.ver('READ', state) }
			else { this.setState({ versions:[] }) }
		})
		if (code != '0')
			DEFAULT.FNS.forEach(path => action.exe('CHECK', { code, path }))
    }
	render() { 
        return (
      		<div class={`react-app ${focus(this.state.option != null, 'slim')}`}>
      			<Header {...this.props} {...this.state} setState={::this.setState}/>
      			{  
      				React.cloneElement( this.props.children, { ...this.state, setState:(::this.setState) } ) 
      			}
      			<div class={show(this.state.active, 'react-main')}/>
      		</div>
    	)
  	}
}

export * from './design'
export * from './editor'
export * from './global'
export * from './main'