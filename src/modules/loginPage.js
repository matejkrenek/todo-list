const loginPage = () => {
    const contentContainer = document.getElementById('content')
    contentContainer.innerHTML = ''
    const loginSection = document.createElement('section')
    loginSection.classList.add('authPage')
    loginSection.id = 'login'
    loginSection.innerHTML = `
        <img class="logo__big" src="./assets/logo.svg" alt="Company Logo">
        <h1>Login to your Account</h1>
        <form class="authForm">
            <div class="inputField">
                <input type="email" name="email" placeholder="Email Address" />
            </div>
            <div class="inputField">
                <input type="password" name="passowrd" placeholder="Password" />
            </div>
            <p>I don't have an account <span data-ref="signupPage" class="redirect">Signup</span></p>
            <button class="btn">Login</button>
        </form>
    `
    contentContainer.append(loginSection)

    return contentContainer
}

export {
    loginPage
}