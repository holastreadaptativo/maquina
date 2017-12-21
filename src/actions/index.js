import { render } from 'react-dom'
import { browserHistory } from 'react-router'
import { auth, auth2, uid, users } from 'stores'

export default function $(id) { return document.getElementById(id) }

export function print(component, id) { render(component, $(id)) }

export function display(show) { return { display:show ? 'initial' : 'none' } }

export function errorAlert(e) { if (e) alert(e.message) }

export function check(input, name) {
	if (input.length < 4) { alert(`Por favor ingrese su ${name}.`) } return input.length >= 4
}

export function money(amount) {
    return '$' + parseInt(amount).toFixed(0).replace(/./g, (c, i, a) => {
        return i > 0 && c !== ',' && (a.length - i) % 3 === 0 ? '.' + c : c
    })
}

export function dateReverse(date) {
	let reverse = date.split('-')
	return reverse[2] + '-' + reverse[1] + '-' + reverse[0]
}

export function signIn(e) { e.preventDefault(); auth.signOut()    
  let email = $('signin-email').value, pass = $('signin-pass').value
    if (email.length < 4) { alert('Por favor ingrese su email.'); return }
    else if (pass.length < 4) { alert('Por favor ingrese su contraseña.'); return }

    auth.signInWithEmailAndPassword(email, pass).then(() => { 
        users.child(uid()).once('value').then(() => { browserHistory.push('/') })
    }).catch(err => {
        if (err.code === 'auth/wrong-password') { alert('Contraseña incorrecta.') }
        else {  alert(err.message) }
    })
}
export function signUp() {   
    let email = $('rest_email').value, pass = $('password').value
    return auth2.createUserWithEmailAndPassword(email, pass)
}

export function sendPasswordReset(e) { e.preventDefault()   
  let email = $('forgot-email').value
  auth.sendPasswordResetEmail(email).then(() => { alert('Se ha enviado un mail para restablecer tu contraseña!') })
    .catch(err => {
        if (err.code == 'auth/invalid-email' || err.code == 'auth/user-not-found') { alert(err.message) }
    })
}
export function sendEmailVerification() {
    auth.currentUser.sendEmailVerification().then(() => {
        alert('Se ha enviado un mail para verificar su identidad')
    })
}
export function signOut() {
    if (auth.currentUser) auth.signOut(); browserHistory.push('/')
}

export * from './variables'