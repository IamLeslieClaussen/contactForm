const form = document.querySelector(".container__content__form");
const successMessage = document.querySelector(".success-message");
const firstName = document.querySelector("#first-name");
const lastName = document.querySelector("#last-name");
const email = document.querySelector("#email");
const queryType = document.querySelectorAll("input[name='query-type']");
const message = document.querySelector("#message");
const errorMessage = document.querySelector(".error");
console.log(errorMessage);

/* Eventlistener */
form.addEventListener("submit", formSubmit);

/* Functions */

function formSubmit(e) {
  e.preventDefault();

  const inputs = [firstName, lastName, email, message, consent];
  let isValid = true;

  inputs.forEach((input) => {
    const errorSpan = input.nextElementSibling;

    if (!input.value.trim() || (input.type === "checkbox" && !input.checked)) {
      errorSpan.classList.remove("hidden");
      isValid = false;
    } else {
      errorSpan.classList.add("hidden");
      if (input.type == "email") {
        if (isItEmail(input.value)) {
          errorSpan.classList.add("hidden");
        } else {
          errorSpan.classList.remove("hidden");
        }
      }
    }
  });

  // Validate the radio buttons (Query Type)
  const queryTypeErrorSpan = document.querySelector(".radio .error");

  const isQueryTypeSelected = Array.from(queryType).some(
    (radio) => radio.checked
  );
  if (!isQueryTypeSelected) {
    queryTypeErrorSpan.classList.remove("hidden");
    isValid = false;
  } else {
    queryTypeErrorSpan.classList.add("hidden");
  }

  // Validate the checkbox (Consent)
  const consentErrorSpan = consent
    .closest(".container__content__form__group")
    .querySelector(".error");
  if (!consent.checked) {
    consentErrorSpan.classList.remove("hidden");
    isValid = false;
  } else {
    consentErrorSpan.classList.add("hidden");
  }

  if (isValid) {
    form.classList.add("hidden");
    successMessage.classList.remove("hidden");
  }
}

function isItEmail(email) {
  return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
    email
  );
}
