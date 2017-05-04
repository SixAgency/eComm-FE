import ORDER_STATES from '../../constants/OrderConsts';

/**
 * Set of helper methods for order
 */
const OrderUtils = {
  // Get the order state
  getOrderStatus: (args) => {
    const { state, refunded, shipment } = args;
    if (refunded || state === 'canceled') {
      return 'Canceled';
    }
    return ORDER_STATES[shipment] || '';
  }
};

export default OrderUtils;
