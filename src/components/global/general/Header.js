import React, { Component } from 'react'
import { action, glyph, focus, signOut, show } from 'actions'
import { browserHistory, Link } from 'react-router'
import { DEFAULT, ROUTES } from 'stores'

export default class Header extends Component {
    constructor() {
        super()
        this.state = { ...DEFAULT.SEARCH, bar:false }
    }
    handleKeyPress(e) {
        if (e.charCode == 13) {  
            this.handleSubmit(e)
        }
    }
    handleSubmit(e) {
        e.preventDefault()
        let code = this.refs.search.value
        
        if (code.length == 15) {
            this.props.setCode(code)
            this.refs.search.value = ''
            this.setState({ bar:false })
        }                   

        this.setState({ code:code, selected:code != DEFAULT.CODE && code.length > 2 })
    }
    onChange(e) {
        let n = e.target.value, l = n.length, m = parseInt(n.substring(l - 1, l))

        if (!Number.isInteger(m)) 
            n = e.target.value = n.substring(0, l - 1)
        
        this.setState({ length:n.length, search:[], temp:n })

        if (n.length < 3)
            this.setState(DEFAULT.SEARCH)

        else 
            action.var('CODE', { code:'', target:n, update:(::this.setState) })
    }
    render() {
        const { active, setActive, code, setCode, option, setOption, connected, user } = this.props, { bar } = this.state  
        return(
            <header class="menu">
                <div class="container-fluid">
                    <div class="logo" onClick={() => { setActive(0); browserHistory.push('/') }}/>
                    <div class="title">
                        <h5>Adaptativamente
                            <span class={glyph('education')}/>
                            <b class="hidden">{ROUTES[active].title}</b>
                            <b class={show(active != 0)}>{code != DEFAULT.CODE ? `ID: ${code}` : 'MODO DE PRUEBA'}</b>
                        </h5>
                    </div>
                    <div class="router">
                        <h5>
                            <input ref="search" class={show(active != 0 && bar)} placeholder="Buscar por código..." onChange={::this.onChange} 
                                onKeyPress={::this.handleKeyPress} maxLength="15"></input>
                            <i class={show(active != 0)} onClick={() => this.setState({ bar:!bar })}>search</i>
                            <i class={show(active != 0 && !bar)} onClick={() => this.props.setState({ modal:true })}>dashboard</i>
                            {
                                ROUTES[active].nav.map((m, i) =>
                                    <i key={i} class={show(!bar)} onClick={() => setOption(option != i ? i : null)}>{m}</i>
                                )
                            }
                        </h5>
                    </div>
                </div>
                <div class="user">
                    {connected ? user.fn.charAt(0).concat(user.ln.charAt(0)) : <i>perm_identity</i>}
                    <ul>
                        <i class="nav">arrow_drop_up</i>
                        <li onClick={() => { setCode(DEFAULT.CODE) }}>Desarrollador</li>
                        <li><Link to="/config">Configuración</Link></li>
                        <li onClick={() => { setActive(0); signOut() }}>Cerrar Sesión</li>
                    </ul>
                </div>
                <Alert {...this.props}/>
            </header>
        )
    }
}

class Alert extends Component {
    render() {
        const { active, alert, notification, setActive } = this.props
        return (            
           <div>         
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
           </div>
        )
    }
}