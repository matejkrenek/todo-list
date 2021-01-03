import { db, auth } from '../config-firebase'
import { UI } from './UI';

class Auth {
    static signupUser(username, email, password) {
        auth.createUserWithEmailAndPassword(email, password).then(cred => {
            db.collection('users').doc(cred.user.uid).set({ email, username })
        }).catch(err => UI.showToastError(err.message))
    }

    static loginUser(email, password) {
        auth.signInWithEmailAndPassword(email, password).then(cred => {
        }).catch(err => UI.showToastError(err.message));
    }

    static logoutUser() {
        auth.signOut()
    }

    static getUserID() {
        const user = auth.currentUser
        return user.uid
    }

}

export {
    Auth
}