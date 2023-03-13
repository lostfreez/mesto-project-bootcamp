//Функция присваивания каждой карточке уникального идентификатора одинаковый для popup и list
 function giveId(cardContent, cardContentPopup) {
  const cardId = cardContent.querySelector(".photo-grid__card");
  const cardIdPopup = cardContentPopup.querySelector(".popup__card");
  const FirstCard = document.querySelectorAll(".photo-grid__card");
  let cardCount = 0;
  if (FirstCard.length === 0) {
    cardCount++;
  } else {
    cardCount = Number(FirstCard[0].getAttribute("id"));
    cardCount++;
  }
  cardId.setAttribute("id", cardCount.toString());
  cardIdPopup.setAttribute("id", "popup" + cardCount);
}

export { giveId };
