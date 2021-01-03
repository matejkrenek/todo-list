class Task{
    constructor(title, description, project, priority, deadline){
        this.title = title
        this.description = description
        this.project = project
        this.priority = priority
        this.deadline = deadline
        this.checked = false
    }
}

export {
    Task
}