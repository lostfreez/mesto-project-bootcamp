//массив с карточками
const initialCards = [
  {
    name: "Архыз",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
  },
  {
    name: "Челябинская область",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
  },
  {
    name: "Иваново",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
  },
  {
    name: "Камчатка",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
  },
  {
    name: "Холмогорский район",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
  },
  {
    name: "Байкал",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
  },
];
//Константы элементов страницы
const cardContainer = document.querySelector(".photo-grid__list");
const cardFormElement = document.querySelector(".popup_type_card-form");
const cardForm = cardFormElement.querySelector(".popup__form");
//Константы ввода
const inputNamePlace = document.getElementById("newPlace");
const inputUrlPlace = document.getElementById("newUrl");

//template
const cardTemplate = document
  .getElementById("card")
  .content.querySelector(".photo-grid__card");
//функция клонирующая карточки с изменением содержимого из массива
function addCardsDefault() {
  initialCards.forEach(function (item) {
    inputNamePlace.value = item.name;
    inputUrlPlace.value = item.link;
    const cardContent = createCard();
    cardContainer.prepend(cardContent);
  });
}
//функция добавления карточки по введенным данным из формы
function addCard(e) {
  e.preventDefault();
  const cardContent = createCard();
  cardContainer.prepend(cardContent);
  //закрываем форму после добавления карточки
  closePopup();
  //валидируем форму после сброса элементов ввода
  enableValidation();
}
//функция создания карточки
function createCard() {
  const nameValue = inputNamePlace.value;
  const urlValue = inputUrlPlace.value;
  const cardContent = cardTemplate.cloneNode(true);
  cardContent.querySelector(".photo-grid__city").textContent = nameValue;
  cardContent.querySelector(".photo-grid__image").src = urlValue;
  inputNamePlace.value = "";
  inputUrlPlace.value = "";
  //Подключение обработчика событий на открытие попапа карточки
  const buttonOpenImage = cardContent.querySelector(".photo-grid__image");
  buttonOpenImage.addEventListener("click", openPopup);
  //Подключение обработчика событий на кнопку удаления карточек
  const buttonDeleteCard = cardContent.querySelector(".photo-grid__delete");
  buttonDeleteCard.addEventListener("click", deleteCard);
  //Подключение обработчика событий на кнопку постановки лайка
  const buttonLikeCard = cardContent.querySelector(".photo-grid__like");
  buttonLikeCard.addEventListener("click", likeCard);
  //возвращаем созданную карточку
  return cardContent;
}
//функция удаления карточки
function deleteCard(event) {
  event.target.closest(".photo-grid__card").remove();
}
//функция постановки лайка
function likeCard(event) {
  event.target.classList.toggle("photo-grid__like_active");
}
import { enableValidation } from "./validate";
import { closePopup, openPopup } from "./popup";
export { addCardsDefault, addCard };
