import { login, setName, setToken } from "./api.js";
import { renderRegistration } from "./renderRegistration.js";


export const renderLogin = ({ fetchAndRenderComments }) => {
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
            }).then(() => {
                fetchAndRenderComments();
            })
            .catch((error) => {
                console.warn(error);
                if (error.message === "Неверный запрос") {
                    alert("Неверный логин или пароль");
                }
                if (window.navigator.onLine === false) {
                    alert("Кажется, у вас сломался интернет, попробуйте позже");
                }
            });
    });

    goToLogin.addEventListener("click", () => {
        renderRegistration()
    })
};
