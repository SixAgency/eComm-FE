import { fetch } from '../fetch';
import { setSuccessResponse } from './response';
import OrderUtils from '../helpers/order';
import UrlUtils from '../helpers/url';

/**
 * Get Order method
 * @param req
 * @returns {Promise}
 */
function getOrder(req) {
  const args = {
    url: UrlUtils.getOrder(req),
    method: 'GET',
    session: req.session
  };
  return fetch(args);
}

/**
 * Get Orders method
 * @param req
 * @returns {Promise}
 */
function getOrders(req) {
  const args = {
    url: UrlUtils.getOrders(),
    method: 'GET',
    session: req.session,
    fn: (data) => {
      const orders = data.orders.map((order) => ({
        id: order.id,
        number: order.number,
        date: order.completed_at,
        total: order.payment_total,
        quantity: order.total_quantity,
        status: OrderUtils.getOrderStatus({
          state: order.state,
          refunded: order.has_refunds,
          shipment: order.shipment_state
        })
      }));
      return setSuccessResponse(orders);
    }
  };
  return fetch(args);
}

export { getOrder, getOrders };
