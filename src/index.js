//Константы страницы
const profile = document.querySelector(".popup_type_profile");
const card = document.querySelector(".popup_type_card-form");
const imagePopup = document.querySelector(".popup_type_image");
const popupAvatar = document.querySelector(".popup_type_avatar");
const popupDelete = document.querySelector(".popup_type_delete");
//Кнопки
const buttonUpdateAvatar = popupAvatar.querySelector(".popup__save");
const buttonAddCard = card.querySelector(".popup__save");
const buttonSaveProfile = profile.querySelector(".popup__save");
const buttonCloseProfile = profile.querySelector(".popup__close");
const buttonCloseCard = card.querySelector(".popup__close");
const buttonOpenProfile = document.querySelector(".profile__edit");
const buttonOpenCardForm = document.querySelector(".profile__button");
const buttonClosePopupImage = imagePopup.querySelector(".popup__close");
const buttonAvatarOpen = document.querySelector(".profile__avatar-overlay");
const buttonAvatarClose = popupAvatar.querySelector(".popup__close");
const buttonCloseDelete = popupDelete.querySelector(".popup__close");
const ButtonDeleteSubmit = popupDelete.querySelector(".popup__save");

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
buttonSaveProfile.addEventListener("click", saveProfile);
buttonAddCard.addEventListener("click", addCard);
buttonUpdateAvatar.addEventListener("click", updateAvatar);
ButtonDeleteSubmit.addEventListener("click", confirmDeletion);

//Подключение валидации полей
enableValidation();
//загружаем данные профиля
getDataProfile();

import "./pages/index.css";
import { addCard, confirmDeletion } from "./components/card";
import {
  updateAvatar,
  saveProfile,
  openPopup,
  closePopup,
} from "./components/modal";
import { enableValidation } from "./components/validate";
import { getDataProfile } from "./components/api";
