// add task pop up 
document.getElementById('openFormButton').addEventListener('click', function() {
    document.getElementById('taskFormPopup').style.display = 'block';
});

document.getElementById('closeFormButton').addEventListener('click', function() {
    document.getElementById('taskFormPopup').style.display = 'none';
});

// to send data 
// document.getElementById('taskForm').addEventListener('submit', function(event) {
//     event.preventDefault();
//     const title = event.target.title.value;
//     const description = event.target.description.value;
//     console.log('Task Created:', { title, description });
//     document.getElementById('taskFormPopup').style.display = 'none';
//     event.target.reset();
// });
// end to send data 
// here 



// make this work with the html 

//zaid search
// document.getElementById('searchInput').addEventListener('keyup', function (event) {
//     if (event.key === 'Enter') {
//         let input = event.target.value.toLowerCase();
//         let cards = document.querySelectorAll('.card');
//         cards.forEach(card => {
//             let cardName = card.getAttribute('data-name').toLowerCase();
//             card.style.display = 'none'; 
//             if (cardName.includes(input)) {
//                 card.style.display = 'block'; 
//             }
//         });
//     }
// });
// zaid search 2 
// document.getElementById('searchAsid').addEventListener('keyup', function (event) {
//     if (event.key === 'Enter') {
//         let input = event.target.value.toLowerCase();
//         let navItems = document.querySelectorAll('.nav-item');

//         navItems.forEach(item => {
//             let itemName = item.querySelector('a').textContent.toLowerCase();
//             if (itemName.includes(input)) {
//                 item.style.display = 'block';
//             } else {
//                 item.style.display = 'none';
//             }
//         });
//     }
// });






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


// ahmad k 

// document.addEventListener('DOMContentLoaded', () => {
//     const content = document.getElementById('content');
//     const cardTitleInput = document.getElementById('cardTitle');
//     const cardDescriptionInput = document.getElementById('cardDescription');

//     // Fetch existing cards from the JSON server
//     // fetch('http://localhost:3000/cards')
//     //     .then(response => response.json())
//     //     .then(cards => {
//     //         cards.forEach(card => {
//     //             createCardElement(card.id, card.title, card.description, card.date, card.status);
//     //         });
//     //     });

//     // document.body.addEventListener('click', function (event) {
//     //     if (event.target && event.target.id === 'addCardButton') {
//     //         const cardTitle = cardTitleInput.value.trim();
//     //         const cardDescription = cardDescriptionInput.value.trim();
//     //         const d = new Date();
//     //         const year = d.getFullYear();
//     //         const month = String(d.getMonth() + 1).padStart(2, '0');
//     //         const day = String(d.getDate()).padStart(2, '0');
//     //         const cardDate = `${year}-${month}-${day}`;
//     //         const cardStatus = 'To Do'; // Default status

//     //         if (cardTitle !== "") {
//     //             const newCard = {
//     //                 title: cardTitle,
//     //                 description: cardDescription,
//     //                 date: cardDate,
//     //                 status: cardStatus
//     //             };

//     //             // Add new card to JSON server
//     //             fetch('http://localhost:3000/cards', {
//     //                 method: 'POST',
//     //                 headers: {
//     //                     'Content-Type': 'application/json'
//     //                 },
//     //                 body: JSON.stringify(newCard)
//     //             })
//     //                 .then(response => response.json())
//     //                 .then(card => {
//     //                     createCardElement(card.id, card.title, card.description, card.date, card.status);
//     //                 });

//     //             // Clear the input fields
//     //             cardTitleInput.value = '';
//     //             cardDescriptionInput.value = '';
//     //         } else {
//     //             alert('Please enter a card title.');
//     //         }
//     //     }
//     // });

//     // ahmadk
//     function createCardElement(id, title, description, date, status) {
//         const newCard = document.createElement('div');
//         newCard.classList.add('card');

//         const cardHeader = document.createElement('h3');
//         cardHeader.textContent = title;

//         const cardBody = document.createElement('p');
//         cardBody.textContent = description;

//         const cardDateElement = document.createElement('h3');
//         cardDateElement.textContent = date;

//         const statusSelect = document.createElement('select');
//         statusSelect.innerHTML = `
//             <option value="To Do">To Do</option>
//             <option value="In Progress">In Progress</option>
//             <option value="Done">Done</option>
//         `;
//         statusSelect.value = status;
//         statusSelect.addEventListener('change', function () {
//             updateCardStatus(id, statusSelect.value);
//         });

//         const editButton = document.createElement('button');
//         editButton.textContent = "Edit Card";
//         editButton.classList.add('btn');

//         const deleteButton = document.createElement('button');
//         deleteButton.textContent = "Delete Card";
//         deleteButton.classList.add('btn');
//         deleteButton.addEventListener('click', function () {
//             deleteCard(id, newCard);
//         });

//         newCard.appendChild(cardHeader);
//         newCard.appendChild(cardBody);
//         newCard.appendChild(cardDateElement);
//         newCard.appendChild(statusSelect);
//         newCard.appendChild(editButton);
//         newCard.appendChild(deleteButton);

//         content.appendChild(newCard);
//     }

//     function updateCardStatus(id, status) {
//         fetch(`http://localhost:3000/cards/${id}`, {
//             method: 'PATCH',
//             headers: {
//                 'Content-Type': 'application/json'
//             },
//             body: JSON.stringify({ status })
//         })
//             .then(response => response.json())
//             .then(data => {
//                 console.log('Status updated:', data);
//             })
//             .catch(error => {
//                 console.error('Error updating status:', error);
//             });
//     }

//     function deleteCard(id, cardElement) {
//         fetch(`http://localhost:3000/cards/${id}`, {
//             method: 'DELETE'
//         })
//             .then(response => {
//                 if (response.ok) {
//                     content.removeChild(cardElement);
//                     console.log('Card deleted');
//                 } else {
//                     console.error('Error deleting card');
//                 }
//             })
//             .catch(error => {
//                 console.error('Error deleting card:', error);
//             });
//     }
// });

// mohammad 
// for the project names
// async function getJson() {
//     try {
//         const response = await fetch('http://localhost:3000/users');
//         const users = await response.json();

//         const projectList = document.getElementById('projectList');

//         users.forEach(user => {
//             if (user.active) {
//                 user.projects.forEach(project => {
//                     const projectItem = document.createElement('li');
//                     const projectLink = document.createElement('a');
//                     projectLink.textContent = project.title;
//                     projectLink.href = "#";
//                     projectLink.addEventListener('click', () => displayProjectDetails(project));

//                     projectItem.appendChild(projectLink);
//                     projectList.appendChild(projectItem);
//                 });
//             }
//         });
//     } catch (error) {
//         console.error('Error fetching or parsing user:', error);
//     }
// }
// // for the tasks in the project
// document.addEventListener('DOMContentLoaded', getJson);

// function displayProjectDetails(project) {
//     const container = document.getElementById('title');
//     container.innerHTML = ''; 

//     const projectContainer = document.createElement('div');
//     projectContainer.className = "project-title-description";
//     projectContainer.innerHTML = `
//         <h1>${project.title}</h1>
//         <p>${project.description}</p>
//     `;
//     container.appendChild(projectContainer);

//     if (project.tasks && Array.isArray(project.tasks)) {
//         project.tasks.forEach(task => {
//             const taskContainer = document.createElement('div');
//             taskContainer.className = "user-tasks";
//             taskContainer.innerHTML = `
//                 <h2>${task.title}</h2>
                
//                 <p>description:   ${task.description} <br/>
//                 dueDate:   ${task.dueDate}<br/>
//               status:   ${task.status}
//               </p>

//             `;
//             projectContainer.appendChild(taskContainer);
//         });
//     }
// }

// delete
// document.addEventListener('DOMContentLoaded', () => {
//     getJson();

//     let deleteUser = document.getElementById("Del-User");
//     deleteUser.addEventListener("click", (e) => {
//         e.preventDefault();

//         let userId = document.getElementById("delete").value;
//         let deleteMessage = document.getElementById("delete-message");

//         fetch(`http://localhost:3000/users/${userId}`, {
//             method: "DELETE",
//             headers: {
//                 'Content-Type': 'application/json'
//             },
//         })
//             .then(response => {
//                 if (response) {
//                     deleteMessage.textContent = "User deleted successfully.";
//                     deleteMessage.style.color = "green";
//                     getJson();
//                 } else {
//                     throw new Error("User not found or unable to delete.");
//                 }
//             })
//             .catch((error) => {
//                 deleteMessage.textContent = `Error: ${error.message}`;
//                 deleteMessage.style.color = "red";
//                 console.error('Error:', error);
//             });
//     });
// });

// async function getJson() {
//     try {
//         const response = await fetch('http://localhost:3000/users');
//         const data = await response.json();

//         const projectList = document.getElementById('projectList');
//         projectList.innerHTML = ''; 

//         data.forEach(user => {
//             if (user.active) {
//                 user.projects.forEach(project => {
//                     const projectItem = document.createElement('li');
//                     const projectLink = document.createElement('a');
//                     projectLink.textContent = project.title;
//                     projectLink.href = "#";
//                     projectLink.addEventListener('click', () => displayProjectDetails(project, user.id));

//                     projectItem.appendChild(projectLink);
//                     projectList.appendChild(projectItem);
//                 });
//             }
//         });
//     } catch (error) {
//         console.error('Error fetching or parsing data:', error);
//     }
// }

// function displayProjectDetails(project, userId) {
//     const container = document.getElementById('insert');
//     container.innerHTML = ''; 

//     const projectContainer = document.createElement('div');
//     projectContainer.className = "project-title-description";
//     projectContainer.innerHTML = `
//     <h1>${project.title}</h1>
//     <p>${project.description}</p>
//     `;
//     container.appendChild(projectContainer);

//     if (project.tasks && Array.isArray(project.tasks)) {
//         project.tasks.forEach(task => {
//             const taskContainer = document.createElement('div');
//             taskContainer.className = "user-tasks";
//             taskContainer.innerHTML = `
//             <h2>${task.title}</h2>
//             <p>${task.description} <br/>
//             ${task.dueDate}<br/>
//             ${task.status}</p>
//             <button class="delete-task">Delete Task</button>
//             `;
//             projectContainer.appendChild(taskContainer);

//             const deleteTaskButton = taskContainer.querySelector('.delete-task');
//             deleteTaskButton.addEventListener('click', () => deleteTask(userId, project.id, task.id, taskContainer));
//         });
//     }
// }

// function deleteTask(userId, projectId, taskId, taskContainer) {
//     const response = fetch(`http://localhost:3000/users/${userId}/projects/${projectId}/tasks/${taskId}`, {
//         // const data = await response.json()
//         method: "DELETE",
//         headers: {
//             'Content-Type': 'application/json'
//         },
//     })
//         .then(response => {
//             if (response) {
//                 taskContainer.remove();
//             } else {
//                 throw new Error("Task not found or unable to delete.");
//             }
//         })
//         .catch((error) => {
//             console.error('Error:', error);
//         });
// }

// display project start
document.addEventListener('DOMContentLoaded', getJson);
async function getJson() {
    try {
        const response = await fetch('http://localhost:3000/users');
        const users = await response.json();

        const projectList = document.getElementById('projectList');
        users.forEach(async (user) => {
            if (user.active == true) {
                // user.projects.forEach(project => {
                    const response1 = await fetch(`http://localhost:3000/projects?id=${user.id}`);
                    const projects = await response1.json();
                    projects.forEach(project =>{

                        const projectItem = document.createElement('li');
                        projectItem.classList.add(`nav-item`)
                        const projectLink = document.createElement('a');
                        projectLink.textContent = project.title;
                        projectLink.href = "#";
                        projectLink.addEventListener('click', () => displayProjectDetails(project));
                        
                        projectItem.appendChild(projectLink);
                        projectList.appendChild(projectItem);
                    })

                // });
            }
        });
    } catch (error) {
        console.error('Error fetching or parsing data:', error);
    }
}

async function displayProjectDetails(project) {
    console.log(project);
    const container = document.getElementById('contaner');
    container.innerHTML = '';

    const projectContainer = document.createElement('div');
    projectContainer.classList.add("MainCard")

    container.appendChild(projectContainer);

    await fetch(`http://localhost:3000/projects?pro_id=${(project.pro_id)}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify( {active_pro:true})
    })
    .catch((error) => {
        console.error('Error:', error);
        alert("An error occurred");
    });
    const response2 = await fetch(`http://localhost:3000/tasks?pro_title=${project.title}`);
    const tasks = await response2.json();

    
        tasks.forEach(task => {
            const taskContainer = document.createElement('div');
            taskContainer.className = "user-tasks";
            taskContainer.innerHTML = `
            <div class="card">
                        <div class="card-header">
                            <h2 class="taitle">${task.title}</h2>
                            <h2 class="history">${task.dueDate}</h2>
                        </div>
                        <p class="description">
                        These are the details of the task. This section contains a brief
                        description of what the task is about.
                        </p>
                        <hr>
                
                        <label for="status">Status : </label>
                        <select id="status" name="status" id="status">
                            <option class="todo" value="todo">To Do</option>
                            <option class="inprogress" value="inprogress">In Progress</option>
                            <option class="completed" value="completed">Completed</option>
                        </select>
                        <button id="delete">
                            <i  class="fa fa-trash" aria-hidden="true"></i>
                        </button>
                        <button class="edit">
                            <i class="fa fa-pencil" aria-hidden="true"></i>
                        </button>
                    </div>


          

            `;
            projectContainer.appendChild(taskContainer);
        });
}
// display project end



// abdallah htamla

// let addProjectTitle =document.getElementById("title-add-projet");
// let addProjectDes =document.getElementById("des-add-projet");
// let submitProject = document.getElementById("btnSubmit");

// var curUserId=0;
// async function createProject()
// { 
//     async function displayWelcomeMessage() {
//         try {
//             const response = await fetch('http://localhost:3000/users');
//             const data = await response.json();
    
//             data.forEach(user => {
//                 if (user.active == true) {
                    
//                     curUserId=user.id;
//                 }
//             })
//         } catch {
//             console.log(`User not found.`);
//         }
//     };
//     displayWelcomeMessage();
//     // const curUserId = new URLSearchParams(window.location.search).get('id');
//     const response1 = await fetch(`http://localhost:3000/users/${curUserId}`)
//     const userData = await response1.json()
//     let newProjectId = 0;
//     if(userData.Projects.length == 0) newProjectId = 0;
//     else {
//         newProjectId = userData.Projects[userData.Projects.length - 1].id + 1
//     }
//     let newPorject = {
//         id : newProjectId,
//         title: addProjectTitle.value,   //Change to dom controllers
//         description: addProjectDes.value, //Change to dom controllers
//         // content: "test-content", //Change to dom controllers
//         create_date:  new Date().toLocaleDateString(),
//         tasks: []
//       }
//       userData.Projects.push(newPorject)
//     const response = await fetch(`http://localhost:3000/users/${curUserId}`, {
//         method : 'POST',
//         headers: {
//             "Content-Type": "application/json",
//           },
//         body : JSON.stringify(userData)
//     })
// }

// test done add project 
let submitProject = document.getElementById("taskForm");
submitProject.addEventListener("submit", async (e) => {
    e.preventDefault();

    let addProjectTitle =document.getElementById("title-add-projet");
    let addProjectDes =document.getElementById("des-add-projet");

    const response0 = await fetch('http://localhost:3000/users');
    const user0 = await response0.json();
   
    user0.forEach( async (user) => 
        {
        if (user.active)
            { 

                // const response1 = await fetch(`http://localhost:3000/projects/${user.id}`)
                // const projcetData = await response1.json()
                let newProject = 
                {
                    "id": user.id,
                    "active_pro":false,
                    "title": addProjectTitle.value,
                    "description": addProjectDes.value
                };
                console.log(newProject)
                await fetch('http://localhost:3000/projects', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(newProject)
                })
                .catch((error) => {
                    console.error('Error:', error);
                    alert("An error occurred");
                });
            }
        })

    // const response1 = await fetch(`http://localhost:3000/projects`)
    // const projcetData = await response1.json()

    // let newProjectId = 0;
    // if(projcetData.length == 0) newProjectId = 0;
    // else {
    //     newProjectId = projcetData[projcetData.length - 1].id + 1
    // }

            // let newProject = {
            //     "id": 1,
            // "title": addProjectTitle.value,
            // "description": addProjectDes.value
            // };
            // fetch('http://localhost:3000/users/', {
            //     method: 'POST',
            //     headers: {
            //         'Content-Type': 'application/json'
            //     },
            //     body: JSON.stringify(newProject)
            // })
            // .catch((error) => {
            //     console.error('Error:', error);
            //     alert("An error occurred");
            // });
 })
 



