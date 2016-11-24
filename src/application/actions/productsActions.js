import axios from "axios";

export function fetchProducts() {
  return function(dispatch) {
    axios.get("http://staging.ecomm.com/api/products?token=3637b8b39f4a33a248c4f296436d49b0ad45f60ffaacdef1")
      .then((response) => {
      	// console.log("RESPONSE: ", response);
        dispatch({type: "FETCH_PRODUCTS_FULFILLED", payload: response.data})
      })
      .catch((err) => {
        dispatch({type: "FETCH_PRODUCTS_REJECTED", payload: err})
      })
  }
}