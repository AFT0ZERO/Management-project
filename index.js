//Display an overview of the user's projects and tasks once logged in.
// Each project should have a title and description.

async function getJson() {
    try {
        const response = await fetch('http://localhost:3000/users');
        const data = await response.json();
        
        data.forEach(user => {
            if(user.active==true){
                user.projects.forEach(project => {
                    const Container = document.getElementById('insert');
                    const titleCell = document.createElement('div');
                    titleCell.innerHTML = `
                    <h1>${project.title}</h1>
                    <p>${project.description}
                    `;
                    Container.appendChild(titleCell);
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
    try{
    const response = await fetch('http://localhost:3000/users');
    const data = await response.json();
    
    data.forEach(user => {
        if (user.active==true) {
            const Container = document.getElementById('name'); // Assuming you have an element with id 'name' in your HTML
            const divcontent = document.createElement('div');
            
            divcontent.innerHTML = `
            <h1>Welcome: ${user.firstName} ${user.lastName}</h1>
            `;
            Container.appendChild(divcontent);
        }
    })
}catch {
            console.log(`User with name '${userName}' not found.`);
        }
    };

displayWelcomeMessage()