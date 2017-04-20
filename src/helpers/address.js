/**
 * Map values from states and return Address feed
 * @param data
 * @returns object
 */
function mapStateToFeed(data) {
  return {
    firstname: data.firstname,
    lastname: data.lastname,
    address1: data.address1,
    address2: data.address2,
    company: data.company,
    city: data.city,
    country_id: data.country,
    state_id: data.state,
    zipcode: data.zipcode,
    phone: data.phone
  };
}

/**
 * Map Address feed to state
 * @param data
 * @param email
 * @returns object
 */
function mapFeedToState(data, email) {
  return {
    firstname: data.firstname,
    lastname: data.lastname,
    address1: data.address1,
    address2: data.address2,
    company: data.company,
    city: data.city,
    country: data.country_id,
    state: data.state_id,
    zipcode: data.zipcode,
    phone: data.phone,
    email
  };
}

export {
  mapFeedToState,
  mapStateToFeed
};
