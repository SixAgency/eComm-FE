// Restricts the quantity of products that can be added to cart
function checkQuantities(args, cart) {
  const { id, quantity, items } = args;
  console.log('QTY ID', id);
  const product = items.filter((item) => (id === item.variant.product_id));
  let cartQuantity = 0;
  product.forEach((item) => {
    cartQuantity += parseInt(item.quantity, 10);
  });
  if (cart) {
    return !(product.length &&
      (product[0].variant.max_quantity_allowed_in_cart < cartQuantity)
    );
  }
  return !(product.length &&
      (product[0].variant.max_quantity_allowed_in_cart < cartQuantity + quantity)
    );
}

function checkQuantitiesCart(items) {
  const messages = [];
  items.forEach((item) => {
    const data = {
      id: item.variant.product_id,
      quantity: item.quantity,
      items
    };
    if (!checkQuantities(data, true)) {
      const message =
        `You may only purchase a maximum of ${item.variant.max_quantity_allowed_in_cart} ${item.variant.name} at one time.`;
      if (!messages.find((msg) => (msg === message))) {
        messages.push(message);
      }
    }
  });
  return messages;
}

export { checkQuantities, checkQuantitiesCart };
