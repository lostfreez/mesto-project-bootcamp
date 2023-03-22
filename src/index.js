//Константы страницы
const profile = document.querySelector(".popup_type_profile");
const card = document.querySelector(".popup_type_card-form");
const cardPopup = document.querySelector(".popup_type_image");
//Кнопки
const buttonAddCard = card.querySelector(".popup__save");
const buttonSaveProfile = profile.querySelector(".popup__save");
const buttonCloseProfile = profile.querySelector(".popup__close");
const buttonCloseCard = card.querySelector(".popup__close");
const buttonOpenProfile = document.querySelector(".profile__edit");
const buttonOpenCardForm = document.querySelector(".profile__button");
const buttonClosePopupImage = cardPopup.querySelector(".popup__close");
//Подключаем обработчики на кнопки
buttonOpenProfile.addEventListener("click", () => {
  openPopup(profile);
});
buttonOpenCardForm.addEventListener("click", () => {
  openPopup(card);
});
buttonCloseProfile.addEventListener("click", () => {
  closePopup();
});
buttonCloseCard.addEventListener("click", () => {
  closePopup();
});
buttonClosePopupImage.addEventListener("click", () => {
  closePopup();
});
//Кнопки сохранения формы
buttonSaveProfile.addEventListener("click", saveProfile);
buttonAddCard.addEventListener("click", addCard);

//Подключаем кнопки модальных окон и форм
enableButtons();
//загружаем на страницу стандартный набор карточек
addCardsDefault();
//Подгружаем данные профиля в поля ввода
displayInputs();
//Подключение валидации полей
enableValidation();


import "./pages/index.css";
import { addCardsDefault, addCard } from "./components/card";
import { enableButtons, displayInputs, saveProfile, openPopup, closePopup} from "./components/modal";
import { enableValidation } from "./components/validate";
