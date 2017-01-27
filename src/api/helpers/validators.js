// Validate login/registration data
function validateAuth(data) {
  const reg = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z0-9]{2,5}$/;
  const messages = [];
  if (!data.email) {
    messages.push('Email Address is required');
  }
  if (!reg.test(data.email)) {
    messages.push('You must enter a valid email address');
  }
  if (!data.password) {
    messages.push('Password is required');
  }
  const resp = {
    isError: (messages.length > 0),
    messages,
  };
  return resp;
}

// Validate add/remove cart data
function validateCart(data) {
  const messages = [];
  // const reg = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$/;
  // if (!data.email) {
  //   messages.push('Email Address is required');
  // }
  // if (!reg.test(data.email)) {
  //   messages.push('You must enter a valid email address');
  // }
  // if (!data.password) {
  //   messages.push('Password is required');
  // }
  const resp = {
    isError: (messages.length > 0),
    messages,
  };
  return resp;
}

export { validateAuth, validateCart };
