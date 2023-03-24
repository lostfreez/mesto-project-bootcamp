let buffer = "";
function renderLoading(isLoading) {
  const popup = document.querySelector(".popup_opened");
  const button = popup.querySelector(".popup__save");
  if (isLoading) {
    buffer = button.textContent;
    button.textContent = "Сохранение...";
  } else {
    setTimeout(function(){
        button.textContent = buffer;
    }, 500)
  }
}

export { renderLoading };
