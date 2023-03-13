import "../pages/index.css"
//Константы для клонирования карточек
const card = document.querySelector("#card");
const cardPopup = document.querySelector("#popup__card");
//переменные для редактирование профиля
const formEditContain = document.getElementById("editContainer");
const nameInput = document.getElementById("nameInput");
const jobInput = document.getElementById("jobInput");
//переменные для добавления новой карточки
const nameCardInput = document.getElementById("newPlace");
const urlCardInput = document.getElementById("urlPlace");
const formAddCard = document.getElementById("addCard");
const cardPopupContainer = document.getElementById("cardPopupContainer");
const cardContainer = document.querySelector(".photo-grid__list");
//Переменные кнопок popup
const buttonAddCard = document.querySelector(".profile__button");
const buttonOpenProfile = document.querySelector(".profile__edit");
const popup = document.querySelector(".popup");
const profileForm = document.getElementById("profileForm");
const cardForm = document.getElementById("cardForm");
//Обработчик submit для добавления новой карты
formAddCard.addEventListener("submit", addCard);
//Обработчик submit для редактирования профиля
formEditContain.addEventListener("submit", saveProfile);
//Обработчики кнопок popup
document.addEventListener("keydown", function (evt) {
  if (evt.key === "Escape") {
    closePopup();
  }
});
//Обработчик клика закрытия попап по бэкраунду
popup.addEventListener("click", function (evt) {
  if (evt.target.classList.contains("popup")) {
    closePopup();
  }
});
//Обработчик клика закрытия попап по нажатию btn close
popup.addEventListener("click", function (evt) {
  if (evt.target.classList.contains("popup__close")) {
    closePopup();
  }
});
//Обработчик клика открытия формы редактирования профиля
buttonOpenProfile.addEventListener("click", () => {
  openPopup(profileForm);
});
//Обработчик клика открытия формы добавления новой карточки
buttonAddCard.addEventListener("click", () => {
  openPopup(cardForm);
});
//обработчик контейнейра с карточками на открытие попапа с карточкой
cardContainer.addEventListener("click", function (evt) {
  if (evt.target.classList.contains("photo-grid__image")) {
    openPopup(evt);
  }
});
//обработчик контейнейра с карточками на удаление карточек
cardContainer.addEventListener("click", function (evt) {
  if (evt.target.classList.contains("photo-grid__delete")) {
    deleteImage(evt);
  }
});
//слушатель валидации
nameInput.addEventListener("input", () => {
  validateInput(nameInput, formEditContain);
});
jobInput.addEventListener("input", () => {
  validateInput(jobInput, formEditContain);
});
nameCardInput.addEventListener("input", () => {
  validateInput(nameCardInput, formAddCard);
});
urlCardInput.addEventListener("input", () => {
  validateInput(urlCardInput, formAddCard);
});
//обработчик контейнейра с карточками на постановку лайка
cardContainer.addEventListener("click", function (evt) {
  if (evt.target.classList.contains("photo-grid__like")) {
    likeImage(evt);
  }
});
addCardsArray();

import {validateInput} from "./components/validate";
import {likeImage, deleteImage, addCardsArray} from "./components/card";
import {openPopup, closePopup, addCard, saveProfile} from "./components/popup";