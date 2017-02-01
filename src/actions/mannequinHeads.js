import axios from 'axios';

function getProducts() {
  return (dispatch) => {
    axios.get('/api/mannequinHeads')
    .then((res) => {
      dispatch({ type: 'GET_MANNEQUINHEADS_SUCCESS', payload: res.data });
    })
    .catch((err) => {
      dispatch({ type: 'GET_MANNEQUINHEADS_ERROR', payload: err.message });
    });
  };
}

export default getProducts;

