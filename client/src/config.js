import firebase from 'firebase'

export const appName = 'animals-bbfac'
export const fireBaseConfig = {
	apiKey: "AIzaSyCZ2ZqfT4GM3eDVqoBiVHhQIWyFFSKBy0Y",
    authDomain: `${ appName }.firebaseapp.com`,
    databaseURL: `https://${ appName }.firebaseio.com`,
    projectId: `${ appName }`,
    storageBucket: `${ appName }.appspot.com`,
    messagingSenderId: "499559863665"
}

firebase.initializeApp(fireBaseConfig)