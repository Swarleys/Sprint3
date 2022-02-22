// Get the input fields
let password = document.querySelector("input.password");
let phone = document.querySelector("input.phone");
let firstName = document.querySelector("input.name");
let lastName = document.querySelector("input.last-name");
let address = document.querySelector("input.address");
let email = document.querySelector("input.email");

// Get the error elements
let errorPassword = document.getElementById("errorPassword");
let errorName = document.getElementById("errorName");
let errorLastName = document.getElementById("errorLastName");
let errorPhone = document.getElementById("errorPhone");
let errorEmail = document.getElementById("errorEmail");
let errorAddress = document.getElementById("errorAddress");

// Exercise 6
function validate() {
  // Validate fields entered by the user: name, phone, password, and email
  // Using the Constraint validation API https://developer.mozilla.org/en-US/docs/Web/API/Constraint_validation

  if (!firstName.checkValidity()) {
    errorName.classList.add("error-message");
    firstName.classList.add("error");
    firstName.setCustomValidity("Numbers in the name are not valid");
  }
  if (!lastName.checkValidity()) {
    errorLastName.classList.add("error-message");
    lastName.classList.add("error");
    lastName.setCustomValidity("Numbers in the last name are not valid");
  }
  if (!email.checkValidity()) {
    errorEmail.classList.add("error-message");
    email.classList.add("error");
  }
  if (!password.checkValidity()) {
    errorPassword.classList.add("error-message");
    password.classList.add("error");
  }
  if (!address.checkValidity()) {
    errorAddress.classList.add("error-message");
    address.classList.add("error");
    address.setCustomValidity("The address needs to have atleast 3 characters");
  }
  if (!phone.checkValidity()) {
//   if (phone.value.length < 3) {
    console.log(phone.checkValidity());
    errorPhone.classList.add("error-message");
    phone.classList.add("error");
  }
}

firstName.addEventListener("input", (e) => {
  firstName.classList.remove("error");
  errorName.classList.remove("error-message");
});
lastName.addEventListener("input", (e) => {
  lastName.classList.remove("error");
  errorLastName.classList.remove("error-message");
});
email.addEventListener("input", (e) => {
  email.classList.remove("error");
  errorEmail.classList.remove("error-message");
});
password.addEventListener("input", (e) => {
  password.classList.remove("error");
  errorPassword.classList.remove("error-message");
});
address.addEventListener("input", (e) => {
  address.classList.remove("error");
  errorAddress.classList.remove("error-message");
});
phone.addEventListener("input", (e) => {
  phone.classList.remove("error");
  errorPhone.classList.remove("error-message");
});
