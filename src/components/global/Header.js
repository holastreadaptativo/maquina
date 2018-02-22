import React, { Component } from 'react'
import { DEFAULT, NAVBAR } from 'stores'
import { focus, show } from 'actions'
import { Link } from 'react-router'

export default class Header extends Component {
   render() {
        const { active, alert, code, notification, setActive } = this.props     
        return(
            <header class="main-header">
                <div class="container-fluid">
                    <div class="logo">A</div>
                    <div class="title">
                        <h5>Máquina de Ejercicios
                            <span class="glyphicon glyphicon-education"/>
                        </h5>
                    </div>
                    <div class="code">
                        <h5>ID: {code}</h5>
                    </div>
                </div>
                <div class={show(!(active == 0 && code == DEFAULT) && notification, `notification ${alert}`)}>
                    <div class="container">
                        <h5>{notification}</h5>
                        <span class="glyphicon glyphicon-remove"/>
                    </div>
                </div>
                <nav>
                    <ul>
                    {
                        NAVBAR.map((m, i) => { return (
                            <Link key={i} to={m.path} onClick={() => setActive(i)}>
                                <li class={focus(active == i, 'active')}>
                                    <span class={`glyphicon glyphicon-${m.icon}`}/>
                                    <span class="hover">{m.text}</span>
                                </li>
                            </Link>
                        )})
                    }
                    </ul>
                </nav>
            </header>
        )
    }
} 