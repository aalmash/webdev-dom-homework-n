import { login, setToken } from "./api.js";
import { renderRegistration } from "./renderRegistration.js";

export const authorizationText = document.querySelector(".autorization-text");

export const renderLogin = ({ fetchAndRenderComments }) => {
    authorizationText.textContent = "";
    const appElement = document.getElementById("app");
    const loginHtml = `
    <div class="login-form add-form">
        <h2>Форма входа</h2>
        <input type="text" class="login-login add-form-text" placeholder="Введите логин">
        <input type="text" class="login-password add-form-text" placeholder="Введите пароль">
        <button id="login-button" class="login-button add-form-button">Войти</button>
        <a href="#" class="link login-link">Зарегистрироваться</a>
    </div>`

    appElement.innerHTML = loginHtml;

    const buttonElement = document.getElementById("login-button");
    const loginInputElement = document.querySelector(".login-login");
    const passwordInputElement = document.querySelector(".login-password");
    const goToLogin = document.querySelector(".link");

    buttonElement.addEventListener("click", () => {
        login({
            login: loginInputElement.value,
            password: passwordInputElement.value,
        }).then((responseData) => {
            setToken(responseData.user.token);
        }).then(() => {
            fetchAndRenderComments();
        })
    });

    goToLogin.addEventListener("click", () => {
        renderRegistration()
    })
};
