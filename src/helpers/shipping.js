function getShipmentsWithoutGiftcard(shipments) {
  const newShipments = [];
  shipments.forEach((ship) => {
    if (ship.selected_shipping_rate.name !== 'Gift Card') {
      newShipments.push(ship);
    }
  });
  return newShipments;
}

export default getShipmentsWithoutGiftcard;
