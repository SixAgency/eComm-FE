// Validate login/registration data
function validateAuth(data) {
  const isValidEmail = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z0-9]{2,5}$/;
  const messages = [];
  if (!data.email) {
    messages.push('Email Address is required');
  }
  if (!isValidEmail.test(data.email)) {
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

// Validate Billing/Address Form
function validateMandatoryFieldsAddress(data) {
  const messages = [];
  // const isValidPhoneNumber = /^(\([+]?[0-9]{3}?[0-9]{4}?\)|[+]?[0-9]{2})[ -]?[0-9]{3}[ -]?[0-9]{4}$/;
  if ((!data.firstname) || (!data.lastname) || (!data.phone) ||
    (!data.city) || (!data.state_id) || (!data.zipcode)) {
    console.log(data);
    messages.push('Please fill all the fields');
  }
  // if (!isValidPhoneNumber.test(data.phone)) {
  //   messages.push('Invalid phone number');
  // }
  if (isNaN(Number(data.state_id))) {
    messages.push('Invalid state id');
  }
  if (isNaN(Number(data.zipcode))) {
    messages.push('Invalid zipcode');
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
  const isValidEmail = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z0-9]{2,5}$/;
  const isNumberString = /^[a-zA-Z0-9_. -]*$/;
  if ((!data.name) || (!data.email)) {
    messages.push('Please fill all required fields');
  }
  if (!isNumberString.test(data.name)) {
    messages.push('Invalid name field');
  }
  if (!isValidEmail.test(data.email)) {
    messages.push('Invalid email field');
  }
  if (data.subject) {
    if (!isNumberString.test(data.subject)) {
      messages.push('Invalid characters in the subject field');
    }
  }
  if (data.message) {
    if (!isNumberString.test(data.message)) {
      messages.push('Invalid characters in the message field');
    }
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
  validateShippingCalculator
};
