/**
 * REDUX actions
 * @type {{address: string}}
 */
const ACTION_TYPES = {
  address: 'ADDRESS'
};

/**
 * Default state values
 * @type Object
 */
const DEFAULT_VALUES = {
  address: {
    id: 0,
    firstname: '',
    lastname: '',
    company: '',
    phone: '',
    address1: '',
    address2: '',
    city: '',
    state: 0,
    country: 232,
    zip: ''
  }
};

export {
  ACTION_TYPES,
  DEFAULT_VALUES
};
