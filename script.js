// home page start nav bar

function showSidebar(){
    const sidebar = document.querySelector('.sidebar')
    sidebar.style.display = 'flex'
  }
  function hideSidebar(){
    const sidebar = document.querySelector('.sidebar')
    sidebar.style.display = 'none'
  }

// home nav bar end 

// home page when login user
// display Welcome Message
async function displayWelcomeMessage(userName) {
    try {
        const response = await fetch('http://localhost:3000/users');
        const data = await response.json();

        data.forEach(user => {
            if (user.active == true) {
                
                const h1Tag = document.getElementById('welcome-user'); // Assuming you have an element with id 'name' in your HTML
                h1Tag.textContent = '';
                h1Tag.textContent = `Welcome ${user.firstName} ${user.lastName} to Our Service`;

            }
        })
    } catch {
        console.log(`User with name '${userName}' not found.`);
    }
};
displayWelcomeMessage()



// show and hide login mohammed
async function show(){
    try{
        const response = await fetch('http://localhost:3000/users');
        const data = await response.json();
        data.forEach(users =>{
            if(users.active===true){
                console.log("true")
                document.getElementById("show-login").style.display="none"

            }

        })
    }
    catch {
        console.log(`User with name '${userName}' not found.`);
    }
}
show()
// end mohammed



// display projcets and tasks 
// async function getJson() {
//     try {
//         const response = await fetch('http://localhost:3000/users');
//         const data = await response.json();

//         data.forEach(user => {
//             if (user.active==true) {
//                 user.projects.forEach(project => {
//                     const container = document.getElementsByClassName('content')[0];

//                     const projectContainer = document.createElement('div');
//                     projectContainer.className = "card";
//                     container.appendChild(projectContainer);

//                     const cardBody = document.createElement('div');
//                     cardBody.className = "card-body";
//                     cardBody.innerHTML=`
//                         <h3 class="card-title">${project.title}</h3>
//                         <p class="card-text">${project.description}</p>`;
//                     projectContainer.appendChild(cardBody);
                    

//                     if (project.tasks && Array.isArray(project.tasks)) {
//                         project.tasks.forEach(task => {
//                             const taskContainer = document.createElement('div');
//                             taskContainer.className = "tasks";
//                             cardBody.appendChild(taskContainer);

//                             let cardTasks = document.createElement('div');
//                             cardTasks.className = "card-tasks";

//                             cardTasks.innerHTML = `
//                                 <h4 class="card-tasks-title">${task.title}</h4>
//                                 <p class="card-tasks-text">${task.description} <br/>
//                                 ${task.dueDate}<br/>
//                                 ${task.status}</p>
//                             `;
//                             taskContainer.appendChild(cardTasks);
//                         });
//                     }
//                 });
//             }
//         });
//     } catch (error) {
//         console.error('Error fetching or parsing data:', error);
//     }
// }

// getJson();

