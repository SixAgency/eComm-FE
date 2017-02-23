/**
 * Set error/success messages - helper
 * @param message: object
 * @returns {{type: string, payload: object}}
 */
function setMessage(messages) {
  console.info(messages); // eslint-disable-line no-console
  return { type: 'SET_MESSAGES', payload: messages };
}

/**
 * Set the header props
 * @param props
 * @returns {function(*)}
 */
function setHeaderProps(props) {
  return (dispatch) => {
    dispatch({ type: 'SET_HEADER_PROPS', payload: props });
  };
}

/**
 * Helper method to reset messages to initial state
 * @returns {function(*)}
 */
function resetMessages() {
  return (dispatch) => {
    dispatch({ type: 'RESET_MESSAGES', payload: { isError: false, messages: [] } });
  };
}

/**
 * Helper - Set redux loading state
 * @param toggle - boolen
 */
function setLoader(toggle) {
  return { type: 'TOGGLE_LOADER', payload: toggle };
}

/**
 * Helper - Set redux loading state
 * @param toggle - boolen
 */
function setPending(toggle) {
  return { type: 'SET_PENDING', payload: toggle };
}

/**
 * Toggle loading screen based on value
 * @param toggle - boolean
 * @returns {function(*)}
 */
function toggleLoader(toggle) {
  return (dispatch) => {
    dispatch(setLoader(toggle));
  };
}

/**
 * Toggle mobile navigaion
 * @param toggle - boolean
 */
function toggleMobileNavigation(toggle) {
  return (dispatch) => {
    dispatch({ type: 'TOGGLE_MOBILE_NAV', payload: toggle });
  };
}

export {
  setHeaderProps,
  resetMessages,
  toggleLoader,
  setMessage,
  setLoader,
  setPending,
  toggleMobileNavigation
};
