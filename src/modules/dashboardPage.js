const dashboardPage = () => {
    const contentContainer = document.getElementById('content')
    contentContainer.innerHTML = `
        <nav class="navSidebar">
            <div class="navSidebar__header">
                <div class="navSidebar__header__userCircle">
                    <h3>M</h3>
                </div>
                <div class="navSidebar__header__userCreds">
                    <h4>Matěj Křenek</h4>
                    <p>mate23.krenek@gmail.com</p>
                </div>
            </div>
            <div class="navSidebar__content">
                <ul class="navSidebar__contentLinks">
                    <li>
                        <div class="left">
                            <i class="ri-home-4-line"></i>
                            <h4>Home</h4>
                        </div>
                    </li>
                    <li class="active">
                        <div class="left">
                            <i class="ri-calendar-event-line"></i>
                            <h4>Today</h4>
                        </div>
                    </li>
                    <li class="dropdown">
                        <div class="left">
                            <i class="ri-bar-chart-box-line"></i>
                            <h4>Projects</h4>
                        </div>
                        <div class="right">
                            <i class="ri-arrow-right-s-fill"></i>
                        </div>
                    </li>    
                </ul>
            </div>
        </nav>
        <section class="dashboard">
            <div class="dashboard__projects">
                <h2>Projects</h2>
                <div class="dashboard__projects__list">
                    <article class="dashboard__project">
                        <h5>Programming</h5>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime consequatur animi amet mollitia aspernatur optio suscipit quasi nulla?</p>
                        <p class="dashboard__project__completedTasks">1/4</p>
                    </article>
                    <article class="dashboard__project">
                        <h5>Workout</h5>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae omnis atque maiores vitae? Quia, tenetur.</p>
                        <p class="dashboard__project__completedTasks">1/2</p>
                    </article>
                    <article class="dashboard__project">
                        <h5>Household</h5>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Corporis modi sapiente quidem quod doloremque. Officiis, sapiente accusamus.</p>
                        <p class="dashboard__project__completedTasks">12/16</p>
                    </article>
                </div>
            </div>
            <div class="dashboard__tasks">
                <h2>Today</h2>
                <div class="dashboard__tasks__list">
                    <article class="dashboard__task"></article>
                </div>
            </div>
        </section>
        <section class="infoSidebar"></section>
    `

    return contentContainer
}

export {
    dashboardPage
}