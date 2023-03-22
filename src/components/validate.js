const showInputError = (formElement, inputElement, errorMessage) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add("popup__edit_error");
  errorElement.textContent = errorMessage;
};

const hideInputError = (formElement, inputElement) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove("popup__edit_error");
  errorElement.textContent = "";
};
const checkInputValidity = (formElement, inputElement) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage);
  } else {
    hideInputError(formElement, inputElement);
  }
};
function enableValidation() {
  const forms = Array.from(document.querySelectorAll(".popup__form"));
  forms.forEach((formElement) => {
    setEventListeners(formElement);
  });
}

const setEventListeners = (formElement) => {
  const inputList = Array.from(formElement.querySelectorAll(".popup__edit"));
  const button = formElement.querySelector(".popup__save");
  toggleButtonState(inputList, button);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", function () {
      checkInputValidity(formElement, inputElement);
      toggleButtonState(inputList, button);
    });
  });
};

const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
};

function toggleButtonState(inputList, buttonElement) {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add("popup__save_disabled");
  } else {
    buttonElement.classList.remove("popup__save_disabled");
  }
}

export { enableValidation };
