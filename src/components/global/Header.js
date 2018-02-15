import React, { Component } from 'react'
import { Link } from 'react-router'
import { focus } from 'actions'

export default class Header extends Component {
   render() {
        const { active, setActive, code } = this.props
        let items = [ 
            { path:'/', icon:'home', text:'Buscador' }, 
            { path:'/variables', icon:'th', text:'Variables' }, 
            { path:'/ejercicios', icon:'edit', text:'Ejercicios' }, 
            { path:'/respuestas', icon:'list-alt', text:'Respuestas' }, 
            { path:'/versiones', icon:'duplicate', text:'Versiones' }, 
            { path:'/descargas', icon:'download-alt', text:'Descargas' },
            { path:'/configuracion', icon:'cog', text:'Configuración' }
        ]
        return(
            <header class="main-header">
                <div class="logo">A</div>
                <div class="title">
                    <h5>Máquina de Ejercicios
                        <span class="glyphicon glyphicon-education"/>
                    </h5>
                </div>
                <div class="code">
                    <h5>ID: {code}</h5>
                </div>
                <nav>
                    <ul>
                    {
                        items.map((m, i) => { return (
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