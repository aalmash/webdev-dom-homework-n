import { registration, setToken } from "./api.js";
import { fetchAndRenderComments } from "./main.js";
import { authorizationText, renderLogin } from "./renderLogin.js";

export const renderRegistration = () => {
    authorizationText.textContent = "";
    const appElement = document.getElementById("app");
    const registrationHtml = `
    <div class="registration-form add-form">
      <h2>Форма регистрации</h2>
      <input class="registration-name add-form-text" placeholder="Введите имя">
      <input type="text" class="registration-login add-form-text" placeholder="Введите логин">
      <input type="text" class="registration-password add-form-text" placeholder="Введите пароль">
      <button class="registration-button add-form-button">Зарегистрироваться</button>
      <a href="#" class="link registration-link">Войти</a>
    </div>`;

    appElement.innerHTML = registrationHtml;

    const regbuttonElement = document.querySelector(".registration-button");
    const regLoginInputElement = document.querySelector(".registration-login");
    const regNameInputElement = document.querySelector(".registration-login");
    const regPasswordInputElement = document.querySelector(".registration-password");
    const goToLogin = document.querySelector(".link");

    regbuttonElement.addEventListener("click", () => {
        registration({
            login: regLoginInputElement.value,
            name: regNameInputElement.value,
            password: regPasswordInputElement.value,
        }).then((responseData) => {
            setToken(responseData.user.token);
        }).then(() => {
            fetchAndRenderComments();
        })
    })

    goToLogin.addEventListener("click", () => {
        renderLogin({ fetchAndRenderComments });
    })

};