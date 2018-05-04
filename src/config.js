import firebase from 'firebase'

export const appName = 'animals-bbfac'
export const fireBaseConfig = {
	apiKey: "AIzaSyCZ2ZqfT4GM3eDVqoBiVHhQIWyFFSKBy0Y",
    authDomain: "animals-bbfac.firebaseapp.com",
    databaseURL: "https://animals-bbfac.firebaseio.com",
    projectId: "animals-bbfac",
    storageBucket: "animals-bbfac.appspot.com",
    messagingSenderId: "499559863665"
}

firebase.initializeApp(fireBaseConfig)