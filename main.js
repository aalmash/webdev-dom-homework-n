import { getComments, postComment } from "./api.js";
import { renderComments } from "./renderComments.js";

const buttonElement = document.getElementById("add-button");
const nameInputElement = document.getElementById("name-input");
const textInputElement = document.getElementById("text-input");
const deleteButtonElement = document.getElementById("delete-button");
const addForm = document.querySelector(".add-form");
const commentLoadingIndicator = document.querySelector(".comment-loading-indicator");
const commentsLoadingIndicator = document.querySelector(".comments-loading-indicator");

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
    getComments().then((responseData) => {
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
        renderComments({comments, initMyLikesListeners, reptyToCommentElements, handleChanges});
    })
        .then(() => {
            commentsLoadingIndicator.style.display = "none";
        });
};

let comments = [];

const reptyToCommentElements = () => {
    const reptyToCommentElement = document.querySelectorAll(".comment");

    for (const replyToComment of reptyToCommentElement) {
        replyToComment.addEventListener("click", () => {
            const reply = replyToComment.dataset.reply;
            textInputElement.value += `QUOTE_BEGIN ${reply} QUOTE_END \n`
        });
    };
};

const initMyLikesListeners = () => {
    const likeButton = document.querySelectorAll(".like-button");

    for (const like of likeButton) {
        like.addEventListener("click", (e) => {
            e.stopPropagation();
            const index = comments[like.dataset.index];
            index.isLiked ? --index.likeCounter : ++index.likeCounter;
            index.isLiked = !index.isLiked;
            renderComments({comments, initMyLikesListeners, reptyToCommentElements, handleChanges});
        })
    }
};

deleteButtonElement.addEventListener("click", () => {
    comments.pop();
    renderComments({comments, initMyLikesListeners, reptyToCommentElements, handleChanges});
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
                renderComments({comments, initMyLikesListeners, reptyToCommentElements, handleChanges});
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

                addForm.style.display = "flex";
                commentLoadingIndicator.style.display = "none";
            })

        renderComments({comments, initMyLikesListeners, reptyToCommentElements, handleChanges});
    };

    handlePostClick();
});

textInputElement.addEventListener('keyup', function (e) {
    if (e.key === 'Enter') {
        buttonElement.click();
    }
});

export const sanitizeHtml = (htmlString) => {
    return htmlString
        .replaceAll('<', '&lt;')
        .replaceAll('>', '&gt;')
        .replaceAll("QUOTE_BEGIN", "<p class='quote'>")
        .replaceAll("QUOTE_END", "</p>")
};

commentsLoadingIndicator.style.visibility = "visible";

fetchAndRenderComments();
renderComments({comments, initMyLikesListeners, reptyToCommentElements, handleChanges});
