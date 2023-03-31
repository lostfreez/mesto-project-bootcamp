//Константы элементов страницы
const cardContainer = document.querySelector(".photo-grid__list");
const inputNamePlace = document.getElementById("place-input");
const inputUrlPlace = document.getElementById("url-input");
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
      validateForm(popupCard, settings);
      closePopup(popupCard);
    })
    .catch((error) => {
      console.error("Ошибка запроса:", error);
    })
    .finally(() => {
      renderLoading(e, false, "Создать", "Cохранение...");
    });
}
//функция создания карточки
function createCard(item) {
  const cardContent = cardTemplate.cloneNode(true);
  const buttonDeleteCard = cardContent.querySelector(".photo-grid__delete");
  if (typeof item === "object" && item.hasOwnProperty("likes")) {
    cardContent.querySelector(".photo-grid__likes").textContent =
    item.likes.length;
  }
  if (item.owner._id !== userId) {
    buttonDeleteCard.remove();
  }
  hasLike(item, cardContent);
  const imgElement = cardContent.querySelector(".photo-grid__image");
  imgElement.setAttribute(
    "alt",
    imgElement.getAttribute("alt") + " " + item.name
  );
  cardContent.setAttribute("data-id", item._id);
  cardContent.querySelector(".photo-grid__city").textContent = item.name;
  imgElement.src = item.link;
  //Подключение обработчика событий на открытие попапа карточки
  imgElement.addEventListener("click", openImage);
  //Подключение обработчика событий на кнопку удаления карточек
  if (buttonDeleteCard) {
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
  const gridCard = evt.target.closest(".photo-grid__card");
  const nameCard = gridCard.querySelector(".photo-grid__city");
  popupImageName.textContent = nameCard.textContent;
  popupImageSource.src = evt.target.src;
  popupImageSource.setAttribute("alt", evt.target.getAttribute("alt"));
  openPopup(popupImage);
}

//функция удаления карточки
function deleteCard(e, cardDelete) {
  e.preventDefault();
  renderLoading(e, true, "Да", "Удаление...");
  deleteRequest(cardDelete)
    .then(() => {
      document.querySelector(`[data-id="${cardDelete}"]`).remove();
      closePopup(popupDelete);
    })
    .catch((error) => {
      console.error("Ошибка в функции deleteCard:", error);
    })
    .finally(() => {
      renderLoading(e, false, "Да", "Удаление...");
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
  popupImage,
  popupCard,
  popupDelete,
  popupImageName,
  popupImageSource,
  settings,
} from "../index";
import {
  dislikeRequest,
  likeRequest,
  deleteRequest,
  createCardRequest,
} from "./api";
import { renderLoading, userId } from "./utils";
import { validateForm } from "./validate";
import { closePopup, openPopup } from "./modal";
export { addCard, addCardsFromData, deleteCard };
