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

export {deleteImage, likeImage, addCardsArray}