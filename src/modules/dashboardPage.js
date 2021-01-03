const dashboardPage = () => {
    const contentContainer = document.getElementById('content')
    contentContainer.innerHTML = `
        <nav class="navSidebar">
            <div class="navSidebar__header" id="userCredsHeader"></div>
            <div class="navSidebar__content">
                <ul class="navSidebar__contentLinks">
                    <li class="active">
                        <i class="ri-home-4-line"></i>
                        <h4>Home</h4>
                    </li>
                    <li>
                        <i class="ri-calendar-event-line"></i>
                        <h4>Today</h4>
                    </li>
                    <li id="dropdown" class="closed">
                        <div class="dropdown__header">
                            <div class="left">
                                <i class="ri-bar-chart-box-line"></i>
                                <h4>Projects</h4>
                            </div>
                            <div class="right">
                                <i class="ri-arrow-right-s-fill"></i>
                            </div>
                        </div>
                        <div class="dropdown__content">
                            <ul class="dropdown__list"></ul>
                            <button class="btn-label" id="createProjectBtn"><i class="ri-add-fill"></i> Add Projet</button>
                        </div>
                    </li>    
                </ul>
            </div>
        </nav>
        <section class="dashboard">
            <div class="dashboard__projects">
                <h2>Projects</h2>
                <div class="dashboard__projects__list" id="userProjectsList">
                </div>
            </div>
            <div class="dashboard__tasks">
                <h2>All Tasks</h2>
                <div class="dashboard__tasks__list" id="userTasksList"></div>
                <button class="btn create" id="createTaskBtn"><i class="ri-add-fill"></i> Add Task</button>
            </div>
        </section>
        <section class="infoSidebar">
            <article class="itemInfo" id="itemInfo">
                <div class="itemInfo__empty">
                    <img src="./assets/watering_plant.svg">
                    <h5>Clean here</h5>
                    <p>No task has been choose</p>
                </div>
            </article>
        </section>
    `

    return contentContainer
}

export {
    dashboardPage
}