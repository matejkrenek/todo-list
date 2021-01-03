import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyC63F1zX2DiieYj2WGXdnddfL4GTHknJCg",
    authDomain: "i-m-done.firebaseapp.com",
    projectId: "i-m-done",
    appId: "1:1073038908131:web:3973ec4e4b5b57cb4903d6"
};

firebase.initializeApp(firebaseConfig);

const auth = firebase.auth()
const db = firebase.firestore()

db.settings({ timestampsInSnapshots: true });

export { auth, db }