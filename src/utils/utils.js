import { NAV, ORDER_STATES } from '../constants/AppConsts';

function setNavigation(slug) {
  const navItems = [...NAV];
  Array.from(navItems).map((item) => (item.isActive = (slug === item.slug)));
  return navItems;
}

// Helper function - used to set order state
function getOrderState(state, refunded, shipment) {
  const states = ORDER_STATES;
  if (refunded || state === 'canceled') {
    return 'Canceled';
  }
  return states[shipment] || '';
}

export { setNavigation, getOrderState };

