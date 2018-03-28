import React, { Component } from 'react'
import { browserHistory } from 'react-router'
import { action, focus, temp } from 'actions'
import { data, DEFAULT } from 'stores'
import { Header } from 'components'

export class App extends Component {
  	constructor() {
		super()
		this.state = { active:0, setActive:(::this.setActive), option:null, setOption:(::this.setOption), code:DEFAULT.CODE, setCode:(::this.setCode), 
			alert:'danger', notification:null, setNotification:(::this.setNotification), variables:[], functions:[], answers: [], versions:[], feedback:[]	
		}
	}
	componentWillMount() {
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
		browserHistory.push('/variables')
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

			if (r.hasChild('versions')) { temp.ver('READ', state) }
			else { this.setState({ versions:[] }) }
		})
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