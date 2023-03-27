//Функция ux визуально отображающая применение изменений на странице в формах popup
function renderLoading(event, isLoading, buttonText, loadingText) {
  const button = event.target.querySelector(".popup__save");
  if (isLoading) {
    button.textContent = loadingText;
  } else {
    setTimeout(function () {
      button.textContent = buttonText;
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
      fillProfileInputs();
      validateForm(popupProfile, settings);
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
  displayName.textContent = response.name;
  displayJob.textContent = response.about;
  profileAvatar.src = response.avatar;
}

import { popupProfile, settings } from "../index";
import { validateForm } from "./validate";
import { getCardsRequest, getUserRequest } from "./api";
import { addCardsFromData } from "./card";
import { fillProfileInputs, displayName, displayJob, profileAvatar } from "./modal";
export { getDataProfile };
export { renderLoading };
