import { db, auth } from '../config-firebase'

class User {
    getUserProjects(user) {
        db.collection('users').doc(user.uid).onSnapshot(snapshot => {
            return () => 'pes'
        })
    }
}

export {
    User
}