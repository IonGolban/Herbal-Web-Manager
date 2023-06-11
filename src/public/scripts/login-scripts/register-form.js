const registerLink = document.querySelector(".link-to-register");
const loginLink = document.querySelector(".link-to-login");
const loginForm = document.querySelector(".right-login-container");
const registerForm = document.querySelector(".right-register-container")
const registerButton = document.querySelector(".register-button");
const loginButton = document.querySelector(".login-button");



function registerHandle() {

    loginForm.style.display = 'none';
    registerForm.style.display = 'flex';

}

function loginHandle() {

    registerForm.style.display = 'none';
    loginForm.style.display = 'flex';

}

function register(event) {

    event.preventDefault();

    const username = document.getElementById("register-username").value;
    const password = document.getElementById("register-password").value;
    const email  = document.getElementById("register-email").value; 
    console.log(username, password,email);
    // if (password !== repeatPassword) {
    //     alert("Passwords don't match!");
    //     return;
    // }

    // fetch("/register", {
    //     method: "POST",
    //     headers: {
    //         "Content-Type": "application/json"
    //     },
    //     body: JSON.stringify({ username, password,email })
    // }).then(res => res.json())
    //     .then(data => {
    //         if (data.error) {
    //             alert(data.error);
    //         } else {
    //             localStorage.setItem("token", data.token);
    //             window.location.href = "/";
    //         }
    //     });

}

function login(event){

        event.preventDefault();
    

        const username = document.getElementById("login-username").value;
        const password = document.getElementById("login-password").value;
        console.log(username, password);
        // fetch("/login", {
        //     method: "POST",
        //     headers: {
        //         "Content-Type": "application/json"
        //     },
        //     body: JSON.stringify({ username, password })
        // }).then(res => res.json())
        //     .then(data => {
        //         if (data.error) {
        //             alert(data.error);
        //         } else {
        //             localStorage.setItem("token", data.token);
        //             window.location.href = "/";
        //         }
        //     });
}

registerLink.addEventListener('click', registerHandle);
loginLink.addEventListener('click', loginHandle);
registerButton.addEventListener('click', register);
loginButton.addEventListener('click', login);

document.addEventListener("DOMContentLoaded", async () => {

    const path = window.location.pathname;

    if (path === "/login") {
        loginHandle();
    } else if (path === "/register") {
        registerHandle();
    }



}

);
