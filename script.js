// home page start 
function toggleMenu() {
    const navList = document.getElementById('nav-list');
    navList.style.display = navList.style.display === 'flex' ? 'none' : 'flex';
}

document.addEventListener("DOMContentLoaded", function() {
    var homeLink = document.getElementById("Home");
    var dashboardLink = document.getElementById("Dashboard");

   

    function setActive(link) {
        homeLink.classList.remove("active");
        dashboardLink.classList.remove("active");
        link.classList.add("active");
    }

    homeLink.addEventListener("click", function(event) {
        event.preventDefault();
        setActive(homeLink);
    });

    dashboardLink.addEventListener("click", function(event) {
        event.preventDefault();
        setActive(dashboardLink);
    });

});

// home page end 


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


// display projcets and tasks 
async function getJson() {
    try {
        const response = await fetch('http://localhost:3000/users');
        const data = await response.json();

        data.forEach(user => {
            if (user.active==true) {
                user.projects.forEach(project => {
                    const container = document.getElementsByClassName('content')[0];

                    const projectContainer = document.createElement('div');
                    projectContainer.className = "card";
                    container.appendChild(projectContainer);

                    const cardBody = document.createElement('div');
                    cardBody.className = "card-body";
                    cardBody.innerHTML=`
                        <h3 class="card-title">${project.title}</h3>
                        <p class="card-text">${project.description}</p>`;
                    projectContainer.appendChild(cardBody);
                    

                    if (project.tasks && Array.isArray(project.tasks)) {
                        project.tasks.forEach(task => {
                            const taskContainer = document.createElement('div');
                            taskContainer.className = "tasks";
                            cardBody.appendChild(taskContainer);

                            let cardTasks = document.createElement('div');
                            cardTasks.className = "card-tasks";

                            cardTasks.innerHTML = `
                                <h4 class="card-tasks-title">${task.title}</h4>
                                <p class="card-tasks-text">${task.description} <br/>
                                ${task.dueDate}<br/>
                                ${task.status}</p>
                            `;
                            taskContainer.appendChild(cardTasks);
                        });
                    }
                });
            }
        });
    } catch (error) {
        console.error('Error fetching or parsing data:', error);
    }
}

getJson();

