import { sanitizeHtml } from "./main.js";

const fetchUrl = "https://wedev-api.sky.pro/api/v2/:almash/comments";
const loginUrl = "https://wedev-api.sky.pro/api/user/login";
const registrationUrl = "https://wedev-api.sky.pro/api/user";
let commentsLoadingIndicator = document.querySelector(".loading-text")

export let token;
export const setToken = (newToken) => {
  token = newToken;
};

export let name;
export const setName = (newName) => {
  name = newName;
};

export function getComments() {
  commentsLoadingIndicator.textContent = "Пожалуйта подождите, загружаю комментарии...";
  return fetch(fetchUrl, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    }
  })
  .then((response) => {
    return response.json();
  })
  .then((response) => {
    commentsLoadingIndicator.textContent = "";
    return response;
  })
};

export function postComment({ text, name }) {
  return fetch(fetchUrl, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      text: sanitizeHtml(text),
      name: sanitizeHtml(name),
      // forceError: true,
    })
  })

}

export function login({ login, password }) {
  return fetch(loginUrl, {
    method: "POST",
    body: JSON.stringify({
      login,
      password,
    })
  })
}

export function registration({ login, name, password }) {
  return fetch(registrationUrl, {
    method: "POST",
    body: JSON.stringify({
      login,
      name,
      password,
    })
  })
}