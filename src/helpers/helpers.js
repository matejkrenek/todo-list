import { loginPage } from "../modules/loginPage"
import { signupPage } from "../modules/signupPage"
import { dashboardPage } from "../modules/dashboardPage"

class Pages {
    loginPage() {
        return loginPage()
    }

    signupPage() {
        return signupPage()
    }

    dashboardPage() {
        return dashboardPage()
    }
}

let userLoggedIn = true

const rewriteDOM = (dest = userLoggedIn === false ? loginPage : dashboardPage) => {
    document.body.append(dest())

    const links = document.querySelectorAll('.redirect')
    getRedirectLinks(links)
}

const getRedirectLinks = (links) => {
    links.forEach(link => {
        link.addEventListener('click', () => {
            const page = new Pages()[`${link.dataset.ref}`]
            rewriteDOM(page)
            
        })
    })
}

export {
    rewriteDOM
}
