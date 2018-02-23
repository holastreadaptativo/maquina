import React, { Component } from 'react'
import { Link } from 'react-router'
import { DEFAULT } from 'stores'
import { show } from 'actions'

export default class Alert extends Component {
    render() {
        const { active, alert, code, notification, setActive } = this.props
        return (        	
            <div class={show(!(active == 0 && code == DEFAULT) && active != 1 && notification, `notification ${alert}`)}>
                <div class="container">
                    <h5>{notification}
                        <b class={show(alert == 'danger')}> 
                            <span class="glyphicon glyphicon-arrow-right"/> 
                            <Link to="/variables" onClick={() => setActive(1)}>Resolver</Link>
                        </b>
                    </h5>
                    <i>{alert == 'danger' ? 'close' : alert == 'success' ? 'check' : 'priority_high'}</i>
                </div>
            </div>
        )
    }
}