export const settings = {
  form: ".popup__form",
  input: ".popup__edit",
  button: ".popup__save",
  disabled: "popup__save_disabled",
  error: "popup__edit_error",
};
//Константы страницы
export const popupProfile = document.querySelector(".popup_type_profile");
export const popupCard = document.querySelector(".popup_type_card-form");
export const popupImage = document.querySelector(".popup_type_image");
export const popupAvatar = document.querySelector(".popup_type_avatar");
export const popupDelete = document.querySelector(".popup_type_delete");
//Кнопки
const cardCloseButton = popupCard.querySelector(".popup__close");
const profileCloseButton = popupProfile.querySelector(".popup__close");
const cardFormOpenButton = document.querySelector(".profile__button");
const profileEditOpenButton = document.querySelector(".profile__edit");
const avatarCloseButton = popupAvatar.querySelector(".popup__close");
const avatarOpenButton = document.querySelector(".profile__avatar-overlay");
const deleteCloseButton = popupDelete.querySelector(".popup__close");

//Подключаем обработчики на кнопки
deleteCloseButton.addEventListener("click", () => {
closePopup(popupDelete);
});
avatarCloseButton.addEventListener("click", () => {
closePopup(popupAvatar);
});
avatarOpenButton.addEventListener("click", () => {
openPopup(popupAvatar);
});
profileEditOpenButton.addEventListener("click", () => {
openPopup(popupProfile);
});
cardFormOpenButton.addEventListener("click", () => {
openPopup(popupCard);
});
profileCloseButton.addEventListener("click", () => {
closePopup(popupProfile);
});
cardCloseButton.addEventListener("click", () => {
closePopup(popupCard);
});
//Кнопки сохранения формы
popupProfile.addEventListener("submit", saveProfile);
popupCard.addEventListener("submit", addCard);
popupAvatar.addEventListener("submit", updateAvatar);
popupDelete.addEventListener("submit", (e) => {
  deleteCard(e, cardDelete);
});
//Подключение валидации полей
enableValidation(settings);
//загружаем данные профиля
getDataProfile(settings);


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
