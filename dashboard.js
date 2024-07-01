// add project pop up 
document.getElementById('openFormButton').addEventListener('click', function () {
    document.getElementById('addProjectFormPopup').style.display = 'block';
});

document.getElementById('closeFormButton').addEventListener('click', function () {
    document.getElementById('addProjectFormPopup').style.display = 'none';
});





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
document.addEventListener("click", () => {
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
    // await fetch(`http://localhost:3000/projects/${project.id}`), 
    // {
    //     method: 'PATCH',
    //     headers: {
    //         'Content-Type': 'application/json'
    //     },
    //     body: JSON.stringify( {active_pro:true})
    // }
    console.log(project.id)
    const response2 = await fetch(`http://localhost:3000/tasks?pro_id=${project.id}`);
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
                            <i   class="fa fa-trash" aria-hidden="true"></i>
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



//delete project start abdallah
let deleteProject = document.getElementById("delete-btn");
console.log( document.getElementById("delete-btn"))
deleteProject.addEventListener("click", async (e) => {
    e.preventDefault();
    
    const response = await fetch('http://localhost:3000/users');
    const users = await response.json();
    users.forEach( async (user)=>{
        if(user.active)
            {   
                const response2 = await fetch(`http://localhost:3000/projects?user_id=${user.id}`);
                const projcets = await response2.json();
               projcets.forEach(projcet =>{
                    
               });

                // await fetch(`http://localhost:3000/projects/${}`, {
                //     method: 'DELETE',
                //     headers: {
                //         'Content-Type': 'application/json'
                //     }
                // })
                //     .catch((error) => {
                //         console.error('Error:', error);
                //         alert("An error occurred");
                //     });
            }
    })
    // const response6 = await fetch(`http://localhost:3000/projects?id=${user.id}&&title=${deleteProjectTitle.value}`);
    // const projects = await response6.json();
    //  await fetch(`http://localhost:3000/projects/?title=${deleteProjectTitle.value}`, {
    // await fetch(`http://localhost:3000/projects/${}`, {
    //     method: 'DELETE',
    //     headers: {
    //         'Content-Type': 'application/json'
    //     }
    // })
    //     .catch((error) => {
    //         console.error('Error:', error);
    //         alert("An error occurred");
    //     });

})



//delete project end 




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
