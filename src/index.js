//Константы страницы
const profile = document.querySelector(".popup_type_profile");
const card = document.querySelector(".popup_type_card-form");
const imagePopup = document.querySelector(".popup_type_image");
//Кнопки
const buttonAddCard = card.querySelector(".popup__save");
const buttonSaveProfile = profile.querySelector(".popup__save");
const buttonCloseProfile = profile.querySelector(".popup__close");
const buttonCloseCard = card.querySelector(".popup__close");
const buttonOpenProfile = document.querySelector(".profile__edit");
const buttonOpenCardForm = document.querySelector(".profile__button");
const buttonClosePopupImage = imagePopup.querySelector(".popup__close");
//Подключаем обработчики на кнопки
buttonOpenProfile.addEventListener("click", () => {
  openPopup(profile);
});
buttonOpenCardForm.addEventListener("click", () => {
  openPopup(card);
});
buttonCloseProfile.addEventListener("click", () => {
  closePopup(profile);
});
buttonCloseCard.addEventListener("click", () => {
  closePopup(card);
});
buttonClosePopupImage.addEventListener("click", () => {
  closePopup(imagePopup);
});
//Кнопки сохранения формы
buttonSaveProfile.addEventListener("click", saveProfile);
buttonAddCard.addEventListener("click", addCard);

//Подключаем слушатели на закрытие модальных окон по клику на фон
enableBackgroundClose();
//загружаем на страницу стандартный набор карточек
//addCardsDefault(); //изабавляемся от старого способа загрузки карточек
//Подключение валидации полей
enableValidation();


import "./pages/index.css";
import { addCardsDefault, addCard } from "./components/card";
import { enableBackgroundClose, displayInputs, saveProfile, openPopup, closePopup} from "./components/modal";
import { enableValidation } from "./components/validate";
import {getDataProfile, getDataCards} from "./components/api"

getDataProfile();
getDataCards();