const listElement = document.getElementById("list");

export const renderComments = ({comments, initMyLikesListeners, reptyToCommentElements, handleChanges}) => {
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