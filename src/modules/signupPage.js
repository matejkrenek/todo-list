const signupPage = () => {
    const contentContainer = document.getElementById('content')
    contentContainer.innerHTML = ''
    const signupSection = document.createElement('section')
    signupSection.classList.add('authPage')
    signupSection.id = 'signup'
    signupSection.innerHTML = `
        <img class="logo__big" src="./assets/logo.svg" alt="Company Logo">
        <h1>Create an Account</h1>
        <form class="authForm">
            <div class="inputField">
                <input type="text" name="username" placeholder="Username" />
            </div>
            <div class="inputField">
                <input type="email" name="email" placeholder="Email Address" />
            </div>
            <div class="inputField">
                <input type="password" name="passowrd" placeholder="Password" />
            </div>
            <p>I already have an account <span data-ref="loginPage" class="redirect">Login</span></p>
            <button class="btn">Register</button>
        </form>
    `
    contentContainer.append(signupSection)

    return contentContainer
}

export {
    signupPage
}