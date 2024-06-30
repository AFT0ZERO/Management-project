// zaid card 
document.addEventListener("DOMContentLoaded", () => {
const selectElements = document.querySelectorAll("select");

selectElements.forEach((selectElement) => {
    selectElement.addEventListener("change", () => {
    const value = selectElement.value;
    selectElement.className = "status"; 
    selectElement.classList.add(value); 
});

const initialValue = selectElement.value;
selectElement.classList.add(initialValue);
});
});

document.addEventListener('DOMContentLoaded', () => {
    const content = document.getElementById('content');
    const cardTitleInput = document.getElementById('cardTitle');
    const cardDescriptionInput = document.getElementById('cardDescription');

    // Fetch existing cards from the JSON server
    fetch('http://localhost:3000/cards')
        .then(response => response.json())
        .then(cards => {
            cards.forEach(card => {
                createCardElement(card.id, card.title, card.description, card.date, card.status);
            });
        });

    document.body.addEventListener('click', function (event) {
        if (event.target && event.target.id === 'addCardButton') {
            const cardTitle = cardTitleInput.value.trim();
            const cardDescription = cardDescriptionInput.value.trim();
            const d = new Date();
            const year = d.getFullYear();
            const month = String(d.getMonth() + 1).padStart(2, '0');
            const day = String(d.getDate()).padStart(2, '0');
            const cardDate = `${year}-${month}-${day}`;
            const cardStatus = 'To Do'; // Default status

            if (cardTitle !== "") {
                const newCard = {
                    title: cardTitle,
                    description: cardDescription,
                    date: cardDate,
                    status: cardStatus
                };

                // Add new card to JSON server
                fetch('http://localhost:3000/cards', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(newCard)
                })
                    .then(response => response.json())
                    .then(card => {
                        createCardElement(card.id, card.title, card.description, card.date, card.status);
                    });

                // Clear the input fields
                cardTitleInput.value = '';
                cardDescriptionInput.value = '';
            } else {
                alert('Please enter a card title.');
            }
        }
    });

    // ahmadk
    function createCardElement(id, title, description, date, status) {
        const newCard = document.createElement('div');
        newCard.classList.add('card');

        const cardHeader = document.createElement('h3');
        cardHeader.textContent = title;

        const cardBody = document.createElement('p');
        cardBody.textContent = description;

        const cardDateElement = document.createElement('h3');
        cardDateElement.textContent = date;

        const statusSelect = document.createElement('select');
        statusSelect.innerHTML = `
            <option value="To Do">To Do</option>
            <option value="In Progress">In Progress</option>
            <option value="Done">Done</option>
        `;
        statusSelect.value = status;
        statusSelect.addEventListener('change', function () {
            updateCardStatus(id, statusSelect.value);
        });

        const editButton = document.createElement('button');
        editButton.textContent = "Edit Card";
        editButton.classList.add('btn');

        const deleteButton = document.createElement('button');
        deleteButton.textContent = "Delete Card";
        deleteButton.classList.add('btn');
        deleteButton.addEventListener('click', function () {
            deleteCard(id, newCard);
        });

        newCard.appendChild(cardHeader);
        newCard.appendChild(cardBody);
        newCard.appendChild(cardDateElement);
        newCard.appendChild(statusSelect);
        newCard.appendChild(editButton);
        newCard.appendChild(deleteButton);

        content.appendChild(newCard);
    }

    function updateCardStatus(id, status) {
        fetch(`http://localhost:3000/cards/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ status })
        })
            .then(response => response.json())
            .then(data => {
                console.log('Status updated:', data);
            })
            .catch(error => {
                console.error('Error updating status:', error);
            });
    }

    function deleteCard(id, cardElement) {
        fetch(`http://localhost:3000/cards/${id}`, {
            method: 'DELETE'
        })
            .then(response => {
                if (response.ok) {
                    content.removeChild(cardElement);
                    console.log('Card deleted');
                } else {
                    console.error('Error deleting card');
                }
            })
            .catch(error => {
                console.error('Error deleting card:', error);
            });
    }
});

// mohammad 
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





