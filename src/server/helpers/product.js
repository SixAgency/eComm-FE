import PRODUCTS from '../../constants/ProductConsts';

/**
 * Set of helper methods for products
 */
const ProductUtils = {
  // Return filtered products based on given filter
  filterProducts: (args) => {
    const { products, filter, value } = args;
    // Check if the filter is defined in constants
    if (PRODUCTS[value]) {
      return products.filter((product) => (product[filter] && PRODUCTS[value]
        .includes(product[filter])));
    }
    // Empty response for undefined filters
    return [];
  }
};

export default ProductUtils;
