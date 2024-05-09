import { postComment } from "./api.js";
import { fetchAndRenderComments } from "./main.js"

// const listElement = document.getElementById("list");

export const renderComments = ({ comments, initMyLikesListeners, reptyToCommentElements, handleChanges }) => {
  const appElement = document.getElementById("app");

  const commentsHtml = comments.map((comment, index) => {
    return `<li class="comment" data-reply ="${comment.name}, ${comment.commentText}">
    <div class="comment-header">
      <div>${comment.name}</div>
      <div>${comment.date}</div>
    </div>
    <div class="comment-body">
      <div class="comment-text">
        ${comment.commentText}
      </div>
    </div>
    <div class="comment-footer">
      <div class="likes">
        <span class="likes-counter" >${comment.likeCounter}</span>
        <button data-index="${index}" class="${comment.isLiked ? 'like-button -active-like' : 'like-button'}"></button>
      </div>
    </div>
  </li>`
  }).join('')

  const appHtml = `
    <div class="container">
    <ul id="list" class="comments">
      ${commentsHtml}
    </ul>
    <div class="add-form-row">
      <button id="delete-button" class="add-form-button">Удалить последний комментарий</button>
    </div>
    <div class="add-form" id="add-form">
      <input id="name-input" type="text" class="add-form-name add-form-input" placeholder="Введите ваше имя" />
      <textarea id="text-input" type="textarea" class="add-form-text add-form-input"
        placeholder="Введите ваш коментарий" rows="4"></textarea>
      <div class="add-form-row">
        <button id="add-button" class="add-form-button" disabled>Написать</button>
      </div>
    </div>
    <p class="loading-indicator comment-loading-indicator">Коментарий добавляется...</p>
  </div>`;

  appElement.innerHTML = appHtml;
  const buttonElement = document.getElementById("add-button");


  initMyLikesListeners();
  reptyToCommentElements();
  handleChanges({ buttonElement });

  const nameInputElement = document.getElementById("name-input");
  const textInputElement = document.getElementById("text-input");
  const deleteButtonElement = document.getElementById("delete-button");
  const addForm = document.getElementById("add-form");
  const commentLoadingIndicator = document.querySelector(".comment-loading-indicator");


  

  deleteButtonElement.addEventListener("click", () => {
    comments.pop();
    renderComments({ comments, initMyLikesListeners, reptyToCommentElements, handleChanges });
  });

  buttonElement.addEventListener('click', () => {

    nameInputElement.classList.remove("error");
    textInputElement.classList.remove("error");


    addForm.style.display = "none";
    commentLoadingIndicator.style.visibility = "visible";

    const handlePostClick = () => {
      postComment({
        text: textInputElement.value,
        name: nameInputElement.value
      }).then((response) => {
        if (response.status === 400) {
          if (nameInputElement.value.length < 3) {
            nameInputElement.classList.add("error");
          }
          if (textInputElement.value.length < 3) {
            textInputElement.classList.add("error");
          }
          throw new Error("Неверный запрос")
        }
        if (response.status === 401) {
          throw new Error("Нет авторизации")
        }
        if (response.status === 500) {
          throw new Error("Сервер упал")
        }
        if (response.status === 201) {
          return response.json();
        }
      })
        .then(() => {
          return fetchAndRenderComments();
        })
        .then(() => {
          addForm.style.display = "flex";
          commentLoadingIndicator.style.display = "none";
          nameInputElement.value = "";
          textInputElement.value = "";
          renderComments({ comments, initMyLikesListeners, reptyToCommentElements, handleChanges });
        })
        .catch((error) => {
          console.warn(error);
          if (error.message === "Неверный запрос") {
            alert("Имя и комментарий должны быть не короче 3х символов");
          }
          if (window.navigator.onLine === false) {
            alert("Кажется, у вас сломался интернет, попробуйте позже");
          }
          if (error.message === "Сервер упал") {
            handlePostClick();
          }
          if (error.message = "Нет авторизации") {
            addForm.textContent = "Чтобы добавить комментарий, авторизуйтесь";
          }

          addForm.style.display = "flex";
          commentLoadingIndicator.style.display = "none";
        })

      renderComments({ comments, initMyLikesListeners, reptyToCommentElements, handleChanges });
    };

    handlePostClick();
  });

  textInputElement.addEventListener('keyup', function (e) {
    if (e.key === 'Enter') {
      buttonElement.click();
    }
  });

};