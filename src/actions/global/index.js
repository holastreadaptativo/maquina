import { auth, dbs, uid, users } from 'stores'
import { browserHistory } from 'react-router'
import $ from 'actions'

export function signIn(e) { e.preventDefault(); auth.signOut()    
    let email = $('signin-email').value, pass = $('signin-pass').value
    if (!check(email, 'email') || !check(pass, 'contraseña')) return

    auth.signInWithEmailAndPassword(email, pass).then(() => { 
        users.child(uid()).once('value').then(() => { browserHistory.push('/') })
    }).catch(err => {
        if (err.code === 'auth/wrong-password') { alert('Contraseña incorrecta.') }
        else {  alert(err.message) }
    })
}
export function signUp() {   
    let email = $('rest_email').value, pass = $('password').value
    return dbs.createUserWithEmailAndPassword(email, pass)
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
    if (auth.currentUser) auth.signOut(); browserHistory.push('/signin')
}
export function check(input, name) {
    if (input.length < 4) { alert(`Por favor ingrese su ${name}.`) } return input.length >= 4
}

// auth.onAuthStateChanged(() => {
//     if (auth.currentUser) {
//         users.child(uid()).once('value').then(user => {
//             if (user.exists()) { this.setState({ fn:user.val().first_name, ln:user.val().last_name }) } 
//         })
//     }
// })