import React, { Component } from 'react'
import { ROUTES, DEFAULT } from 'stores'
import { glyph, focus, show } from 'actions'
import { Link } from 'react-router'

export default class Header extends Component {
    constructor() {
        super()
        this.state = { search:false }
    }
    render() {
        const { active, setActive, code, option, setOption } = this.props, { search } = this.state   
        return(
            <header class="menu">
                <div class="container-fluid">
                    <div class="logo"></div>
                    <div class="title">
                        <h5>Adaptativamente
                            <span class={glyph('education')}/>
                            <b class="hidden">{ROUTES[active].title}</b>
                            <b>{code != DEFAULT.CODE ? `ID: ${code}` : 'MODO DE PRUEBA'}</b>
                        </h5>
                    </div>
                    <div class="router">
                        <h5>
                            <input class={show(search)} placeholder="Buscar por código..."></input>
                            <i class={show(active != 0)} onClick={() => this.setState({ search:!search })}>search</i>
                            <i class={show(active != 0 && !search)} onClick={() => this.props.setState({ modal:true })}>dashboard</i>
                            {
                                ROUTES[active].nav.map((m, i) =>
                                    <i key={i} class={show(!search)} onClick={() => setOption(option != i ? i : null)}>{m}</i>
                                )
                            }
                        </h5>
                    </div>
                </div>
                <div class="user">
                    MT
                </div>
                <div class="react-line"/>
                <nav class="hidden">
                    <ul>
                    {
                        ROUTES.map((m, i) => 
                            <Link key={i} to={m.path} onClick={() => setActive(i)}>
                                <li class={focus(active == i, 'active')}>
                                    <span class={glyph(m.icon)}/>
                                    <span class="hover">{m.text}</span>
                                </li>
                            </Link>
                        )
                    }
                    </ul>
                </nav>
                <Alert {...this.props}/>
            </header>
        )
    }
}

class Alert extends Component {
    render() {
        const { active, alert, notification, setActive } = this.props
        return (            
            <div class={show(active > 1 && notification, `notification ${alert}`)}>
                <div class="container">
                    <h5>{notification}
                        <b class={show(alert == 'danger')}> 
                            <span class={glyph('arrow-right')}/> 
                            <Link to="/ejercicios" onClick={() => setActive(1)}>Resolver</Link>
                        </b>
                    </h5>
                    <i>{alert == 'danger' ? 'close' : alert == 'success' ? 'check' : 'priority_high'}</i>
                </div>
            </div>
        )
    }
}