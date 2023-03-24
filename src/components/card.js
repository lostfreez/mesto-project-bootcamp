//Константы элементов страницы
const cardContainer = document.querySelector(".photo-grid__list");
const cardPopup = document.querySelector(".popup_type_image");
const card = document.querySelector(".popup_type_card-form");
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
function addCardsFromData(array) {
  array.forEach(function (item) {
    inputNamePlace.value = item.name;
    inputUrlPlace.value = item.link;
    const cardContent = createCard(item);
    cardContainer.prepend(cardContent);
  });
}
//функция добавления карточки по введенным данным из формы
function addCard(e) {
  e.preventDefault();
  renderLoading(true);
  // отправляем данные на сервер
  fetch("https://nomoreparties.co/v1/wbf-cohort-6/cards", {
    method: "POST",
    headers: {
      authorization: "54974c2d-ab71-4b56-9932-c842ca70e522",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: inputNamePlace.value,
      link: inputUrlPlace.value,
    }),
  })
    .then((response) => {
      if (response.ok) {
        response.json().then((data) => {
          console.log(data);
          const cardContent = createCard(data);
          cardContainer.prepend(cardContent);
        });
      } else {
        response.json().then((errorData) => {
          console.error("Ошибка HTTP: " + response.status, errorData);
        });
      }
    })
    .catch((error) => {
      console.error("Ошибка запроса:", error);
    })
    .finally(() => {
      renderLoading(false);
      closePopup(card);
      enableValidation();
    });
}
//функция создания карточки
function createCard(data) {
  const nameValue = inputNamePlace.value;
  const urlValue = inputUrlPlace.value;
  const cardContent = cardTemplate.cloneNode(true);
  if (typeof data === "object" && data.hasOwnProperty("likes")) {
    cardContent.querySelector(".photo-grid__likes").textContent =
      data.likes.length;
  }
  if (data.owner._id !== userData._id) {
    cardContent.querySelector(".photo-grid__delete").remove();
  }
  hasLike(data, cardContent);
  cardContent.setAttribute("data-id", data._id);
  cardContent.querySelector(".photo-grid__city").textContent = nameValue;
  cardContent.querySelector(".photo-grid__image").src = urlValue;
  inputNamePlace.value = "";
  inputUrlPlace.value = "";
  //Подключение обработчика событий на открытие попапа карточки
  const buttonOpenImage = cardContent.querySelector(".photo-grid__image");
  buttonOpenImage.addEventListener("click", openImage);
  //Подключение обработчика событий на кнопку удаления карточек
  if (cardContent.querySelector(".photo-grid__delete")) {
    const buttonDeleteCard = cardContent.querySelector(".photo-grid__delete");
    buttonDeleteCard.addEventListener("click", deleteCard);
  }
  //возвращаем созданную карточку
  return cardContent;
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
function deleteCard(event) {
  const id = event.target.closest(".photo-grid__card").getAttribute("data-id");
  fetch(`https://nomoreparties.co/v1/wbf-cohort-6/cards/${id}`, {
    method: "DELETE",
    headers: {
      authorization: "54974c2d-ab71-4b56-9932-c842ca70e522",
    },
  })
    .then((response) => {
      if (!response.ok) {
        response.json().then((errorData) => {
          console.error("Ошибка HTTP: " + response.status, errorData);
        });
      }
      return response.json();
    })
    .then(() => {
      event.target.closest(".photo-grid__card").remove();
    })
    .catch((error) => {
      console.error("Ошибка в функции deleteCard:", error);
    });
}
//функция проверки лайка
function hasLike(data, cardContent) {
  const buttonLikeCard = cardContent.querySelector(".photo-grid__like");
  const hasUserLike = data.likes.find(function (item) {
    return item._id === userData._id;
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
  const likes = card.querySelector(".photo-grid__likes")
  fetch(`https://nomoreparties.co/v1/wbf-cohort-6/cards/likes/${id}`, {
    method: "put",
    headers: {
      authorization: "54974c2d-ab71-4b56-9932-c842ca70e522",
    },
  })
    .then((response) => {
      if (!response.ok) {
        response.json().then((errorData) => {
          console.error("Ошибка HTTP: " + response.status, errorData);
        });
      }
      return response.json();
    })
    .then((data) => {
      event.target.removeEventListener("click", likeCard);
      event.target.classList.add("photo-grid__like_active");
      likes.textContent = data.likes.length;
      event.target.addEventListener("click", dislikeCard);
    })
    .catch((error) => {
      console.error("Ошибка в функции likeCard:", error);
    });
}
//функция удаления лайка
function dislikeCard(event){
  const card = event.target.closest(".photo-grid__card");
  const id = card.getAttribute("data-id");
  const likes = card.querySelector(".photo-grid__likes")
  fetch(`https://nomoreparties.co/v1/wbf-cohort-6/cards/likes/${id}`, {
    method: "DELETE",
    headers: {
      authorization: "54974c2d-ab71-4b56-9932-c842ca70e522",
    },
  })
    .then((response) => {
      if (!response.ok) {
        response.json().then((errorData) => {
          console.error("Ошибка HTTP: " + response.status, errorData);
        });
      }
      return response.json();
    })
    .then((data) => {
      event.target.removeEventListener("click", dislikeCard);
      event.target.classList.remove("photo-grid__like_active");
      likes.textContent = data.likes.length;
      event.target.addEventListener("click", likeCard);
    })
    .catch((error) => {
      console.error("Ошибка в функции likeCard:", error);
    });
}

import { renderLoading } from "./utils"
import { enableValidation } from "./validate";
import { closePopup, openPopup } from "./modal";
import { userData } from "./api";
export { addCard, addCardsFromData };
