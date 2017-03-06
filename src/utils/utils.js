import { NAV, ORDER_STATES } from '../constants/AppConsts';

function setNavigation(slug) {
  const navItems = [...NAV];
  Array.from(navItems).map((item) => (item.isActive = (slug === item.slug)));
  return navItems;
}

// Helper function - used to set order state
function getOrderStatus(state, refunded, shipment) {
  if (refunded || state === 'canceled') {
    return 'Canceled';
  }
  return ORDER_STATES[shipment] || '';
}

export { setNavigation, getOrderStatus };

