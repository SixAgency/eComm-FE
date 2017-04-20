// Restricts the quantity of products that can be added to cart
function checkQuantities(args) {
  const { id, quantity, items } = args;
  const product = items.filter((item) => (id === item.variant_id));
  return !(product.length &&
    (product[0].variant.max_quantity_allowed_in_cart < (product[0].quantity + quantity))
  );
}
export default checkQuantities;
