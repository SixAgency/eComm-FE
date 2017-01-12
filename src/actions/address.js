import axios from 'axios';

function getAddress() {
  return (dispatch) => {
    axios.get('/api/addresses')
      .then(resp => {
        dispatch({ type: 'GET_ADDRESS_SUCCESS', payload: resp });
      })
      .catch(err => dispatch({ type: 'GET_ADDRESS_ERROR', payload: err }));
  };
}

function addAddress() {
  return (dispatch) => {
    // axios.post('/api/billing')
    //   .then(resp => {
    //     dispatch({ type: 'GET_ADDRESS_SUCCESS', payload: resp });
    //   })
    //   .catch(err => dispatch({ type: 'GET_ADDRESS_ERROR', payload: err }));
    dispatch({ type: 'ADD_ADDRESS_SUCCESS', payload: {} });
  };
}

export { getAddress, addAddress };
