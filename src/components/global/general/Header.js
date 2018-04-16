import React, { Component } from 'react'
import { glyph, focus, signOut, show } from 'actions'
import { DEFAULT, ROUTES } from 'stores'
import { Link } from 'react-router'

export default class Header extends Component {
    constructor() {
        super()
        this.state = { search:false }
    }
    handleKeyPress(e) {
        if (e.charCode == 13)
            this.setState({ search:false })
    }
    render() {
        const { active, setActive, code, setCode, option, setOption, connected, fn, ln } = this.props, { search } = this.state   
        return(
            <header class="menu">
                <div class="container-fluid">
                    <div class="logo"></div>
                    <div class="title">
                        <h5>Adaptativamente
                            <span class={glyph('education')}/>
                            <b class="hidden">{ROUTES[active].title}</b>
                            <b class={show(active != 0)}>{code != DEFAULT.CODE ? `ID: ${code}` : 'MODO DE PRUEBA'}</b>
                        </h5>
                    </div>
                    <div class="router">
                        <h5>
                            <input class={show(active != 0 && search)} placeholder="Buscar por código..." onKeyPress={::this.handleKeyPress} maxLength="15"></input>
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
                    {connected ? fn.charAt(0) + ln.charAt(0) : <i>perm_identity</i>}
                    <ul>
                        <i class="nav">arrow_drop_up</i>
                        <li onClick={() => { setCode(DEFAULT.CODE) }}>Desarrollador</li>
                        <li>Configuración</li>
                        <li onClick={() => { setActive(0); signOut() }}>Cerrar Sesión</li>
                    </ul>
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