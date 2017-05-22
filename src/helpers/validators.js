// Validate login/registration data
function validateAuth(data) {
  const isValidEmail = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z0-9]{2,5}$/;
  const messages = [];
  if (!data.email) {
    messages.push('Email Address is required');
  } else if (!isValidEmail.test(data.email)) {
    messages.push('You must enter a valid email address');
  }
  if (!data.password) {
    messages.push('Password is required');
  }
  const resp = {
    isError: (messages.length > 0),
    messages
  };
  return resp;
}

function validatePasswordEmail(data) {
  const email = data.spree_user.email;
  const isValidEmail = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z0-9]{2,5}$/;
  const messages = [];
  if (!email) {
    messages.push('Email is required');
  } else if (!isValidEmail.test(email)) {
    messages.push('You must enter a valid email address');
  }
  const resp = {
    isError: (messages.length > 0),
    messages
  };
  return resp;
}

// Validate add/remove cart data
function validateProduct(data) {
  const messages = [];
  if (!data.id) {
    messages.push('Product/Variant id is invalid');
  }
  if (!data.quantity) {
    messages.push('Product quantity is invalid');
  }
  if (isNaN(data.id)) {
    messages.push('Product/Variant id is invalid');
  }
  if (isNaN(data.quantity)) {
    messages.push('Product quantity is invalid');
  }
  const resp = {
    isError: (messages.length > 0),
    messages
  };
  return resp;
}

function validPhone(number) {
  const isPhoneOne = /^\d{10}$/;
  const isPhoneTwo = /^\+?([0-9]{2})\)?[-. ]?([0-9]{4})[-. ]?([0-9]{4})$/;
  const isPhoneThree = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
  return (number.match(isPhoneOne) || number.match(isPhoneTwo) || number.match(isPhoneThree));
}

// Validate Billing/Address Form
function validateMandatoryFieldsAddress(data) {
  const messages = [];
  if (!data.firstname) {
    messages.push('First Name is a required field.');
  }
  if (!data.lastname) {
    messages.push('Last Name is a required field.');
  }
  if (!data.phone) {
    messages.push('Phone is a required field.');
  } else if (!validPhone(data.phone)) {
    messages.push('Please enter a valid phone number.');
  }
  if (!data.address1) {
    messages.push('Address is a required field.');
  }
  if (!data.city) {
    messages.push('City is a required field.');
  }
  if (data.state === 0) {
    messages.push('State is a required field.');
  }
  if (!data.zip) {
    messages.push('ZIP is a required field.');
  } else if (data.zip.length < 5) {
    messages.push('Please enter a valid postcode/ZIP.');
  } else if (isNaN(Number(data.zip))) {
    messages.push('Please enter a valid postcode/ZIP.');
  }
  const resp = {
    isError: (messages.length > 0),
    messages
  };
  return resp;
}


// Validate Edit Account form
function validateAccountEdit(data) {
  const messages = [];
  const isValidEmail = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z0-9]{2,5}$/;

  if ((!data.fname) || (!data.lname) || (!data.email)) {
    messages.push('Please fill all the required fields');
    if ((data.password) || (data.newpassword) || (data.confirmnewpassword)) {
      messages.push('Please fill all the password fields');
      if (data.password !== data.newpassword) {
        messages.push('Password fields do not match');
      }
    }
  }
  if (!isValidEmail.test(data.email)) {
    messages.push('You must enter a valid email address');
  }
  const resp = {
    isError: (messages.length > 0),
    messages
  };

  return resp;
}

// Validate Update Account (Updates firstname and lastname)
function validateAccountUpdate(data) {
  const messages = [];

  if ((!data.f_name) || (!data.l_name)) {
    messages.push('Please fill all the required fields');
  }

  const resp = {
    isError: (messages.length > 0),
    messages
  };

  return resp;
}

// Validate Contact Form
function validateContactForm(data) {
  const messages = [];
  console.log('VALIDATE CONTACT FORM DATA', data);
  const isValidEmail = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z0-9]{2,5}$/;
  if (!isValidEmail.test(data.email)) {
    messages.push('Invalid email field');
  }
  const resp = {
    isError: (messages.length > 0),
    messages
  };
  return resp;
}

// Validate password strength
function testPasswordStrength(data) {
  const messages = [];
  if (data.length < 8) {
    messages.push('The password should be at least eight characters long.');
  }
  const resp = {
    isError: (messages.length > 0),
    messages
  };
  return resp;
}


// Validate lost password input
function validateLostPassword(data) {
  const messages = [];
  const isNumberString = /^[\w\s@.-]*$/;
  const isValidEmail = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z0-9]{2,5}$/;
  if (data.authfield.indexOf('@') === -1) {
    if (!isNumberString.test(data.authfield)) {
      messages.push('Invalid username');
    }
  } else if (!isValidEmail.test(data.authfield)) {
    messages.push('Invalid email address ');
  }
  const resp = {
    isError: (messages.length > 0),
    messages
  };
  return resp;
}

// Validate Password update
function validatePasswordUpdate(data) {
  const messages = [];
  if ((!data.password) || (!data.password_confirmation)) {
    messages.push('Please fill all required fields.');
  }
  if (data.password && data.password_confirmation) {
    if (data.password !== data.password_confirmation) {
      messages.push('Password fields do not match.');
    }
  }

  const resp = {
    isError: (messages.length > 0),
    messages
  };
  return resp;
}

// Validate shipping calculator
function validateShippingCalculator(data) {
  const messages = [];
  if (!data.shipments_attributes.zipcode &&
    !data.shipments_attributes.state_id &&
    !data.shipments_attributes.country_id) {
    messages.push('Please fill all fields.');
  }

  const resp = {
    isError: (messages.length > 0),
    messages
  };
  return resp;
}

// Validate Promo code
function validatePromoCode(data) {
  const messages = [];
  if (!data) {
    messages.push('Please enter a promo code.');
  }

  const resp = {
    isError: (messages.length > 0),
    messages
  };
  return resp;
}

function validateReview(data) {
  const messages = [];
  const isValidEmail = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z0-9]{2,5}$/;
  if (!data.review) {
    messages.push('Review is required');
  }
  if (!data.name) {
    messages.push('Name is required');
  }
  if (!data.email) {
    messages.push('Email is required');
  } else if (!isValidEmail.test(data.email)) {
    messages.push('Invalid email address');
  }

  const resp = {
    isError: (messages.length > 0),
    messages
  };
  return resp;
}

function validateRegisterCheckout(data) {
  const messages = [];
  const isValidEmail = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z0-9]{2,5}$/;
  const address = data.billing;
  if (!address.firstname) {
    messages.push('First Name is a required field.');
  }
  if (!address.lastname) {
    messages.push('Last Name is a required field.');
  }
  if (!data.email) {
    messages.push('Email is a required field.');
  } else if (!isValidEmail.test(data.email)) {
    messages.push('You must enter a valid email address.');
  }
  if (!address.phone) {
    messages.push('Phone is a required field.');
  } else if (!validPhone(address.phone)) {
    messages.push('Please enter a valid phone number.');
  }
  if (!address.address1) {
    messages.push('Address is a required field.');
  }
  if (!address.city) {
    messages.push('City is a required field.');
  }
  if (address.state === 0) {
    messages.push('State is a required field.');
  }
  if (!address.zip) {
    messages.push('ZIP is a required field.');
  } else if (address.zip.length < 5) {
    messages.push('Please enter a valid postcode/ZIP.');
  } else if (isNaN(Number(address.zip))) {
    messages.push('Please enter a valid postcode/ZIP.');
  }
  const resp = {
    isError: (messages.length > 0),
    messages
  };
  return resp;
}

export {
  validateAuth,
  validateProduct,
  validateAccountEdit,
  testPasswordStrength,
  validateContactForm,
  validateMandatoryFieldsAddress,
  validateLostPassword,
  validateAccountUpdate,
  validatePasswordUpdate,
  validateShippingCalculator,
  validatePromoCode,
  validatePasswordEmail,
  validateReview,
  validateRegisterCheckout
};
