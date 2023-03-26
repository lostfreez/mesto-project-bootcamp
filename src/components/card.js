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
  renderLoading(e, true, "Создать", "Cохранение...");
  createCardRequest(inputNamePlace, inputUrlPlace)
    .then((response) => {
      e.target.reset();
      const cardContent = createCard(response);
      cardContainer.prepend(cardContent);
      renderLoading(e, false, "Создать", "Cохранение...");
      validateForm(card);
      closePopup(card);
    })
    .catch((error) => {
      renderLoading(e, false, "Создать", "Cохранение...");
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
  const imgElement = cardContent.querySelector(".photo-grid__image");
  const altText = imgElement.getAttribute("alt");
  const newAltText = `${altText} ${response.name}`;
  imgElement.setAttribute("alt", newAltText);
  cardContent.setAttribute("data-id", response._id);
  cardContent.querySelector(".photo-grid__city").textContent = response.name;
  cardContent.querySelector(".photo-grid__image").src = response.link;
  //Подключение обработчика событий на открытие попапа карточки
  const buttonOpenImage = cardContent.querySelector(".photo-grid__image");
  buttonOpenImage.addEventListener("click", openImage);
  //Подключение обработчика событий на кнопку удаления карточек
  if (cardContent.querySelector(".photo-grid__delete")) {
    const buttonDeleteCard = cardContent.querySelector(".photo-grid__delete");
    buttonDeleteCard.addEventListener("click", openPopupDeletion);
  }
  //возвращаем созданную карточку
  return cardContent;
}
//буфер памяти для внесения данных об удаляемой карточке
export let cardDelete = "";
//функция загрузки удаляемой карточки в буфер для последующего удаления
function openPopupDeletion(event) {
  cardDelete = event.target
    .closest(".photo-grid__card")
    .getAttribute("data-id");
  openPopup(popupDelete);
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
function deleteCard(e, cardDelete) {
  e.preventDefault();
  renderLoading(e, true, "Да", "Удаление...");
  deleteRequest(cardDelete)
    .then(() => {
      renderLoading(e, false, "Да", "Удаление...");
      document.querySelector(`[data-id="${cardDelete}"]`).remove();
      closePopup(popupDelete);
    })
    .catch((error) => {
      renderLoading(e, false, "Да", "Удаление...");
      console.error("Ошибка в функции deleteCard:", error);
    });
}
//функция проверки лайка
function hasLike(response, cardContent) {
  const buttonLikeCard = cardContent.querySelector(".photo-grid__like");
  buttonLikeCard.addEventListener("click", function (event) {
    if (buttonLikeCard.classList.contains("photo-grid__like_active")) {
      dislikeCard(event);
    } else {
      likeCard(event);
    }
  });
  const hasUserLike = response.likes.find(function (item) {
    return item._id === userId;
  });
  if (hasUserLike) {
    buttonLikeCard.classList.add("photo-grid__like_active");
  }
}

//функция постановки лайка
function likeCard(event) {
  const card = event.target.closest(".photo-grid__card");
  const id = card.getAttribute("data-id");
  const likes = card.querySelector(".photo-grid__likes");
  likeRequest(id)
    .then((response) => {
      event.target.classList.add("photo-grid__like_active");
      likes.textContent = response.likes.length;
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
      event.target.classList.remove("photo-grid__like_active");
      likes.textContent = response.likes.length;
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
export { addCard, addCardsFromData, deleteCard };
