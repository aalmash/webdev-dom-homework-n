import { sanitizeHtml } from "./main.js";

const fetchUrl = "https://wedev-api.sky.pro/api/v2/:almash/comments";
const userUrl = "https://wedev-api.sky.pro/api/user/login";

let token;

export function getComments() {
  return fetch(fetchUrl, {
    method: "GET",
    headers: {
      Authorization: token,
    }
  })
};

export function postComment({ text, name }) {
  return fetch(fetchUrl, {
    method: "POST",
    headers: {
      Authorization: token,
    },
    body: JSON.stringify({
      text: sanitizeHtml(text),
      name: sanitizeHtml(name),
      // forceError: true,
    })
  })

}

export function login({ login, password }) {
  return fetch(userUrl, {
    method: "POST",
    body: JSON.stringify({
      login,
      password,
    })
  }).then((response) => {
    return response.json();
  });
}

// const buttonElement = document.getElementById("login-button");
// const loginInputElement = document.querySelector(".login-login");
// const passwordInputElement = document.querySelector(".login-password");

// buttonElement.addEventListener("click", () => {
//     login({
//         login: loginInputElement.value,
//         password: passwordInputElement.value,
//     }).then((responseData) => {
//         console.log(responseData);
//     });
// });