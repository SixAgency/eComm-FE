// Restricts the quantity of products that can be added to cart
function checkQuantities(args) {
  const { id, quantity, items } = args;
  const product = items.filter((item) => (id === item.variant.product_id));
  let cartQuantity = 0;
  product.forEach((item) => {
    cartQuantity += item.quantity;
  });
  if (product.length) {
    console.log(product[0].variant.max_quantity_allowed_in_cart, cartQuantity);
  }
  return !(product.length &&
    (product[0].variant.max_quantity_allowed_in_cart < cartQuantity + quantity)
  );
}
export default checkQuantities;
