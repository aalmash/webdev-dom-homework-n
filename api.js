import { sanitizeHtml } from "./main.js";

const fetchUrl = "https://wedev-api.sky.pro/api/v2/:almash/comments";
const userUrl = "https://wedev-api.sky.pro/api/user/login";
let commentsLoadingIndicator = document.querySelector(".loading-text")

export let token;

export const setToken = (newToken) => {
  token = newToken;
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

export function registration({ login, name, password }) {
  return fetch(userUrl, {
    method: "POST",
    body: JSON.stringify({
      login,
      name,
      password,
    })
  }).then((response) => {
    return response.json();
  });
}