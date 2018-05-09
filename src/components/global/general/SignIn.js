import React, { Component } from 'react'
import { signIn } from 'actions'

export default class SignIn extends Component {
   	render() {
        return (        	
            <section class="login">	
            	<center>
	            	<form class="signin">
	            		<h2>Inicia Sesión</h2>
	            		<div>
	            			<label>Correo electrónico</label>
	            			<input id="signin-email" class="form-control" type="email"></input>
	            		</div>
	            		<div>
	            			<label>Contraseña</label>
	            			<input id="signin-pass" class="form-control" type="password"></input>
	            		</div>
	            		<div>
	            			<button class="form-control" type="submit" onClick={signIn}>Iniciar Sesión</button>
	            		</div>
	            		<h6>© {(new Date()).getFullYear()} Adaptativamente</h6>
	            	</form>
				</center>
				<div class="react-bg"/>
            </section>
        )
    }
}