function setHeaderProps(props) {
  return (dispatch) => {
    dispatch({ type: 'SET_HEADER_PROPS', payload: props });
  };
}

export default setHeaderProps;
