function filterShipments(shipments) {
  const newShipments = [];
  shipments.forEach((ship) => {
    if (ship.selected_shipping_rate.name !== 'Gift Card' &&
        ship.selected_shipping_rate.name !== 'Free Shipping' &&
        ship.selected_shipping_rate.name !== 'Appointment Required') {
      newShipments.push(ship);
    }
  });
  return newShipments;
}

export default filterShipments;
