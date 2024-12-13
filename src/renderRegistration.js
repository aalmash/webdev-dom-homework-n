import { registration, setName, setToken } from "./api.js";
import { fetchAndRenderComments } from "./main.js";
import { renderLogin } from "./renderLogin.js";

export const renderRegistration = () => {
    const appElement = document.getElementById("app");
    const registrationHtml = `
    <div class="registration-form add-form">
      <h2>Форма регистрации</h2>
      <input class="registration-name add-form-text" placeholder="Введите имя">
      <input type="text" class="registration-login add-form-text" placeholder="Введите логин">
      <input type="password" class="registration-password add-form-text" placeholder="Введите пароль">
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
        })
            .then((response) => {
                if (response.status === 201) {
                    return response.json();
                }
                if (response.status === 400) {
                    throw new Error("Неверный запрос")
                }
            })
            .then((responseData) => {
                setName(responseData.user.name);
                setToken(responseData.user.token);
                fetchAndRenderComments();
            })
            .catch((error) => {
                console.warn(error);
                if (error.message === "Неверный запрос") {
                    alert("Пользователь с таким логином уже сущетсвует или логин и пароль должны быть не короче 3х символов");
                }
                if (window.navigator.onLine === false) {
                    alert("Кажется, у вас сломался интернет, попробуйте позже");
                }
            });
    })

    goToLogin.addEventListener("click", () => {
        renderLogin({ fetchAndRenderComments });
    })

};