function filterShipments(shipments) {
  const newShipments = [];
  shipments.forEach((ship) => {
    if (ship.selected_shipping_rate.name !== 'Gift Card' &&
        ship.selected_shipping_rate.name !== 'Free Shipping') {
      newShipments.push(ship);
    }
  });
  console.log('SHIPMENTS', newShipments);
  return newShipments;
}

export default filterShipments;
