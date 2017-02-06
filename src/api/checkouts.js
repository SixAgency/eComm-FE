import { apiFetch } from '../core/fetch';
import { setError, checkResponse, setCheckoutResponse } from './helpers/handlers';
import { faketoken } from '../config';
import conslog from '../utils/dev';

const CHECKOUT = '/api/v1/checkouts';

// Next Checkout Step
function checkoutNext(request) {
  const orderNumber = request.session.orderNumber;
  return apiFetch(`${CHECKOUT}/${orderNumber}/next`,
    {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'X-Spree-Token': request.session.token || faketoken,
      },
    })
  .then((response) => checkResponse(response))
  .then((resp) => setCheckoutResponse(resp))
  .catch((err) => setError(err));
}

function checkoutNextDelivery(request) {
  const data = request.body;
  const orderNumber = request.session.orderNumber;
  return apiFetch(`${CHECKOUT}/${orderNumber}`,
    {
      method: 'PUT',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
        'X-Spree-Token': request.session.token || faketoken,
      },
    })
  .then((response) => checkResponse(response))
  .then((resp) => setCheckoutResponse(resp))
  .catch((err) => setError(err));
}

export { checkoutNext, checkoutNextDelivery };
