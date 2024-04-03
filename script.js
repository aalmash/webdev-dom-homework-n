const buttonElement = document.getElementById("add-button");
const listElement = document.getElementById("list");
const nameInputElement = document.getElementById("name-input");
const textInputElement = document.getElementById("text-input");
const inputs = document.querySelectorAll(".add-form-input");
//const deleteButtonElement = document.getElementById("delete-button");

const comments = [
  {
    name: "Глеб Фокин",
    date: "12.02.22 12:18",
    commentText: "Это будет первый комментарий на этой странице",
    likeCounter: "3",
    isLiked: false,
  },
  {
    name: "Варвара Н.",
    date: "13.02.22 19:22",
    commentText: "Мне нравится как оформлена эта страница! ❤",
    likeCounter: "75",
    isLiked: true
  }
];

initMyLikesListeners = () => {
  const likeButton = document.querySelectorAll(".like-button");

  for (const like of likeButton) {
    like.addEventListener("click", () => {
      const index = comments[like.dataset.index];
      index.isLiked ? --index.likeCounter : ++index.likeCounter;
      index.isLiked = !index.isLiked;
      renderComments();
    })
  }
}

const renderComments = () => {
  const commentsHtml = comments.map((comment, index) => {
    return `<li class="comment">
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
  }).join('');

  listElement.innerHTML = commentsHtml;

initMyLikesListeners();
};

renderComments();

textInputElement.addEventListener('keyup', function (e) {
  if (e.key === 'Enter') {
    buttonElement.click();
  }
});

const handleChange = () => {
	for	(const input of inputs) {
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


buttonElement.addEventListener('click', () => {

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
    name: nameInputElement.value,
    date: `${date}.${month}.${year} ${hour}:${minute}`,
    commentText: textInputElement.value,
    likeCounter: 0,
    isLiked: false,
  })

  renderComments();

  nameInputElement.value = "";
  textInputElement.value = "";
})


//deleteButtonElement.addEventListener(('click'), () => {})