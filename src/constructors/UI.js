import { loginPage } from "../modules/loginPage"
import { signupPage } from "../modules/signupPage"
import { dashboardPage } from "../modules/dashboardPage"
import { Auth } from './Auth'
import { Task } from './Task'
import { Project } from './Project'
import { db, auth } from '../config-firebase'
import { getTime, format, isToday } from 'date-fns'

class UI {
    static showToastError(msg){
        const toastError = document.createElement('div')
        toastError.classList.add('toastError')
        toastError.innerHTML = `
            <h4>${msg}</h4>
        `
        document.body.appendChild(toastError)
        
        setTimeout(() => {
            toastError.remove()
        }, 3000)
    }

    static rewriteDOM(dest) {
        document.body.append(dest())
        UI.eventListeners(dest)
        const links = document.querySelectorAll('.redirect')
        UI.getRedirectLinks(links)
    }

    static getRedirectLinks(links) {
        links.forEach(link => {
            link.addEventListener('click', () => {
                if(link.dataset.ref === 'loginPage'){
                    UI.rewriteDOM(loginPage)
                }
                if(link.dataset.ref === 'signupPage'){
                    UI.rewriteDOM(signupPage)
                }
                
            })
        })
    }

    static eventListeners(currentPage) {
        if(currentPage == signupPage){
            console.log('signupPage')
            const signupForm = document.querySelector('#signup .authForm')
            signupForm.addEventListener('submit', (e) => {
                e.preventDefault()
    
                const username = signupForm['username'].value;
                const email  = signupForm['email'].value;
                const password = signupForm['password'].value;
                
                Auth.signupUser(username, email, password)
            })
        }
        if(currentPage == loginPage){
            console.log('loginPage')
            const loginForm = document.querySelector('#login .authForm')
            loginForm.addEventListener('submit', (e) => {
                e.preventDefault()
    
                const email  = loginForm['email'].value;
                const password = loginForm['password'].value;
                
                Auth.loginUser(email, password)
            })
        } 
        if(currentPage == dashboardPage){
            console.log('dashboardPage')
            const createTaskButton = document.getElementById('createTaskBtn')
            createTaskButton.addEventListener('click', () => {
                this.createNewTaskTab()
            })
            const dropdown = document.querySelector('.dropdown__header')
            dropdown.addEventListener('click', () => {
                dropdown.parentElement.classList.toggle('opened')
                dropdown.parentElement.classList.toggle('closed')
            })
            const createProjectBtn = document.getElementById('createProjectBtn')
            createProjectBtn.addEventListener('click', () => {
                this.createNewProjectTab()
            })
        }
    }

    static createNewProjectTab(){
        const sidebarInfo = document.getElementById('itemInfo')
        sidebarInfo.innerHTML = `
        <form class="createForm">
            <span class="createForm__type">project</span>
            <input type="text" name="title" id="title" placeholder="Title" required minlength="5"/>
            <textarea type="text" name="description" id="description" rows="10" required minlength="40"></textarea>
            <div class="createForm__flexInputContainer">
                <label for="deadline">Color</label>
                <input type="color" name="color" id="color" value="#4361EE" required>
            </div>
            <div class="createForm__btnContainer">
                <button class="btn outlined" id="cancelBtn">Cancel</a>
                <button type="submit" class="btn" id="submitBtn">Create</a>
            </div>
        </form>
        `

        const createForm = sidebarInfo.querySelector('.createForm')
        const submitBtn = document.getElementById('submitBtn')
        const cancelBtn = document.getElementById('cancelBtn')

        submitBtn.addEventListener('click', (e) => {
            e.preventDefault()
            const newProject = new Project(createForm['title'].value, createForm['description'].value, createForm['color'].value)
            this.createProject(newProject)
        })

        cancelBtn.addEventListener('click', () => {
            this.clearSideBar()
        })
    }

    static createProject(projectObject){
        db.collection('users').doc(Auth.getUserID()).collection('projects').add({
            title: projectObject.title,
            description: projectObject.description,
            color: projectObject.color,
            tasks: []
        }).then(res => {
            this.clearSideBar()
        }).catch(err => console.log(err))
    }

    static createNewTaskTab(){
        const sidebarInfo = document.getElementById('itemInfo')
        sidebarInfo.innerHTML = `
            <form class="createForm">
                <span class="createForm__type">task</span>
                <input type="text" name="title" id="title" placeholder="Title" required minlength="5"/>
                <textarea type="text" name="description" id="description" rows="10" required minlength="40"></textarea>
                <div class="createForm__flexInputContainer">
                    <label for="project">Project</label>
                    <div class="createForm__customSelect">
                        <select id="project" required>
                            <option value="">----</option>
                        </select>
                        <span class="createForm__customSelect__customArrow"></span>
                    </div>
                </div>
                <div class="createForm__flexInputContainer">
                    <label for="priority">Priority</label>
                    <div class="createForm__customSelect">
                        <select id="priority" required>
                            <option value="">----</option>
                            <option value="High">High</option>
                            <option value="Medium">Medium</option>
                            <option value="Low">Low</option>
                        </select>
                        <span class="createForm__customSelect__customArrow"></span>
                    </div>
                </div>
                <div class="createForm__flexInputContainer">
                    <label for="deadline">Deadline</label>
                    <input type="date" name="deadline" id="deadline" required>
                </div>
                <div class="createForm__btnContainer">
                    <button class="btn outlined" id="cancelBtn">Cancel</a>
                    <button type="submit" class="btn" id="submitBtn">Create</a>
                </div>
            </form>
        `
        const projectSelect = document.getElementById('project')
        const createForm = sidebarInfo.querySelector('.createForm')
        const submitBtn = document.getElementById('submitBtn')
        const cancelBtn = document.getElementById('cancelBtn')

        db.collection('users').doc(Auth.getUserID()).collection('projects').get().then(projects => {
            projects.forEach(project => {
                const option = document.createElement('option')
                option.value = project.data().title
                option.innerText = project.data().title
                projectSelect.append(option)
            })
        }).catch(err => console.log(err))

        submitBtn.addEventListener('click', (e) => {
            e.preventDefault()
            const newTask = new Task(createForm['title'].value, createForm['description'].value, createForm['project'].value, createForm['priority'].value, createForm['deadline'].value)
            this.createTask(newTask)
        })

        cancelBtn.addEventListener('click', () => {
            this.clearSideBar()
        })
    }

    static displayUserTodaysTasks(user){
        db.collection('users').doc(user.uid).collection('tasks').onSnapshot(snapshot => {
            const userTasksList = document.getElementById('userTasksList')
            userTasksList.innerHTML = ``
            snapshot.docs.forEach(task => {
                const taskArticle = document.createElement('article')
                taskArticle.classList.add('dashboard__task')
                taskArticle.dataset.id = task.id
                taskArticle.innerHTML = `
                    <div class="checkbox__container">
                        <input type="checkbox" id="checkbox" />
                        <label for="checkbox" class="checkbox__mark"></label>
                    </div>
                    <div class="task__info">
                        <h5>${task.data().title}</h5>
                        <div class="task__data">
                            <span class="task__data__dueDate">${format(task.data().deadline.toDate(), 'dd-MM-yyyy')}</span>
                            <span class="task__data__priority ${task.data().priority}">${task.data().priority} Priority</span>
                        </div>
                    </div>
                    <div class="task__project" data-project="${task.data().project}">
                        <p>${task.data().project}</p>
                        <span class="markup"></span>
                    </div>
                `
                const taskProject = taskArticle.querySelector('.task__project')
                if(taskProject.dataset.project == "undefined"){
                    taskProject.style.display = "none"
                }

                userTasksList.append(taskArticle)

                taskArticle.addEventListener('click', () => this.displayItemInfo('task', task.id, user))
                   
            })
        }, (err) => console.log(err))
    }

    static displayUserCreds(user) {
        db.collection('users').doc(user.uid).get().then(user => {
            const userCredsHeader = document.getElementById('userCredsHeader')
            userCredsHeader.innerHTML = `
            <div class="navSidebar__header__userCircle">
                <h3>${user.data().username.split('')[0]}</h3>
            </div>
            <div class="navSidebar__header__userCreds">
                <h4>${user.data().username}</h4>
                <p>${user.data().email}</p>
            </div>
            <i class="ri-logout-circle-r-line" id="logout"></i>
            `

            const logoutBtn = userCredsHeader.querySelector('#logout')
            logoutBtn.addEventListener('click', () => {
                Auth.logoutUser()
            })
        }).catch(err => console.log(err))
    }

    static displayItemInfo(itemType, itemID, user){
        db.collection('users').doc(user.uid).collection(itemType + 's').doc(itemID).onSnapshot(snapshot => {
            const sidebarInfo = document.getElementById('itemInfo')
            sidebarInfo.innerHTML = `
                <span class="itemInfo__type">${itemType}</span>
                <div class="itemInfo__header">
                    <h3>${snapshot.data().title}</h3>
                    <div class="itemInfo__header__ctaIcons">
                        <i class="ri-edit-2-line" id="editItem"></i>
                        <i class="ri-close-circle-line" id="deleteItem"></i>
                    </div>
                </div>
                <p class="itemInfo__description">
                    ${snapshot.data().description} 
                </p>
                <div class="itemInfo__meta">
                    <h5>Project</h5>
                    <p>${snapshot.data().project}</p>
                </div>
                <div class="itemInfo__meta">
                    <h5>Priority</h5>
                    <p class="${snapshot.data().priority}">${snapshot.data().priority} Priority</p>
                </div>
                <div class="itemInfo__meta">
                    <h5>Deadline</h5>
                    <p>${format(snapshot.data().deadline.toDate(), 'dd-MM-yyyy')}</p>
                </div>
            `
            const deleteBtn = sidebarInfo.querySelector('#deleteItem')
            deleteBtn.addEventListener('click', () => { 
                this.deleteItemFromCollection('task', snapshot.id)
                this.clearSideBar()
            })

        }, (err) => console.log(err))
    }

    static displayProjectInfo(projectID){
        db.collection('users').doc(Auth.getUserID()).collection('projects').doc(projectID).onSnapshot(snapshot => {
            const sidebarInfo = document.getElementById('itemInfo')
            sidebarInfo.innerHTML = `
                <span class="itemInfo__type">project</span>
                <div class="itemInfo__header">
                    <h3>${snapshot.data().title}</h3>
                    <div class="itemInfo__header__ctaIcons">
                        <i class="ri-edit-2-line" id="editItem"></i>
                        <i class="ri-close-circle-line" id="deleteItem"></i>
                    </div>
                </div>
                <p class="itemInfo__description">
                    ${snapshot.data().description} 
                </p>
                <div class="itemInfo__meta">
                    <h5>Color</h5>
                    <div class="itemInfo__color" style="background-color: ${snapshot.data().color}"></div>
                </div>
                <div class="itemInfo__meta">
                    <h5>Completed Tasks</h5>
                    <p>0/${snapshot.data().tasks.length}</p>
                </div>
            `
            const deleteBtn = sidebarInfo.querySelector('#deleteItem')
            deleteBtn.addEventListener('click', () => { 
               this.deleteItemFromCollection('project', snapshot.id)
                this.clearSideBar()
            })
        }, err => console.log(err))
    }

    static displayProjects(){
        db.collection('users').doc(Auth.getUserID()).collection('projects').onSnapshot(projects => {
            const userProjectsList = document.getElementById('userProjectsList')
            userProjectsList.innerHTML = ''
            const dropdownList = document.querySelector('.dropdown__list')
            dropdownList.innerHTML = ''
            projects.docs.forEach(project => {
                const projectArticle = document.createElement('article')
                projectArticle.classList.add('dashboard__project')
                projectArticle.innerHTML = `
                    <div class="dashboard__project__colorMarkup" style="background-color:${project.data().color}"></div>
                    <h5>${project.data().title}</h5>
                    <p>${project.data().description.slice(0, 140)}...</p>
                    <p class="dashboard__project__completedTasks">0/${project.data().tasks.length}</p>
                `
                userProjectsList.append(projectArticle)

                const dropdownListLink = document.createElement('li')
                //dropdownListLink.id = 'project'
                dropdownListLink.innerHTML = `
                    <span class="markup" style="background-color:${project.data().color}"></span>
                    ${project.data().title}
                `
                dropdownList.append(dropdownListLink)
                
                projectArticle.addEventListener('click', () => this.displayProjectInfo(project.id))
                dropdownListLink.addEventListener('click', () => this.displayProjectInfo(project.id))
            })
            

        }, err => console.log(err))
    }
    
    static clearSideBar(){
        document.getElementById('itemInfo').innerHTML = `
        <div class="itemInfo__empty">
            <img src="./assets/watering_plant.svg">
            <h5>Clean here</h5>
            <p>No task has been choose</p>
        </div>
    `
    }

    static deleteItemFromCollection(itemType, itemID){
        db.collection('users').doc(Auth.getUserID()).collection(itemType + 's').doc(itemID).delete().then(() => {
            console.log('succesfully deleted')
        }).catch(err => console.log(err))
    }
    
    static createTask(taskObject){
        db.collection('users').doc(Auth.getUserID()).collection('tasks').add({
            title: taskObject.title,
            description: taskObject.description,
            priority: taskObject.priority,
            project: taskObject.project,
            deadline: new Date(taskObject.deadline),
            checked: false
        }).then(res => {
            this.clearSideBar()
        }).catch(err => console.log(err))
    }

    static clearInputFields(form){
        form.reset()
    }
}

export {
    UI
}
