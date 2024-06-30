// for the project names
async function getJson() {
    try {
        const response = await fetch('http://localhost:3000/users');
        const data = await response.json();

        const projectList = document.getElementById('projectList');

        data.forEach(user => {
            if (user.active) {
                user.projects.forEach(project => {
                    const projectItem = document.createElement('li');
                    const projectLink = document.createElement('a');
                    projectLink.textContent = project.title;
                    projectLink.href = "#";
                    projectLink.addEventListener('click', () => displayProjectDetails(project));

                    projectItem.appendChild(projectLink);
                    projectList.appendChild(projectItem);
                });
            }
        });
    } catch (error) {
        console.error('Error fetching or parsing data:', error);
    }
}
// for the tasks in the project
document.addEventListener('DOMContentLoaded', getJson);

function displayProjectDetails(project) {
    const container = document.getElementById('title');
    container.innerHTML = ''; 

    const projectContainer = document.createElement('div');
    projectContainer.className = "project-title-description";
    projectContainer.innerHTML = `
        <h1>${project.title}</h1>
        <p>${project.description}</p>
    `;
    container.appendChild(projectContainer);

    if (project.tasks && Array.isArray(project.tasks)) {
        project.tasks.forEach(task => {
            const taskContainer = document.createElement('div');
            taskContainer.className = "user-tasks";
            taskContainer.innerHTML = `
                <h2>${task.title}</h2>
                
                <p>description:   ${task.description} <br/>
                dueDate:   ${task.dueDate}<br/>
              status:   ${task.status}
              </p>

            `;
            projectContainer.appendChild(taskContainer);
        });
    }
}

// delete


document.addEventListener('DOMContentLoaded', () => {
    getJson();

    let deleteUser = document.getElementById("Del-User");
    deleteUser.addEventListener("click", (e) => {
        e.preventDefault();

        let userId = document.getElementById("delete").value;
        let deleteMessage = document.getElementById("delete-message");

        fetch(`http://localhost:3000/users/${userId}`, {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json'
            },
        })
            .then(response => {
                if (response) {
                    deleteMessage.textContent = "User deleted successfully.";
                    deleteMessage.style.color = "green";
                    getJson();
                } else {
                    throw new Error("User not found or unable to delete.");
                }
            })
            .catch((error) => {
                deleteMessage.textContent = `Error: ${error.message}`;
                deleteMessage.style.color = "red";
                console.error('Error:', error);
            });
    });
});

async function getJson() {
    try {
        const response = await fetch('http://localhost:3000/users');
        const data = await response.json();

        const projectList = document.getElementById('projectList');
        projectList.innerHTML = ''; 

        data.forEach(user => {
            if (user.active) {
                user.projects.forEach(project => {
                    const projectItem = document.createElement('li');
                    const projectLink = document.createElement('a');
                    projectLink.textContent = project.title;
                    projectLink.href = "#";
                    projectLink.addEventListener('click', () => displayProjectDetails(project, user.id));

                    projectItem.appendChild(projectLink);
                    projectList.appendChild(projectItem);
                });
            }
        });
    } catch (error) {
        console.error('Error fetching or parsing data:', error);
    }
}

function displayProjectDetails(project, userId) {
    const container = document.getElementById('insert');
    container.innerHTML = ''; 

    const projectContainer = document.createElement('div');
    projectContainer.className = "project-title-description";
    projectContainer.innerHTML = `
    <h1>${project.title}</h1>
    <p>${project.description}</p>
    `;
    container.appendChild(projectContainer);

    if (project.tasks && Array.isArray(project.tasks)) {
        project.tasks.forEach(task => {
            const taskContainer = document.createElement('div');
            taskContainer.className = "user-tasks";
            taskContainer.innerHTML = `
            <h2>${task.title}</h2>
            <p>${task.description} <br/>
            ${task.dueDate}<br/>
            ${task.status}</p>
            <button class="delete-task">Delete Task</button>
            `;
            projectContainer.appendChild(taskContainer);

            const deleteTaskButton = taskContainer.querySelector('.delete-task');
            deleteTaskButton.addEventListener('click', () => deleteTask(userId, project.id, task.id, taskContainer));
        });
    }
}

function deleteTask(userId, projectId, taskId, taskContainer) {
    const response = fetch(`http://localhost:3000/users/${userId}/projects/${projectId}/tasks/${taskId}`, {
        // const data = await response.json()
        method: "DELETE",
        headers: {
            'Content-Type': 'application/json'
        },
    })
        .then(response => {
            if (response) {
                taskContainer.remove();
            } else {
                throw new Error("Task not found or unable to delete.");
            }
        })
        .catch((error) => {
            console.error('Error:', error);
        });
}





