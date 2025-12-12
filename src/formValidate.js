const form = document.querySelector('form');
const email = document.getElementById('email');
const emailError = document.querySelector('#email + span.error');

const countrySelect = document.getElementById('country');
const postalCode = document.getElementById('postal_code');
const postalCodeError = document.querySelector('#postal_code + span.error');

const password = document.getElementById('password');
const passwordError = document.querySelector('#password + span.error');
const confirmPassword = document.getElementById('confirm_password');
const confirmPasswordError = document.querySelector(
  '#confirm_password + span.error',
);

email.addEventListener('input', () => {
  if (email.validity.valid) {
    emailError.textContent = ''; // Remove the message content
    emailError.className = 'error'; // Removes the `active` class
  } else {
    // If there is still an error, show the correct error
    showEmailError();
  }
});

form.addEventListener('submit', (event) => {
  // If the email field is invalid
  if (!email.validity.valid) {
    // Display an appropriate error message
    showEmailError();
    // Prevent form submission
    event.preventDefault();
  } else if (!postalCode.validity.valid) {
    // Display an appropriate error message
    showPostalCodeError();
    // Prevent form submission
    event.preventDefault();
  } else if (!password.validity.valid) {
    // Display an appropriate error message
    showPasswordError();
    // Prevent form submission
    event.preventDefault();
  } else if (!confirmPassword.validity.valid) {
    // Display an appropriate error message
    showConfirmPasswordError();
    // Prevent form submission
    event.preventDefault();
  } else {
    alert('hi five!');
  }
});

function showEmailError() {
  if (email.validity.valueMissing) {
    // If empty
    emailError.textContent = 'You need to enter an email address.';
  } else if (email.validity.typeMismatch) {
    // If it's not an email address,
    emailError.textContent = 'Entered value needs to be an email address.';
  } else if (email.validity.tooShort) {
    // If the value is too short,
    emailError.textContent = `Email should be at least ${email.minLength} characters; you entered ${email.value.length}.`;
  }
  // Add the `active` class
  emailError.className = 'error active';
}

function checkPostalCode() {
  // For each country, defines the pattern that the postal code has to follow
  const postalCodeConstraints = {
    ch: [
      '^(CH-)?\\d{4}$',
      'Swiss postal codes must have exactly 4 digits: e.g. CH-1950 or 1950',
    ],
    fr: [
      '^(F-)?\\d{5}$',
      'French postal codes must have exactly 5 digits: e.g. F-75012 or 75012',
    ],
    de: [
      '^(D-)?\\d{5}$',
      'German postal codes must have exactly 5 digits: e.g. D-12345 or 12345',
    ],
    nl: [
      '^(NL-)?\\d{4}\\s*([A-RT-Z][A-Z]|S[BCE-RT-Z])$',
      'Dutch postal codes must have exactly 4 digits, followed by 2 letters except SA, SD and SS',
    ],
  };

  // Read the country id
  const country = countrySelect.value;

  // Build the constraint checker
  const constraint = new RegExp(postalCodeConstraints[country][0], '');
  console.log(constraint);

  // Check it!
  if (constraint.test(postalCode.value)) {
    // The postal code follows the constraint, no error msg
    postalCodeError.textContent = ''; // Remove the message content
    postalCodeError.className = 'error'; // Removes the `active` class
  } else {
    // The postal code doesn't follow the constraint, show custom error msg
    showPostalCodeError(postalCodeConstraints[country][1]);
  }
}

countrySelect.addEventListener('change', checkPostalCode);
postalCode.addEventListener('input', checkPostalCode);

function showPostalCodeError(error) {
  if (!postalCode.valid) {
    postalCodeError.textContent = error;
  }
  // Add the `active` class to display the custom error msg
  postalCodeError.className = 'error active';
}

function showPasswordError() {
  if (password.validity.valueMissing) {
    // If empty
    passwordError.textContent = 'You need to enter an password.';
  } else if (password.validity.tooShort) {
    // If the value is too short,
    passwordError.textContent = `Password should be at least ${password.minLength} characters; you entered ${password.value.length}.`;
  } else if (password.validity.patternMismatch) {
    passwordError.textContent =
      'Password must contain at least 1 uppercase letter, 1 lowercase letter, and one number';
  }
  // Add the `active` class to show the error
  passwordError.className = 'error active';
}

function showConfirmPasswordError() {
  if (confirmPassword.validity.valueMissing) {
    confirmPasswordError.textContent = 'Re-enter your password to confirm.';
  } else confirmPasswordError.textContent = 'Passwords do not match';
  // Add the `active` class to show the error
  passwordError.className = 'error active';
}

function checkPassword() {
  const passwordConstraint = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
  if (passwordConstraint.test(password.value)) {
    passwordError.textContent = ''; // Remove the message content
    passwordError.className = 'error'; // Removes the `active` class that shows error
  } else {
    showPasswordError();
  }
}

function checkConfirmPassword() {
  if (confirmPassword.value === password.value) {
    confirmPassword.setCustomValidity('');
    confirmPasswordError.textContent = ''; // Remove the message content
    confirmPasswordError.className = 'error'; // Removes the `active` class that shows error
  } else {
    confirmPassword.setCustomValidity('Passwords do not match');
    showConfirmPasswordError();
  }
}

password.addEventListener('input', function () {
  checkPassword();
  checkConfirmPassword();
});
confirmPassword.addEventListener('input', checkConfirmPassword);
