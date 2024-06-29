// move
const signUpButton = document.getElementById('signUp');
const signInButton = document.getElementById('signIn');
const container = document.getElementById('container');

signUpButton.addEventListener('click', () => {
    container.classList.add("right-panel-active");
});

signInButton.addEventListener('click', () => {
    container.classList.remove("right-panel-active");
});

// sign up 
document.addEventListener('DOMContentLoaded', () => {
    let AddUser = document.getElementById("sign-up-form");

    AddUser.addEventListener("submit", (e) => {
        e.preventDefault();

        let emailInput = document.getElementById("email-input-sign-up").value;
        let firstNameInput = document.getElementById("firstName-input-sign-up").value;
        let lastNameInput = document.getElementById("lastName-input-sign-up").value;
        let passwordInput = document.getElementById("password-input-sign-up").value;

        // check email
        let CheckEmail = async function() {
            const response = await fetch(`http://localhost:3000/users/`);
            const data = await response.json();
            let emailExists = data.some(element => element.email === emailInput);
            
            if (emailExists) {
                alert("This email is already used");
                document.getElementById("email-input-sign-up").value=" "; // fix this use the emailInput
               
            } else {
                let newUser = {
                    "active": false,
                    "firstName": firstNameInput,
                    "lastName": lastNameInput,
                    "email": emailInput,
                    "password": passwordInput,
                    "projects": [{"tasks": []}]
                };
                fetch('http://localhost:3000/users/', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(newUser)
                })
                .then(response => {
                    if (response.ok) {
                        alert("User added successfully");
                    } else {
                        alert("Failed to add user");
                    }
                })
                .catch((error) => {
                    console.error('Error:', error);
                    alert("An error occurred");
                });
            }
        }

        CheckEmail();
    });
});


// sign in 
let signUpUser = document.getElementById("Sige-Up-User");

signUpUser.addEventListener("submit", async (e) => {
    e.preventDefault();

    let emailInput = document.getElementById("email-sign-in-input");
    let passwordInput = document.getElementById("password-input-sign-in");
    let errorMessage = document.getElementById("erorr-message");

    try {
        const response = await fetch(`http://localhost:3000/users/`);
        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }
        const data = await response.json();
        let userFound = false;

        for (let element of data) {
            if (String(element.email) === String(emailInput.value) && String(element.password) === String(passwordInput.value)) {
                userFound = true;
                // Update the matched user to active: true
                await fetch(`http://localhost:3000/users/${element.id}/`, {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ active: true })
                });

            } else {
                // Update other users to active: false
                await fetch(`http://localhost:3000/users/${element.id}/`, {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ active: false })
                });
            }
        }
        if (!userFound) {
            alert("Invalid email or password!")
            // errorMessage.innerHTML = `<p>Invalid email or password!</p>`; //try to fix this 
            emailInput.value=""
            passwordInput.value=""
        } else {
            window.location.href = "index.html";
        }

    } catch (error) {
        console.error('Error:', error);
        errorMessage.innerHTML = `<p>Error: ${error.message}</p>`;
    }
});

