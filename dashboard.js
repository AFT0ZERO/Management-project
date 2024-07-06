// add project pop up  start
document.getElementById('openFormButton').addEventListener('click', function () {
    document.getElementById('addProjectFormPopup').style.display = 'block';
});
document.getElementById('closeFormButton').addEventListener('click', function () {
    document.getElementById('addProjectFormPopup').style.display = 'none';
});
// add project pop up  end 


//add task pop up start
document.getElementById('createTaskButton').addEventListener('click', function() {
    document.getElementById('createTaskPopup').style.display = 'block';
});
document.getElementById('closeCreateTaskPopup').addEventListener('click', function() {
    document.getElementById('createTaskPopup').style.display = 'none';
});
//add task pop up end 


//zaid search for task start
document.getElementById('searchInput').addEventListener('keyup', function (event) {
    if (event.key === 'Enter') {
        let input = event.target.value.toLowerCase();
        let cards = document.querySelectorAll('.card');
        cards.forEach(card => {
            let cardName = card.getAttribute('data-name').toLowerCase();
            card.style.display = 'none'; 
            if (cardName.includes(input)) {
                card.style.display = 'block'; 
            }
        });
    }
});
//zaid search for task end 

// zaid search for project start   (fix this)
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
// zaid search for project end  
                    
                    


// display project start
document.addEventListener('DOMContentLoaded', getJson);
async function getJson() {
    try {
        const response = await fetch('http://localhost:3000/users');
        const users = await response.json();

        const projectList = document.getElementById('projectList');
        users.forEach(async (user) => {
            if (user.active) {
                const response1 = await fetch(`http://localhost:3000/projects?user_id=${user.id}`);
                const projects = await response1.json();
                projects.forEach(project => {

                    const projectItem = document.createElement('div');
                    projectItem.classList.add(`nav-item`)
                    const projectLink = document.createElement('a');
                    projectLink.textContent = project.title;
                    projectLink.href = "#";
                   const projectdelBtn=document.createElement("button");
                    projectdelBtn.classList.add("delete-btn");
                    projectdelBtn.innerHTML=`
                  <i  class="fas fa-trash" ></i>
                    `;
                   
                    projectLink.addEventListener('click', () => displayProjectDetails(project));

                    projectdelBtn.addEventListener('click', () => deleteProject3(project));

                    let submitTask = document.getElementById("createTaskForm");
                    submitTask.addEventListener("submit", () =>addTask(project)) ;

                    projectItem.appendChild(projectLink);
                    projectItem.appendChild(projectdelBtn);

                    document.getElementById("projectList").appendChild(projectItem);
                })
            }
        });
    } catch (error) {
        console.error('Error fetching or parsing data:', error);
    }
}

async function displayProjectDetails(project) {

    
    const container = document.getElementById('contaner');
    container.innerHTML = '';

    const projectContainer = document.createElement('div');
    projectContainer.classList.add("MainCard")

    container.appendChild(projectContainer);

    console.log(project.id)
    const response2 = await fetch(`http://localhost:3000/tasks?pro_id=${project.id}`);
    const tasks = await response2.json();

    if(tasks.length===0)
    {
        let message = document.createElement('div');
        message.classList.add("message-error-task");
        message.textContent="You Don't Have Tasks";
        projectContainer.appendChild(message);
    }
    tasks.forEach(task => {
        const taskContainer = document.createElement('div');
        taskContainer.className = "user-tasks";
        taskContainer.innerHTML = `
            <div class="card" data-name="${task.title}">
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
                        <button class="edit" id="delete">
                            <i   class="fa fa-trash" aria-hidden="true"></i>
                        </button>
                        <button class="edit">
                            <i class="fa fa-pencil" aria-hidden="true"></i>
                        </button>
                    </div>


          

            `;
            projectContainer.appendChild(taskContainer);

            let taskDelBtn = document.getElementById("delete")
            taskDelBtn.addEventListener('click', () => deleteTask(task));
      
            // zaid status of task
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
}
// display project end
 
//add task start
async function addTask(project)
{
    let addTaskTitle = document.getElementById("title-add-task");
    let addTaskDes = document.getElementById("des-add-task");
    let newTask ={
      "pro_id": project.id,
      "title": addTaskTitle.value,
      "description": String(addTaskDes.value),
      "dueDate": "2024-08-15",
      "status": "completed"
    }
    await fetch('http://localhost:3000/tasks', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newTask)
    })
        .catch((error) => {
            console.error('Error:', error);
            alert("An error occurred");
        });
}
// let submitTask = document.getElementById("createTaskForm");
// submitTask.addEventListener("submit", async (e) => {
//     e.preventDefault();

//     let addTaskTitle = document.getElementById("title-add-task");
//     let addTaskDes = document.getElementById("des-add-task");

//     const response0 = await fetch('http://localhost:3000/users');
//     const user0 = await response0.json();
//     user0.forEach(async (user) => {
//         if (user.active) 
//         {   
//             const response2 = await fetch('http://localhost:3000/projects/${}');
//             const project = await response2.json();

//         }
//         })
// })
//add task end 



//add project start  abdallah
let submitProject = document.getElementById("prjectForm");
submitProject.addEventListener("submit", async (e) => {
    e.preventDefault();

    let addProjectTitle = document.getElementById("title-add-projet");
    let addProjectDes = document.getElementById("des-add-projet");

    const response0 = await fetch('http://localhost:3000/users');
    const user0 = await response0.json();

    user0.forEach(async (user) => {
        if (user.active) {
            let newProject =
            {
                "user_id":user.id,
                "active_pro": false,
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
})
//add project end 

//delete project start 
async function deleteProject3(project) {
    // let projectId = project.toString();
    let headersList = {
        "Accept": "*/*",
        "User-Agent": "Thunder Client (https://www.thunderclient.com)"
    }
    
    let response = await fetch(`http://localhost:3000/projects/${project.id}`, { 
        method: "DELETE",
        headers: headersList
    });
    
    let data = await response.text();
    console.log(data);
    
    
}
//delete project end

//delete task stast
async function deleteTask(task) {
    let headersList = {
        "Accept": "*/*",
        "User-Agent": "Thunder Client (https://www.thunderclient.com)"
    }
    
    let response = await fetch(`http://localhost:3000/tasks/${task.id}`, { 
        method: "DELETE",
        headers: headersList
    });
    
    let data = await response.text();
    console.log(data);
    
    
}
//delete task end
