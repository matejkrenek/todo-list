import { db, auth } from './config-firebase'
import { signupPage } from "./modules/signupPage"
import { dashboardPage } from "./modules/dashboardPage"
import { loginPage } from './modules/loginPage';
import { UI } from './constructors/UI'


auth.onAuthStateChanged(user => {
    console.log(user)
    if(user){
        UI.rewriteDOM(dashboardPage)
        UI.displayUserCreds(user)
        UI.displayUserTodaysTasks(user)
        UI.displayProjects()
    } else{
        UI.rewriteDOM(loginPage)
    }
});





