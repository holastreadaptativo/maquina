import React, { Component } from 'react'
import { Link } from 'react-router'

export default class Header extends Component {
   render() {
        const { active, setActive } = this.props
        return(
            <header class="main-header">
                <div class="logo">A</div>
                <div class="title"><h5>Máquina de Ejercicios<span class="glyphicon glyphicon-education"/></h5></div>
                <nav>
                    <ul>
                        <Link to="/" onClick={() => setActive(0)}>
                            <li class={`${active == 0 ? 'active' : ''}`}><span class="glyphicon glyphicon-home"/><span class="hover">Buscador</span></li>
                        </Link>
                        <Link to="/variables" onClick={() => setActive(1)}>
                            <li class={`${active == 1 ? 'active' : ''}`}><span class="glyphicon glyphicon-th"/><span class="hover">Variables</span></li>
                        </Link>
                        <Link to="/ejercicios" onClick={() => setActive(2)}>
                            <li class={`${active == 2 ? 'active' : ''}`}><span class="glyphicon glyphicon-edit"/><span class="hover">Ejercicios</span></li>
                        </Link>
                        <Link to="/respuestas" onClick={() => setActive(3)}>
                            <li class={`${active == 3 ? 'active' : ''}`}><span class="glyphicon glyphicon-list-alt"/><span class="hover">Respuestas</span></li>
                        </Link>
                        <Link to="/versiones" onClick={() => setActive(4)}>
                            <li class={`${active == 4 ? 'active' : ''}`}><span class="glyphicon glyphicon-duplicate"/><span class="hover">Versiones</span></li>
                        </Link>
                        <Link to="/descargas" onClick={() => setActive(5)}>
                            <li class={`${active == 5 ? 'active' : ''}`}><span class="glyphicon glyphicon-download-alt"/><span class="hover">Descargas</span></li>
                        </Link>
                        <Link to="/configuracion" onClick={() => setActive(6)}>
                            <li class={`${active == 6 ? 'active' : ''}`}><span class="glyphicon glyphicon-cog"/><span class="hover">Configuración</span></li>
                        </Link>
                    </ul>
                </nav>
            </header>
        )
    }
} 