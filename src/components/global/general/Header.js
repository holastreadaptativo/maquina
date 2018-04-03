import React, { Component } from 'react'
import { ROUTES, DEFAULT } from 'stores'
import { glyph, focus, show } from 'actions'
import { Link } from 'react-router'

export default class Header extends Component {
   render() {
        const { active, setActive, code, option, setOption } = this.props     
        return(
            <header class="menu">
                <div class="container-fluid">
                    <div class="logo"></div>
                    <div class="title">
                        <h5>Adaptativamente
                            <span class={glyph('education')}/>
                            <b>{ROUTES[active].title}</b>
                        </h5>
                    </div>
                    <div class="code">
                        <h5>
                        {
                            ROUTES[active].nav.map((m, i) =>
                                <i key={i} onClick={() => setOption(option != i ? i : null)}>{m}</i>
                            )
                        }
                        </h5>
                        <h5 class="hidden">{code != DEFAULT.CODE ? `ID: ${code}` : 'MODO DE PRUEBA'}</h5>
                    </div>
                </div>
                <div class="color-line"/>
                <nav>
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
                            <Link to="/variables" onClick={() => setActive(1)}>Resolver</Link>
                        </b>
                    </h5>
                    <i>{alert == 'danger' ? 'close' : alert == 'success' ? 'check' : 'priority_high'}</i>
                </div>
            </div>
        )
    }
}