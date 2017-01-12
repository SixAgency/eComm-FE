import axios from 'axios';

function checkLogin() {
  return (dispatch) => {
    axios.get('/api/check')
      .then(resp => dispatch({ type: 'GET_CART_SUCCESS', payload: resp.data }))
      .catch(err => dispatch({ type: 'GET_CART_ERROR', payload: err }));
  };
}

function onLogout(data) {
  return (dispatch) => {
    axios.post('/api/addtocart', data)
      .then(resp => {
        dispatch({ type: 'ADD_CART_SUCCESS', payload: resp });
      })
      .catch(err => dispatch({ type: 'ADD_CART_ERROR', payload: err }));
  };
}

function onLogin() {
  return (dispatch) => {
    dispatch({ type: 'ADD_CART_SUCCESS', payload: response });
  };
}

function onRegister() {
  return (dispatch) => {
    dispatch({ type: 'ADD_CART_SUCCESS', payload: response });
  };
}

export { onLogout, onLogin, onRegister, checkLogin };
