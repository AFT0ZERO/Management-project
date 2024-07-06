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


// const firstName = document.getElementById('firstName').value.trim();
// const lastName = document.getElementById('lastName').value.trim();
// const email = document.getElementById('email').value.trim();
// const password = document.getElementById('password').value.trim(); 
const nameRegex = /^[a-zA-Z]+(?:[' -][a-zA-Z]+)*$/;
const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;




// sign up 
document.addEventListener('DOMContentLoaded', () => {
    let AddUser = document.getElementById("sign-up-form");

    AddUser.addEventListener("submit", (e) => {
        e.preventDefault();

        let firstNameInput = document.getElementById("firstName-input-sign-up").value.trim();
        let lastNameInput = document.getElementById("lastName-input-sign-up").value.trim();
        let emailInput = document.getElementById("email-input-sign-up").value.trim();
        let passwordInput = document.getElementById("password-input-sign-up").value.trim();
        
        // Validate inputs
         if (!nameRegex.test(firstNameInput)) {
            // alert("Invalid first name.");
            document.getElementById("firstName-input-sign-up").value="";
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Invalid first name.",
              });
            return;
        }

        if (!nameRegex.test(lastNameInput)) {
           // alert("Invalid last name."); 
           document.getElementById("lastName-input-sign-up").value="";
           Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Invalid last name.",
          });
            return;
        }

        if (!emailRegex.test(emailInput)) {
            // alert("Invalid email address.");
            document.getElementById("email-input-sign-up").value="";
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Invalid email address.",
              });
           
            return;
        }

        if (!passwordRegex.test(passwordInput)) {
            // alert("Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, one number, and one special character.");
            document.getElementById("password-input-sign-up").value="";
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, one number, and one special character.",
              });
             
            return;
        }


        // check email
        let CheckEmail = async function() {
            const response = await fetch(`http://localhost:3000/users/`);
            const data = await response.json();
            let emailExists = data.some(element => element.email === emailInput);
            
            if (emailExists) {
                // alert("This email is already used");
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "This Email is already used!",
                  });
                document.getElementById("email-input-sign-up").value=" "; // fix this use the emailInput
               
            } else {
                let newUser = {
                    "active": false,
                    "firstName": firstNameInput,
                    "lastName": lastNameInput,
                    "email": emailInput,
                    "password": passwordInput
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
                       // alert("User added successfully");
                       Swal.fire({
                        position: "center-center",
                        icon: "success",
                        title: "User Added Successfully",
                        showConfirmButton: false,
                        timer: 1500
                      });
                    } else {
                       // alert("Failed to add user");
                       Swal.fire({
                        icon: "error",
                        title: "Oops...",
                        text: "Failed to add user",
                      });
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

    // if (!emailRegex.test(emailInput)) {
    //     // alert("Invalid email address.");
    //     document.getElementById("email-input-sign-up").value="";
    //     Swal.fire({
    //         icon: "error",
    //         title: "Oops...",
    //         text: "email address is incomplete .",
    //       });
       
    //     return;
    // }

    // if (!passwordRegex.test(passwordInput)) {
    //     // alert("Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, one number, and one special character.");
    //     document.getElementById("password-input-sign-up").value="";
    //     Swal.fire({
    //         icon: "error",
    //         title: "Oops...",
    //         text: "Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, one number, and one special character.",
    //       });
         
    //     return;
    // }

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
          //  alert("Invalid email or password!")
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Invalid Email or Password!",
              });
            // errorMessage.innerHTML = `<p>Invalid email or password!</p>`; //try to fix this 
            emailInput.value=""
            passwordInput.value=""
        } else {
            // document.getElementById("signIn").addEventListener("click", () => {
                function click() {
                    window.location.href = "dashboard.html";
                }
                Swal.fire({
                    title: "Good job!",
                    text: "You clicked the button!",
                    icon: "success"
                  });
                setTimeout(click, 2000)
            }
        // }

    } catch (error) {
        console.error('Error:', error);
        errorMessage.innerHTML = `<p>Error: ${error.message}</p>`;
    }
});

