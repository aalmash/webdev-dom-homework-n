const buttonElement = document.getElementById("add-button");
const listElement = document.getElementById("list");
const nameInputElement = document.getElementById("name-input");
const textInputElement = document.getElementById("text-input");
const deleteButtonElement = document.getElementById("delete-button");
const addForm = document.querySelector(".add-form");
const commentLoadingIndicator = document.querySelector(".comment-loading-indicator");
const commentsLoadingIndicator = document.querySelector(".comments-loading-indicator");
const fetchUrl = "https://wedev-api.sky.pro/api/v1/:almash/comments";

const commentDate = (currentDate) => {
  const plus0 = (el) => {
    if (el < 10) {
      return el = '0' + el;
    } else {
      return el;
    }
  }

  let date = plus0(currentDate.getDate());
  let month = plus0(currentDate.getMonth() + 1);
  let year = plus0(currentDate.getFullYear());
  let hour = plus0(currentDate.getHours());
  let minute = plus0(currentDate.getMinutes());

  return `${date}.${month}.${year} ${hour}:${minute}`;
}
let currentDate = new Date();

const fetchAndRenderComments = () => {
  fetch(fetchUrl, {
    method: "GET"
  })
    .then((response) => {
      return response.json();
    })
    .then((responseData) => {
      const appComments = responseData.comments.map((comment) => {
        return {
          name: comment.author.name,
          date: commentDate(new Date(comment.date)),
          commentText: comment.text,
          likeCounter: comment.likes,
          isLiked: false,
        };

      })
      comments = appComments;
      renderComments();
    })
    .then(() => {
      commentsLoadingIndicator.style.display = "none";
    });
};

let comments = [];

const renderComments = () => {
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

  listElement.innerHTML = commentsHtml;

  initMyLikesListeners();
  reptyToCommentElements();
  handleChanges();
};

const reptyToCommentElements = () => {
  const reptyToCommentElement = document.querySelectorAll(".comment");

  for (const replyToComment of reptyToCommentElement) {
    replyToComment.addEventListener("click", () => {
      const reply = replyToComment.dataset.reply;
      textInputElement.value += `QUOTE_BEGIN ${reply} QUOTE_END \n`
    });
  };
};

initMyLikesListeners = () => {
  const likeButton = document.querySelectorAll(".like-button");

  for (const like of likeButton) {
    like.addEventListener("click", (e) => {
      e.stopPropagation();
      const index = comments[like.dataset.index];
      index.isLiked ? --index.likeCounter : ++index.likeCounter;
      index.isLiked = !index.isLiked;
      renderComments();
    })
  }
};

deleteButtonElement.addEventListener("click", () => {
  comments.pop();
  renderComments();
});

const handleChanges = () => {
  const inputs = document.querySelectorAll(".add-form-input");

  const handleChange = () => {
    for (const input of inputs) {
      if (input.value === "") {
        buttonElement.setAttribute('disabled', '');
        return;
      }
    }
    buttonElement.removeAttribute('disabled');
  };

  for (const input of inputs) {
    input.onkeydown = input.onkeyup = input.onkeypress = input.change = handleChange;
  };
};

commentsLoadingIndicator.style.visibility = "visible";

fetchAndRenderComments();
renderComments();

buttonElement.addEventListener('click', () => {

  nameInputElement.classList.remove("error");
  if (nameInputElement.value === "" || nameInputElement.value.length < 3) {
    nameInputElement.classList.add("error");
    return;
  }
  textInputElement.classList.remove("error");
  if (textInputElement.value === "" || textInputElement.value.length < 3) {
    textInputElement.classList.add("error");
    return;
  }

  addForm.style.display = "none";
  commentLoadingIndicator.style.visibility = "visible";


  fetch(fetchUrl, {
    method: "POST",
    body: JSON.stringify({
      text: textInputElement.value
        .replaceAll('<', '&lt;')
        .replaceAll('>', '&gt;')
        .replaceAll("QUOTE_BEGIN", "<p class='quote'>")
        .replaceAll("QUOTE_END", "</p>"),
      name: nameInputElement.value
        .replaceAll('<', '&lt;')
        .replaceAll('>', '&gt;')
        .replaceAll("QUOTE_BEGIN", "<p class='quote'>")
        .replaceAll("QUOTE_END", "</p>"),
      // forceError: true,
    })
  })
    .then((response) => {
      // if (response.status === 400) {
      //   alert("Имя и комментарий должны быть не короче 3х символов");
      //   throw new Error("Неверный запрос")
      // }
      // if (response.status === 500) {

      //   throw new Error("Сервер упал")
      // }
      // if (response.status === 201) {
      //   return response.json();
      // }
      return response.json();
    })
    .then(() => {
      return fetchAndRenderComments();
    })
    .then(() => {
      addForm.style.display = "flex";
      commentLoadingIndicator.style.display = "none";
      nameInputElement.value = "";
      textInputElement.value = "";
      renderComments();
    })
  // .catch((error) => {

  //   addForm.style.display = "flex";
  //   // commentLoadingIndicator.style.display = "none";
  //   alert("Кажется что-то пошло не так, попробуй позже");
  //   console.warn(error);
  // })


  renderComments();


});

textInputElement.addEventListener('keyup', function (e) {
  if (e.key === 'Enter') {
    buttonElement.click();
  }
});

