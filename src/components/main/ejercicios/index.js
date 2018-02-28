import React, { Component } from 'react'
import { Continue } from 'components'
import { data } from 'stores'

export class Ejercicios extends Component {
    componentDidMount() {
		data.child(this.props.code).once('value').then(snap => {
			if (!snap.hasChild('count')) {
				data.child(this.props.code).update({ count:0 })
			}
		})		
	}	
	render() {
		const { code, option, variables, functions } = this.props
		return(
        	<div class="ejercicios">
        		<div class="container">
					<Design code={code} variables={variables} functions={functions}/>
					<Overview code={code} variables={variables} functions={functions} condition={option == 0}/>
					<Functions code={code} variables={variables} condition={option == 1}/>
					<Continue {...this.props} condition={this.props.functions.length}/>
        		</div>
        	</div>
        )
    }
}

import Design from './2_Design'
import Functions from './2_Functions'
import Overview from './2_Overview'
export Modal from './2_Modal'