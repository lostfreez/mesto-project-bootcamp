//Константы элементов страницы
const cardContainer = document.querySelector(".photo-grid__list");
const cardPopup = document.querySelector(".popup_type_image");
const card = document.querySelector(".popup_type_card-form");
const popupDelete = document.querySelector(".popup_type_delete");
//Константы ввода
const inputNamePlace = document.getElementById("place-input");
const inputUrlPlace = document.getElementById("url-input");
//Константы карточки
const displayPlace = cardPopup.querySelector(".popup__place-name");
const displayImage = cardPopup.querySelector(".popup__image");
//template
const cardTemplate = document
  .getElementById("card")
  .content.querySelector(".photo-grid__card");

//Функция обрабатывающая массив с карточками подруженный с сервера
function addCardsFromData(response) {
  response.forEach(function (item) {
    const cardContent = createCard(item);
    cardContainer.prepend(cardContent);
  });
}
//функция добавления карточки по введенным данным из формы
function addCard(e) {
  e.preventDefault();
  renderLoading(true);
  createCardRequest(inputNamePlace, inputUrlPlace)
    .then((response) => {
      inputNamePlace.value = "";
      inputUrlPlace.value = "";
      const cardContent = createCard(response);
      cardContainer.prepend(cardContent);
      renderLoading(false);
      closePopup(card);
      validateForm(card);
    })
    .catch((error) => {
      renderLoading(false);
      console.error("Ошибка запроса:", error);
    });
}
//функция создания карточки
function createCard(response) {
  const cardContent = cardTemplate.cloneNode(true);
  if (typeof response === "object" && response.hasOwnProperty("likes")) {
    cardContent.querySelector(".photo-grid__likes").textContent =
      response.likes.length;
  }
  if (response.owner._id !== userId) {
    cardContent.querySelector(".photo-grid__delete").remove();
  }
  hasLike(response, cardContent);
  cardContent.setAttribute("data-id", response._id);
  cardContent.querySelector(".photo-grid__city").textContent = response.name;
  cardContent.querySelector(".photo-grid__image").src = response.link;
  //Подключение обработчика событий на открытие попапа карточки
  const buttonOpenImage = cardContent.querySelector(".photo-grid__image");
  buttonOpenImage.addEventListener("click", openImage);
  //Подключение обработчика событий на кнопку удаления карточек
  if (cardContent.querySelector(".photo-grid__delete")) {
    const buttonDeleteCard = cardContent.querySelector(".photo-grid__delete");
    buttonDeleteCard.addEventListener("click", openDeletePopup);
  }
  //возвращаем созданную карточку
  return cardContent;
}
//буфер памяти для внесения данных об удаляемой карточке
let cardDelete = "";
//функция загрузки удаляемой карточки в буфер для последующего удаления
function openDeletePopup(event) {
  cardDelete = event.target
    .closest(".photo-grid__card")
    .getAttribute("data-id");
  openPopup(popupDelete);
}
//Функция подтверждающая удаление карточки пользователем
function confirmDeletion(e) {
  e.preventDefault();
  deleteCard(cardDelete);
  closePopup(popupDelete);
}

//Функция открытия изображения
function openImage(evt) {
  const image = evt.target;
  const card = image.closest(".photo-grid__card");
  const place = card.querySelector(".photo-grid__city");
  displayPlace.textContent = place.textContent;
  displayImage.src = image.src;
  openPopup(cardPopup);
}

//функция удаления карточки
function deleteCard(cardDelete) {
  deleteRequest(cardDelete)
    .then(() => {
      document.querySelector(`[data-id="${cardDelete}"]`).remove();
    })
    .catch((error) => {
      console.error("Ошибка в функции deleteCard:", error);
    });
}
//функция проверки лайка
function hasLike(response, cardContent) {
  const buttonLikeCard = cardContent.querySelector(".photo-grid__like");
  const hasUserLike = response.likes.find(function (item) {
    return item._id === userId;
  });
  if (hasUserLike) {
    buttonLikeCard.classList.add("photo-grid__like_active");
    buttonLikeCard.addEventListener("click", dislikeCard);
  } else {
    buttonLikeCard.addEventListener("click", likeCard);
  }
}
//функция постановки лайка
function likeCard(event) {
  const card = event.target.closest(".photo-grid__card");
  const id = card.getAttribute("data-id");
  const likes = card.querySelector(".photo-grid__likes");
  likeRequest(id)
    .then((response) => {
      event.target.removeEventListener("click", likeCard);
      event.target.classList.add("photo-grid__like_active");
      likes.textContent = response.likes.length;
      event.target.addEventListener("click", dislikeCard);
    })
    .catch((error) => {
      console.error("Ошибка в функции likeCard:", error);
    });
}
//функция удаления лайка
function dislikeCard(event) {
  const card = event.target.closest(".photo-grid__card");
  const id = card.getAttribute("data-id");
  const likes = card.querySelector(".photo-grid__likes");
  dislikeRequest(id)
    .then((response) => {
      event.target.removeEventListener("click", dislikeCard);
      event.target.classList.remove("photo-grid__like_active");
      likes.textContent = response.likes.length;
      event.target.addEventListener("click", likeCard);
    })
    .catch((error) => {
      console.error("Ошибка в функции dislikeCard:", error);
    });
}

import {
  dislikeRequest,
  likeRequest,
  deleteRequest,
  createCardRequest,
} from "./api";
import { renderLoading } from "./utils";
import { validateForm } from "./validate";
import { closePopup, openPopup } from "./modal";
import { userId } from "./utils";
export { addCard, addCardsFromData, confirmDeletion };
