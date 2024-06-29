//Display an overview of the user's projects and tasks once logged in.
// Each project should have a title and description.
// async function getJson() {
//     try {
//         const response = await fetch('http://localhost:3000/users');
//         const data = await response.json();

//         data.forEach(user => {
//             if (user.active == true) {
//                 user.projects.forEach(project => {
//                     const Container = document.getElementById('insert');
//                     const divcontaner = document.createElement('div');
//                     const maintaskcontaner =document.getElementById("tasks")
//                     const taskcontaner = document.createElement('div')
//                     divcontaner.className = "project-title-description";
//                     taskcontaner.className = "user-tasks"
//                     taskcontaner.innerHTML = `
//                     <h2>${project.tasks.title}</h2>
//                     <p>${project.tasks.description} <br/>
//                     ${project.tasks.dueDate}<br/>
//                     ${project.tasks.status}</p>
//                     `;
//                     divcontaner.innerHTML = `
//                     <h1>${project.title}</h1>
//                     <p>${project.description}</p>
//                     `;
//                     Container.appendChild(divcontaner);
//                     divcontaner.appendChild(taskcontaner);
//                     taskcontaner.appendChild(maintaskcontaner);
//                 });
//             }
//         });
//     } catch (error) {
//         console.error('Error fetching or parsing data:', error);
//     }
// }
// getJson();















async function getJson() {
    try {
        const response = await fetch('http://localhost:3000/users');
        const data = await response.json();

        data.forEach(user => {
            if (user.active==true) {
                user.projects.forEach(project => {
                    const container = document.getElementById('insert');
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
                            `;
                            projectContainer.appendChild(taskContainer);
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


// display Welcome Message
async function displayWelcomeMessage(userName) {
    try {
        const response = await fetch('http://localhost:3000/users');
        const data = await response.json();

        data.forEach(user => {
            if (user.active == true) {
                const Container = document.getElementById('name'); // Assuming you have an element with id 'name' in your HTML
                const divcontent = document.createElement('div');

                divcontent.innerHTML = `
            <h1>Welcome: ${user.firstName} ${user.lastName}</h1>
            `;
                Container.appendChild(divcontent);
            }
        })
    } catch {
        console.log(`User with name '${userName}' not found.`);
    }
};

displayWelcomeMessage()