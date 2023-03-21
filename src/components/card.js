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
const card = document.getElementById("card");
//функция клонирующая карточки с изменением содержимого из массива
function addCardsDefault() {
  initialCards.forEach(function (item) {
    const cardContent = card.content.cloneNode(true);
    cardContent.querySelector(".photo-grid__image").src = item.link;
    cardContent.querySelector(".photo-grid__city").textContent = item.name;
    cardContainer.prepend(cardContent);
  });
}
//инициализация функциона работы с карточками
function enableCardsFuncs() {
  //Подключение обработчика событий на кнопку удаления карточек
  cardContainer.addEventListener("click", function (event) {
    if (event.target.classList.contains("photo-grid__delete")) {
      deleteCard(event);
    }
  });
  //Подключение обработчика событий на кнопку постановки лайка
  cardContainer.addEventListener("click", function (event) {
    if (event.target.classList.contains("photo-grid__like")) {
      likeCard(event);
    }
  });
  //Подключение обработчика событий на кнопку создать новую карточку
  cardForm.addEventListener("submit", addCard)
}
//функция добавления новой карточки на страницу
function addCard(event) {
  event.preventDefault();
  const nameValue = inputNamePlace.value;
  const urlValue = inputUrlPlace.value;
  const cardContent = card.content.cloneNode(true);
  cardContent.querySelector(".photo-grid__city").textContent = nameValue;
  cardContent.querySelector(".photo-grid__image").src = urlValue;
  cardContainer.prepend(cardContent);
  inputNamePlace.value = "";
  inputUrlPlace.value = "";
  closePopup();
  //валидируем форму после сброса элементов ввода
  enableValidation();
}
//функция удаления карточки
function deleteCard(event) {
  event.target.parentElement.remove();
}
//функция постановки лайка
function likeCard(event) {
  event.target.classList.toggle("photo-grid__like_active");
}
import { enableValidation } from "./validate"
import { closePopup } from "./popup";
export { addCardsDefault, enableCardsFuncs };