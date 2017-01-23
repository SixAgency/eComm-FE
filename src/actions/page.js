/**
 * Set error/success messages - helper
 * @param message: object
 * @returns {{type: string, payload: object}}
 */
function setMessage(messages) {
  console.info(messages); // eslint-disable-line no-console
  return { type: 'SET_MESSAGES', payload: messages };
}

function setHeaderProps(props) {
  return (dispatch) => {
    dispatch({ type: 'SET_HEADER_PROPS', payload: props });
  };
}

function resetMessages() {
  return (dispatch) => {
    dispatch({ type: 'RESET_MESSAGES', payload: {} });
  };
}

function toggleLoader(toggle) {
  return (dispatch) => {
    dispatch({ type: 'TOGGLE_LOADER', payload: toggle });
    // setTimeout(() => {
    //   dispatch({ type: 'TOGGLE_LOADER', payload: toggle });
    // }, 500);
  };
}


export { setHeaderProps, resetMessages, toggleLoader, setMessage };
