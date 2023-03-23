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
//функция клонирующая карточки с изменением содержимого из массива
function addCardsDefault() {
  initialCards.forEach(function (item) {
    inputNamePlace.value = item.name;
    inputUrlPlace.value = item.link;
    const cardContent = createCard();
    cardContainer.prepend(cardContent);
  });
}
//Функция обрабатывающая массив с карточками подруженный с сервера
function addCardsFromData(array) {
  array.forEach(function (item) {
    inputNamePlace.value = item.name;
    inputUrlPlace.value = item.link;
    const cardContent = createCard();
    cardContainer.prepend(cardContent);
  });
}
//функция добавления карточки по введенным данным из формы
function addCard(e) {
  e.preventDefault();
  const nameData = inputNamePlace.value;
  const urlData = inputUrlPlace.value;
  const cardContent = createCard();
  // отправляем данные на сервер
  fetch("https://nomoreparties.co/v1/wbf-cohort-6/cards", {
    method: "POST",
    headers: {
      authorization: "54974c2d-ab71-4b56-9932-c842ca70e522",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: nameData,
      link: urlData,
    }),
  })
    .then((response) => {
      if (response.ok) {
        // обновляем элементы на странице после успешного сохранения на сервере
        cardContainer.prepend(cardContent);
        closePopup(card);
        enableValidation();
      } else {
        response.json().then((errorData) => {
          console.error("Ошибка HTTP: " + response.status, errorData);
        });
      }
    })
    .catch((error) => {
      console.error("Ошибка запроса:", error);
    });
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
  buttonOpenImage.addEventListener("click", openImage);
  //Подключение обработчика событий на кнопку удаления карточек
  const buttonDeleteCard = cardContent.querySelector(".photo-grid__delete");
  buttonDeleteCard.addEventListener("click", deleteCard);
  //Подключение обработчика событий на кнопку постановки лайка
  const buttonLikeCard = cardContent.querySelector(".photo-grid__like");
  buttonLikeCard.addEventListener("click", likeCard);
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
  event.target.closest(".photo-grid__card").remove();
}
//функция постановки лайка
function likeCard(event) {
  event.target.classList.toggle("photo-grid__like_active");
}
import { enableValidation } from "./validate";
import { closePopup, openPopup } from "./modal";
export { addCardsDefault, addCard, addCardsFromData };
