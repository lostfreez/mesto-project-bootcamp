//функция валидации поля
function validateInput(elementForm, cardForm) {
    if (!elementForm.validity.valid) {
      elementForm.classList.add("popup__edit_error");
      elementForm.nextElementSibling.textContent = elementForm.validationMessage;
    }
    if (elementForm.validity.valid) {
      elementForm.nextElementSibling.textContent = "";
      elementForm.classList.remove("popup__edit_error");
    }
    validateForm(cardForm);
  }
//функция валидации формы
function validateForm(form) {
    const saveButtonn = form.querySelector(".popup__save");
    const formInputs = Array.from(form.querySelectorAll(".popup__edit"));
    const input = (element) => element.validity.valid;
    if (formInputs.every(input)) {
      saveButtonn.classList.remove("popup__save_disabled");
      saveButtonn.removeAttribute("disabled");
    } else {
      saveButtonn.classList.add("popup__save_disabled");
      saveButtonn.setAttribute("disabled", true);
    }
  }

  export {validateInput, validateForm}