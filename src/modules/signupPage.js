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
                <input type="text" name="username" id="username" placeholder="Username" required/>
            </div>
            <div class="inputField">
                <input type="email" name="email" id="email" placeholder="Email Address" required/>
            </div>
            <div class="inputField">
                <input type="password" name="passowrd" id="password" placeholder="Password" required/>
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