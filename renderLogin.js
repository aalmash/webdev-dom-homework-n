import { login } from "./api.js";

const buttonElement = document.getElementById("login-button");
console.log(buttonElement);
const loginInputElement = document.querySelector(".login-login");
const passwordInputElement = document.querySelector(".login-password");

buttonElement.addEventListener("click", () => {
    login({
        login: loginInputElement.value,
        password: passwordInputElement.value,
    }).then((responseData) => {
        console.log(responseData);
    });
});

