//Константы элементов профиля
const name = document.querySelector(".profile__name");
const job = document.querySelector(".profile__job");
const avatar = document.querySelector(".profile__avatar");

//Функция ux визуально отображающая применение изменений на странице в формах popup
let buffer = "";
function renderLoading(isLoading) {
  const popup = document.querySelector(".popup_opened");
  const button = popup.querySelector(".popup__save");
  if (isLoading) {
    buffer = button.textContent;
    button.textContent = "Сохранение...";
  } else {
    setTimeout(function () {
      button.textContent = buffer;
    }, 500);
  }
}
//Получение данных пользователя
export let userId;
function getDataProfile() {
  getUserRequest()
    .then((response) => {
      userId = response._id;
      insertDataProfile(response);
      displayInputs();
      getDataCards();
    })
    .catch((error) => {
      console.error("Ошибка в функции getDataProfile:", error);
    });
}
//получение данных карточек
function getDataCards() {
  getCardsRequest()
    .then((response) => {
      addCardsFromData(response);
    })
    .catch((error) => {
      console.error("Ошибка в функции getDataProfile:", error);
    });
}
//Встраивание данных пользователя на страницу
function insertDataProfile(response) {
  name.textContent = response.name;
  job.textContent = response.about;
  avatar.src = response.avatar;
}

import { getCardsRequest, getUserRequest } from "./api";
import { addCardsFromData } from "./card";
import { displayInputs } from "./modal";
export { getDataProfile };
export { renderLoading };
