import * as db from 'firebase'

const config = {
    apiKey: 'AIzaSyAGlyYXF_gp4UsyXM_6yT5hnaZpm1YbUU8',
    authDomain: 'maquina-d0d32.firebaseapp.com',
    databaseURL: 'https://maquina-d0d32.firebaseio.com',
    projectId: 'maquina-d0d32',
    storageBucket: 'maquina-d0d32.appspot.com',
    messagingSenderId: '245000417064'
}

const firebase = db.initializeApp(config)

export const database = firebase.database()
export const storage = firebase.storage()
export const auth = firebase.auth()

export const users = database.ref('users')
export const data = database.ref('data')
export const files = database.ref('files')
export const images = storage.ref('images')
export const src = storage.ref('src')

// retorna el UserID uid del usuario que está activo
export function uid() { return auth.currentUser.uid }
// nueva instancia de base de datos para la creación de nuevos usuarios
export const dbs = db.initializeApp(config, 'secondary').auth()

export * from './const'