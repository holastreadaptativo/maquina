import React, { Component } from 'react'
import { Link } from 'react-router'

export default class Header extends Component {
    constructor(props) {
        super(props); this.state = { active:0 }
    }
    setActive(index) {
        this.setState({ active:index })
    }
    render() {
        const { active } = this.state
        return(
            <header class="main-header">
                <div class="logo">A</div>
                <div class="title"><h5>Máquina de Ejercicios</h5></div>
                <nav>
                    <ul>
                        <Link to="/" onClick={this.setActive.bind(this, 0)}>
                            <li class={`${active == 0 ? 'active' : ''}`}><span class="glyphicon glyphicon-home"/></li>
                        </Link>
                        <Link to={`/variables/${this.props.code}`} onClick={this.setActive.bind(this, 1)}>
                            <li class={`${active == 1 ? 'active' : ''}`}><span class="glyphicon glyphicon-cog"/></li>
                        </Link>
                    </ul>
                </nav>
            </header>
        )
    }
} 