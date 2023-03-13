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
//Константы
const cardPopup = document.querySelector("#popup__card");
const cardContainer = document.querySelector(".photo-grid__list");

//функция клонирующая карточки с изменением содержимого из массива
function addCardsArray() {
  initialCards.forEach(function (item) {
    const cardContent = card.content.cloneNode(true);
    const cardContentPopup = cardPopup.content.cloneNode(true);
    cardContent.querySelector(".photo-grid__image").src = item.link;
    cardContent.querySelector(".photo-grid__city").textContent = item.name;
    cardContentPopup.querySelector(".popup__image").src = item.link;
    cardContentPopup.querySelector(".popup__place-name").textContent =
      item.name;
    giveId(cardContent, cardContentPopup); //присваиваем каждой карточке уникальный id
    cardContainer.prepend(cardContent);
    cardPopupContainer.prepend(cardContentPopup);
  });
}
//функция постановки лайка на карточку
function likeImage(evt) {
  const element = evt.target;
  element.classList.toggle("photo-grid__like_active");
}
//Функция удаления карточки
function deleteImage(evt) {
  const element = evt.target;
  const card = element.closest(".photo-grid__card");
  const cardPopup = document.getElementById("popup" + card.id);
  card.remove();
  cardPopup.remove();
}
import { giveId } from "./utils";
export {deleteImage, likeImage, addCardsArray}