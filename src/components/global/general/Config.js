import React, { Component } from 'react'
import { browserHistory } from 'react-router'
import { glyph, random, show, signUp } from 'actions'
import { users } from 'stores'

export default class Config extends Component {
	constructor() {
		super()
		this.state = { active:0, avatar:[], selected:random(0, 17), people:[] }
	}
	componentWillMount() {
		let avatar = []
		users.orderByChild('rol').on('value', snap => {
			let people = []
			snap.forEach(user => {
				if (user.val().email.includes('adaptativamente')) {
					people.push({ ...user.val() })
					this.setState({ people })
				}
			})
		})
		for (let i = 0; i < 3; i++) {
			for (let j = 0, k = 6 * i; j < 6; j++, k++) {
				avatar.push({backgroundPosition:`${-j*76 - 1}px ${-i*81 - 1}px`, visibility:`${k < 17 ? 'initial': 'hidden'}`})
				this.setState({ avatar })
			}
		}
	}
	handleRemove() {

	}
    render() {
    	const { active, avatar, people, selected } = this.state, { fn, ln, email, rol } = this.props.user
        return (        	
            <section class="config">
            	<center>
            		<main class={show(active == 0, 'content')}>
            			<form class="signin config">
	            			<h2>Configuración</h2>
	            			<label>Nombre</label>
	            			<input class="form-control" defaultValue={fn.concat(' ', ln)} type="text" disabled></input>
	            			<label>Correo electrónico</label>
	            			<input class="form-control" defaultValue={email} type="email" disabled></input>
	            		</form>
	            		<h5>Selecciona tu avatar</h5>
	            		{
	            			avatar.map((m, i) =>
	            				<o key={i}>
		            				<div class={`avatar ${i != selected ? '' : 'selected'}`} style={m} onClick={() => this.setState({ selected:i })}/>
		            				{ i % 6 == 5 && <br/> }
	            				</o>
	            			)
	            		}
	            		<form class="signin config">
	            			<label>Cambiar Contraseña</label>
	            			<input class="form-control" type="password"></input>
	            			<button class="form-control" type="submit" onClick={e => e.preventDefault()}>Guardar</button>
	            		</form>
	            	</main>
	            	<main class={show(active == 1, 'content')}>
	            		<form class="signin config">
	            			<h2>Nuevo Usuario</h2>
	            			<label>Nombre</label>
	            			<input id="signup-fn" class="form-control" type="text"></input>
	            			<label>Apellido</label>
	            			<input id="signup-ln" class="form-control" type="text"></input>
	            			<label>Correo electrónico</label>
	            			<input id="signup-email" class="form-control" type="email"></input>
	            			<label>Contraseña</label>
	            			<input id="signup-pass" class="form-control" type="password"></input>
	            			<button class="form-control" type="submit" onClick={signUp}>Registrar</button>
	            			<h6>© {(new Date()).getFullYear()} Adaptativamente</h6>
	            		</form>
	            	</main>
	            	<main class={show(active == 2, 'content')}>
	            		<form class="signin config">
	            			<h2>Permisos</h2>
	            		</form>
	            		<table class="admin">
	            			<thead>
	            				<tr>
	            					<th>#</th>
	            					<th>Nombre</th>
	            					<th>Correo</th>
	            					<th>Rol</th>
	            					<th></th>
	            				</tr>
	            			</thead>
	            			<tbody>
	            			{
	            				people.map((m, i) => 
	            					<tr key={i}>
	            						<td><h6>{i+1}</h6></td>
	            						<td>{m.fn} {m.ln}</td>
	            						<td>{m.email}</td>
	            						<td>
	            							<select defaultValue={m.rol} disabled>
	            								<option value="admin">Administrador</option>
	            								<option value="dev">Desarrollador</option>
	            								<option value="editor">Editor</option>
	            							</select>
	            						</td>
	            						<td>
	            							<h6><button class={glyph('remove')} onClick={() => this.handleRemove(m)} title="Eliminar" disabled/></h6>
	            						</td>
	            					</tr>
	            				)
	            			}
	            			</tbody>
	            		</table>
	            	</main>
            		<div class="nav">
	                    <span class={glyph('option-vertical config')}/>
	                    <ul>
	                        <i class="nav">arrow_drop_up</i>
	                        <li onClick={() => this.setState({ active:0 })}>Perfil</li>
	                        <li onClick={() => this.setState({ active:1 })} class={show(rol != 'editor')}>Registro</li>
	                        <li onClick={() => this.setState({ active:2 })}>Permisos</li>
	                        <li onClick={browserHistory.goBack}>Volver</li>
	                    </ul>
	                </div>
            	</center>
	            <div class="react-bg"/>
            </section>
        )
    }
}

/*
import SplitPane from 'react-split-pane'

export class Config2 extends Component {
    render() {
        let min = 20, max = window.innerWidth - min - 240
        return(
        	<div class="config">
        		<div class="slider-control-container">
					<div class="container">
						<h3>Configuración</h3>
						<SplitPane defaultSize="50%" minSize={min} maxSize={max} split="vertical" class="resizable">
				            <div class="static-background"/>
				            <div class="dynamic-background"/>
				        </SplitPane>
					</div>
        		</div>
        	</div>
        )
    }
}
*/