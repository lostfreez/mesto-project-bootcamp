//Переменные кнопок popup
const buttonAddCard = document.querySelector('.profile__button');
const buttonCloseCard = document.getElementById('cardForm__close');
const buttonOpenProfile = document.querySelector('.profile__edit');
const buttonCloseProfile = document.getElementById('editProfile__close');
const popup = document.querySelector('.popup');
const profileForm = document.getElementById('editProfile');
const cardForm = document.getElementById('cardForm');
//Обработчики кнопок popup
buttonOpenProfile.addEventListener('click', () => {togglePopup(profileForm)});
buttonCloseProfile.addEventListener('click', () => {togglePopup(profileForm)});
buttonAddCard.addEventListener('click', () => {togglePopup(cardForm)});
buttonCloseCard.addEventListener('click', () => {togglePopup(cardForm)});
// обработчик для закрытия popup карточек
popup.addEventListener('click', function(evt){ 
  if (evt.target.classList.contains('popup__close')){
  closePopup(evt);
}});
//универсальная функция открытия/закрытия popup
function togglePopup(Form){
  Form.classList.toggle('popup_opened');
  popup.classList.toggle('popup_opened');
  if (Form === profileForm){
  nameInput.value = nameOutput.textContent;
  jobInput.value = jobOutput.textContent;
  };
}
//функция открытия popup изображений карточек
function openImage(evt){
  const element = evt.target;
  const container = element.closest('.photo-grid__card');
  const popupContainer = document.getElementById("popup" + container.id);
  cardPopupContainer.classList.add('popup_opened');
  popupContainer.classList.add('popup_opened');
  popup.classList.add('popup_background_opened');
}
//функция закрытия popup изображений карточек
function closePopup(evt){
  const element = evt.target;
  const container = element.closest('.popup__card');
  cardPopupContainer.classList.remove('popup_opened');
  popup.classList.remove('popup_background_opened');
  if (container){
    container.classList.remove('popup_opened');
  }
}
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
const cardPopup = document.querySelector("#popup__card");
const cardPopupContainer = document.getElementById("cardPopupContainer");
const cardContainer = document.querySelector(".photo-grid__list");
//обработчик контейнейра с карточками на открытие попапа
cardContainer.addEventListener('click', function(evt){ 
  if (evt.target.classList.contains('photo-grid__image')){
  openImage(evt);
}});
//обработчик контейнейра с карточками на удаление карточек
cardContainer.addEventListener('click', function(evt){ 
  if (evt.target.classList.contains('photo-grid__delete')){
  deleteImage(evt);
}});
//обработчик контейнейра с карточками на постановку лайка
cardContainer.addEventListener('click', function(evt){ 
  if (evt.target.classList.contains('photo-grid__like')){
  likeImage(evt);
}});
//функция клонирующая карточки с изменением содержимого из массива
initialCards.forEach(function (item) {
  const cardContent = card.content.cloneNode(true);
  const cardContentPopup = cardPopup.content.cloneNode(true);
  cardContent.querySelector(".photo-grid__image").src = item.link;
  cardContent.querySelector(".photo-grid__city").textContent = item.name;
  cardContentPopup.querySelector(".popup__image").src = item.link;
  cardContentPopup.querySelector(".popup__place-name").textContent = item.name;
  giveId(cardContent, cardContentPopup); //присваиваем каждой карточке уникальный id
  cardContainer.prepend(cardContent);
  cardPopupContainer.prepend(cardContentPopup);
});
//Функция присваивания каждой карточке уникального идентификатора одинаковый для popup и list
function giveId(cardContent, cardContentPopup){
  const cardId = cardContent.querySelector('.photo-grid__card');
  const cardIdPopup = cardContentPopup.querySelector('.popup__card');
  const FirstCard = document.querySelectorAll('.photo-grid__card');
  let cardCount = 0;
  if (FirstCard.length === 0){
     cardCount++;
    }
    else {
      cardCount= Number(FirstCard[0].getAttribute('id'));
      cardCount++;
    }
    cardId.setAttribute("id", cardCount.toString());
    cardIdPopup.setAttribute("id", "popup" + cardCount);
}
//Функция удаления карточки
function deleteImage(evt){
  const element = evt.target;
  const card = element.closest('.photo-grid__card');
  const cardPopup = document.getElementById("popup" + card.id);
  card.remove();
  cardPopup.remove();
}
function likeImage(evt){
  const element = evt.target;
  element.classList.toggle('photo-grid__like_active');
}
//переменные для добавления новой карточки
const nameCardInput = document.getElementById("newPlace");
const urlCardInput = document.getElementById("urlPlace");
const formAddCard = document.getElementById("addCard");
//Обработчик submit для добавления новой карты
formAddCard.addEventListener("submit", addCard);
//функция добавления новой карточки
function addCard(evt) {
  evt.preventDefault();
  const nameValue = nameCardInput.value;
  const placeValue = urlCardInput.value;
  const cardContent = card.content.cloneNode(true);
  const cardContentPopup = cardPopup.content.cloneNode(true);
  cardContent.querySelector(".photo-grid__image").src = placeValue;
  cardContent.querySelector(".photo-grid__city").textContent = nameValue;
  cardContentPopup.querySelector(".popup__image").src = placeValue;
  cardContentPopup.querySelector(".popup__place-name").textContent = nameValue;
  giveId(cardContent, cardContentPopup);
  cardContainer.prepend(cardContent);
  cardPopupContainer.prepend(cardContentPopup);
  nameCardInput.value = "";
  urlCardInput.value = "";
  togglePopup(cardForm);
}
//переменные для редактирование профиля
const formEditContain = document.getElementById("editContainer");
const nameInput = document.getElementById("nameInput");
const jobInput = document.getElementById("jobInput");
const nameOutput = document.querySelector(".profile__name");
const jobOutput = document.querySelector(".profile__job");
//функция для сохраненния внесенных изменений и скрытия попапа
function saveProfile(evt) {
  evt.preventDefault();
  const nameValue = nameInput.value;
  const jobValue = jobInput.value;
  nameOutput.textContent = nameValue;
  jobOutput.textContent = jobValue;
  togglePopup(profileForm);
}
//Обработчик submit для редактирования профиля
formEditContain.addEventListener("submit",saveProfile);