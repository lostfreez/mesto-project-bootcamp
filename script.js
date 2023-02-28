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
//функция клонирующая карточки с изменением содержимого из массива
initialCards.forEach(function (item) {
  const cardContent = card.content.cloneNode(true);
  cardContent.querySelector(".photo-grid__image").src = item.link;
  cardContent.querySelector(".photo-grid__city").textContent = item.name;
  cardContent.querySelector(".photo-grid__image-popup").src = item.link;
  cardContent.querySelector(".photo-grid__place-name").textContent = item.name;
  addButtonPhoto(cardContent);
  deleteCard(cardContent);
  addLike(cardContent);
  addClosePhoto(cardContent);
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
  cardContent.querySelector(".photo-grid__image-popup").src = placeValue;
  cardContent.querySelector(".photo-grid__place-name").textContent = nameValue;
  addButtonPhoto(cardContent);
  deleteCard(cardContent);
  addLike(cardContent);
  addClosePhoto(cardContent);
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
    deleteButton.parentElement.remove();
  });
};
//функция открытия/закрытия изображения на весь экран
function togglePopup(event) {
  const card = event.target.closest('.photo-grid__card');
  const popupImage = card.querySelector('.photo-grid__popup');
  popupImage.classList.toggle('photo-grid__popup_opened');
  popup.classList.toggle("popup_opened");
};
//функция привязки клика по изображению к попапу
function addButtonPhoto(cardContent) {
  const photoButton = cardContent.querySelector('.photo-grid__image');
  photoButton.addEventListener('click', togglePopup);
};
//функция привязки кнопки сокрытия изображения к попапу
function addClosePhoto(cardContent){
  const closePopupPhoto = cardContent.querySelector(".photo-grid__image-close");
  closePopupPhoto.addEventListener("click", togglePopup);
};