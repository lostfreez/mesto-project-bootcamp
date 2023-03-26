const settings = {
  form: ".popup__form",
  input: ".popup__edit",
  button: ".popup__save",
  disabled: "popup__save_disabled",
  error: "popup__edit_error",
};
const showInputError = (formElement, inputElement, errorMessage) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(settings.error);
  errorElement.textContent = errorMessage;
};

const hideInputError = (formElement, inputElement) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(settings.error);
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
  const forms = Array.from(document.querySelectorAll(settings.form));
  forms.forEach((formElement) => {
    setEventListeners(formElement);
  });
}

const setEventListeners = (formElement) => {
  const inputList = Array.from(formElement.querySelectorAll(settings.input));
  const button = formElement.querySelector(settings.button);
  toggleButtonState(inputList, button);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", function () {
      checkInputValidity(formElement, inputElement);
      toggleButtonState(inputList, button);
    });
  });
};
function validateForm(formElement) {
  const inputList = Array.from(formElement.querySelectorAll(settings.input));
  const button = formElement.querySelector(settings.button);
  toggleButtonState(inputList, button);
}

const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
};

function toggleButtonState(inputList, buttonElement) {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(settings.disabled);
    buttonElement.setAttribute("disabled", "disabled");
  } else {
    buttonElement.classList.remove(settings.disabled);
    buttonElement.removeAttribute("disabled");
  }
}

export { enableValidation, validateForm };
