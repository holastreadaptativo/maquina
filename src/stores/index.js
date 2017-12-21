import * as db from 'firebase'

let config = {
    apiKey: 'AIzaSyAGlyYXF_gp4UsyXM_6yT5hnaZpm1YbUU8',
    authDomain: 'maquina-d0d32.firebaseapp.com',
    databaseURL: 'https://maquina-d0d32.firebaseio.com',
    projectId: 'maquina-d0d32',
    storageBucket: 'maquina-d0d32.appspot.com',
    messagingSenderId: '245000417064'
 }

const firebase = db.initializeApp(config)
const firebase2 = db.initializeApp(config, 'Secondary')

export const database = firebase.database()
export const storage = firebase.storage()
export const auth = firebase.auth()
export const auth2 = firebase2.auth()

export const users = database.ref('users')
export const data = database.ref('data')
export const images = storage.ref('images')

export function uid() { return auth.currentUser.uid }