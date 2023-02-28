//переменные для кнопки редактирования профиля
const edtButton = document.querySelector(".profile__edit");
const clsButton = document.getElementById("editProfile__close");
const popup = document.querySelector(".popup");
const modal = document.getElementById("editProfile");
edtButton.addEventListener("click", openProfile);
clsButton.addEventListener("click", openProfile);
//функция открытия профиля
function openProfile() {
  popup.classList.toggle("popup_opened");
  modal.classList.toggle("popup__window_opened");
}
//переменные для редактирование профиля
const formEditContain = document.getElementById("editContain");
const nameInput = document.getElementById("nameInput");
const jobInput = document.getElementById("jobInput");
//функция для сохраненния внесенных изменений и скрытия попапа
function handleFormSubmit(evt) {
  evt.preventDefault();
  const nameValue = nameInput.value;
  const jobValue = jobInput.value;
  const nameOutput = document.querySelector(".profile__name");
  const jobOutput = document.querySelector(".profile__job");
  nameOutput.textContent = nameValue;
  jobOutput.textContent = jobValue;
  openProfile();
}
formEditContain.addEventListener("submit", handleFormSubmit);
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
//переменные template для клонирования карточки
const card = document.querySelector("#card");
const cardContainer = document.querySelector(".photo-grid__list");
//переменные template для клонирования карточки в popup
const cardPopupTemplate = document.querySelector("#popup__card");
const cardsContainerPopup = document.querySelector(".popup__cards");

//функция клонирующая карточки с изменением содержимого из массива
initialCards.forEach(function (item) {
  const cardContent = card.content.cloneNode(true);
  cardContent.querySelector(".photo-grid__image").src = item.link;
  cardContent.querySelector(".photo-grid__city").textContent = item.name;
  addPopup(item);
  deleteCard(cardContent);
  addLike(cardContent);
  openPhoto(cardContent);
  cardContainer.append(cardContent);
});
//переменные для кнопки открытия формы добавления карточек
const addCardButton = document.querySelector(".profile__button");
const cardForm = document.getElementById("cardForm");
const clsButtonCard = document.getElementById("cardForm__close");
addCardButton.addEventListener("click", openCardForm);
clsButtonCard.addEventListener("click", openCardForm);
//функция открытия формы добавления карточек
function openCardForm() {
  popup.classList.toggle("popup_opened");
  cardForm.classList.toggle("popup__window_opened");
}
//переменные для добавления новой карточки
const namePlaceInput = document.getElementById("newPlace");
const urlPlaceInput = document.getElementById("urlPlace");
const formAddCard = document.getElementById("addCard");
//функция добавления новой карточки
function addCard(evt) {
  evt.preventDefault();
  const nameValue = namePlaceInput.value;
  const placeValue = urlPlaceInput.value;
  const cardContent = card.content.cloneNode(true);
  cardContent.querySelector(".photo-grid__image").src = placeValue;
  cardContent.querySelector(".photo-grid__city").textContent = nameValue;
  deleteCard(cardContent);
  addLike(cardContent);
  openPhoto(cardContent);
  cardContainer.append(cardContent);
  openCardForm();
}
formAddCard.addEventListener("submit", addCard);
//функция добавления лайка на карточку
function addLike(cardContent) {
  const likeButton = cardContent.querySelector(".photo-grid__like");
  likeButton.addEventListener("click", function () {
    likeButton.classList.toggle("photo-grid__like_active");
  });
};
//функция удаления карточки
function deleteCard(cardContent){
  const deleteButton = cardContent.querySelector(".photo-grid__delete");
  deleteButton.addEventListener("click", function () {
    const links = document.querySelectorAll("img");
    links.forEach(link => {
      if (link.getAttribute("src") === deleteButton.nextElementSibling.getAttribute("src")) {
        link.parentElement.remove();
      }
    });
    deleteButton.parentElement.remove();
  });
};
//функция копирования карточки в попап
function addPopup(item) {
  const cardPopupContent = cardPopupTemplate.content.cloneNode(true);
  const imageElement = cardPopupContent.querySelector(".popup__image");
  const nameElement = cardPopupContent.querySelector(".popup__place-name");
  const clsButtonCardForm = cardPopupContent.querySelector(".cardForm__close");
  imageElement.src = item.link;
  nameElement.textContent = item.name
  cardsContainerPopup.append(cardPopupContent);
};



//функция открытия карточки из попапа
function openPhoto(cardContent){
  const photoContain = cardContent.querySelector(".photo-grid__image");
  photoContain.addEventListener("click", function(){
    popup.classList.toggle("popup_opened");
    const links = document.querySelectorAll("img");
    links.forEach(link => {
      if (link.getAttribute("src") === photoContain.getAttribute("src")) {
        link.parentElement.classList.toggle("popup__card_opened");
      }
    });
  });
}