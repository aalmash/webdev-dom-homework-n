import { sanitizeHtml } from "./main.js";

const fetchUrl = "https://wedev-api.sky.pro/api/v1/:almash/comments";

export function getComments() {
     return fetch(fetchUrl, {
        method: "GET"
      })
        .then((response) => {
          return response.json();
        })
};

export function postComment({ text, name }) {
     return fetch(fetchUrl, {
        method: "POST",
        body: JSON.stringify({
          text: sanitizeHtml(text),
          name: sanitizeHtml(name),
          forceError: true,
        })
      })
        
}