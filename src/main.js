import { getComments } from "./api.js";
import { renderComments } from "./renderComments.js";
import { format } from "date-fns";
// const createDate = format(new Date())

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

export const fetchAndRenderComments = () => {
    getComments()
        .then((responseData) => {
            const appComments = responseData.comments.map((comment) => {
                return {
                    name: comment.author.name,
                    date: format(new Date(comment.date), "yyyy-MM-dd hh.mm.ss"),
                    commentText: comment.text,
                    likeCounter: comment.likes,
                    isLiked: false,
                };

            })
            comments = appComments;
            renderComments({ comments, initMyLikesListeners, reptyToCommentElements, handleChanges });
        });
};

let comments = [];
fetchAndRenderComments();

const reptyToCommentElements = ({ textInputElement }) => {
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
            renderComments({ comments, initMyLikesListeners, reptyToCommentElements, handleChanges });
        })
    }
};

const handleChanges = ({ buttonElement }) => {
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

export const sanitizeHtml = (htmlString) => {
    return htmlString
        .replaceAll('<', '&lt;')
        .replaceAll('>', '&gt;')
        .replaceAll("QUOTE_BEGIN", "<p class='quote'>")
        .replaceAll("QUOTE_END", "</p>")
};