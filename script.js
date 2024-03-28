const buttonElement = document.getElementById("add-button");
const listElement = document.getElementById("list");
const nameInputElement = document.getElementById("name-input");
const textInputElement = document.getElementById("text-input");

buttonElement.addEventListener(('click'), () => {
    const oldListElement = listElement.innerHTML;

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
        return;
    }
    textInputElement.classList.remove("error");
    if (textInputElement.value === "") {
        textInputElement.classList.add("error");
        return;
    }

    listElement.innerHTML = oldListElement + `<li class="comment">
    <div class="comment-header">
      <div>${nameInputElement.value}</div>
      <div>${date}.${month}.${year} ${hour}:${minute}</div>
    </div>
    <div class="comment-body">
      <div class="comment-text">
        ${textInputElement.value}
      </div>
    </div>
    <div class="comment-footer">
      <div class="likes">
        <span class="likes-counter"></span>
        <button class="like-button"></button>
      </div>
    </div>
  </li>`

  nameInputElement.value = "";
  textInputElement.value = "";
})