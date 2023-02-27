const edtButton = document.querySelector('.profile__edit');
const clsButton = document.querySelector('.popup__close');
const modal = document.querySelector('.popup');
edtButton.addEventListener("click", openButton);
clsButton.addEventListener("click", openButton);

function openButton() {
  modal.classList.toggle("popup_opened");
}
