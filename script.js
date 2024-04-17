const buttonElement = document.getElementById("add-button");
const listElement = document.getElementById("list");
const nameInputElement = document.getElementById("name-input");
const textInputElement = document.getElementById("text-input");
const deleteButtonElement = document.getElementById("delete-button");



const comments = [
  {
    name: "Глеб Фокин",
    date: "12.02.22 12:18",
    commentText: "Это будет первый комментарий на этой странице",
    likeCounter: "3",
    isLiked: false,
    //isEdit: false,
  },
  {
    name: "Варвара Н.",
    date: "13.02.22 19:22",
    commentText: "Мне нравится как оформлена эта страница! ❤",
    likeCounter: "75",
    isLiked: true,
    //isEdit: false,
  }
];

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
    <!-- <div class="add-form-row">
      <button data-index="${index}" class="edit-button" >Редактировать</button>
    </div> -->
  </li>`
  }).join('')
    .replace("<p class='quote'>", "")
    .replace("</p>", "");

  listElement.innerHTML = commentsHtml;

  initMyLikesListeners();
  reptyToCommentElements();
  handleChanges();
  //deleteButtonElement();
  //editCommentElements();
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

// const editCommentElements = () => {

//   for (const editComment of document.querySelectorAll(".edit-button")) {
//     editComment.addEventListener("click", (e) => {
//       e.stopPropagation();
//       const index = comments[editComment.dataset.index];
//       console.log(index);
//       renderComments()
//     })
//   }
// }

renderComments();

buttonElement.addEventListener('click', (timeOfComment) => {

  const plus0 = (el) => {
    if (el < 10) {
      return el = '0' + el;
    } else {
      return el;
    }
  }

  let currentDate = new Date();
  let date = plus0(currentDate.getDate());
  let month = plus0(currentDate.getMonth() + 1);
  let year = plus0(currentDate.getFullYear());
  let hour = plus0(currentDate.getHours());
  let minute = plus0(currentDate.getMinutes());
 
  nameInputElement.classList.remove("error");
  if (nameInputElement.value === "") {
    nameInputElement.classList.add("error");
    //buttonElement.disabled = true;
    return;
  }
  textInputElement.classList.remove("error");
  if (textInputElement.value === "") {
    textInputElement.classList.add("error");
    //buttonElement.disabled = true;
    return;
  }

  comments.push({
    name: nameInputElement.value
      .replaceAll('<', '&lt;')
      .replaceAll('>', '&gt;')
      .replaceAll("QUOTE_BEGIN", "<p class='quote'>")
      .replaceAll("QUOTE_END", "</p>"),
    date: `${date}.${month}.${year} ${hour}:${minute}`,
    commentText: textInputElement.value
      .replaceAll('<', '&lt;')
      .replaceAll('>', '&gt;')
      .replaceAll("QUOTE_BEGIN", "<p class='quote'>")
      .replaceAll("QUOTE_END", "</p>"),
    likeCounter: 0,
    isLiked: false,
  })

  renderComments();

  nameInputElement.value = "";
  textInputElement.value = "";
});

textInputElement.addEventListener('keyup', function (e) {
  if (e.key === 'Enter') {
    buttonElement.click();
  }
});