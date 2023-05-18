const registerLink = document.querySelector(".link-to-register");
const loginLink = document.querySelector(".link-to-login");
const loginForm = document.querySelector(".right-login-container");
const registerForm = document.querySelector(".right-register-container")


function registerHandle() {

    loginForm.style.display = 'none';
    registerForm.style.display = 'flex';

}

function loginHandle() {

    registerForm.style.display = 'none';
    loginForm.style.display = 'flex';

}

registerLink.addEventListener('click', registerHandle);
loginLink.addEventListener('click', loginHandle);
