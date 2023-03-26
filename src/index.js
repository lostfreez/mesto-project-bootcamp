//Константы страницы
export const profile = document.querySelector(".popup_type_profile");
export const card = document.querySelector(".popup_type_card-form");
export const imagePopup = document.querySelector(".popup_type_image");
export const displayPlace = imagePopup.querySelector(".popup__place-name");
export const displayImage = imagePopup.querySelector(".popup__image");
export const popupAvatar = document.querySelector(".popup_type_avatar");
export const popupDelete = document.querySelector(".popup_type_delete");
//Кнопки
const buttonCloseProfile = profile.querySelector(".popup__close");
const buttonCloseCard = card.querySelector(".popup__close");
const buttonOpenProfile = document.querySelector(".profile__edit");
const buttonOpenCardForm = document.querySelector(".profile__button");
const buttonClosePopupImage = imagePopup.querySelector(".popup__close");
const buttonAvatarOpen = document.querySelector(".profile__avatar-overlay");
const buttonAvatarClose = popupAvatar.querySelector(".popup__close");
const buttonCloseDelete = popupDelete.querySelector(".popup__close");

//Подключаем обработчики на кнопки
buttonCloseDelete.addEventListener("click", () => {
  closePopup(popupDelete);
});
buttonAvatarClose.addEventListener("click", () => {
  closePopup(popupAvatar);
});
buttonAvatarOpen.addEventListener("click", () => {
  openPopup(popupAvatar);
});
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
profile.addEventListener("submit", saveProfile);
card.addEventListener("submit", addCard);
popupAvatar.addEventListener("submit", updateAvatar);
popupDelete.addEventListener("submit", (e) => {
  deleteCard(e, cardDelete);
});
//Подключение валидации полей
enableValidation();
//загружаем данные профиля
getDataProfile();


import "./pages/index.css";
import { addCard, deleteCard, cardDelete } from "./components/card";
import {
  updateAvatar,
  saveProfile,
  openPopup,
  closePopup,
} from "./components/modal";
import { enableValidation } from "./components/validate";
import { getDataProfile } from "./components/utils";
