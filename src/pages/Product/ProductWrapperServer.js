import React, { PropTypes, Component } from 'react';
import Product from './Product';

class ProductWrapper extends Component {

  static propTypes = {
    product: PropTypes.object.isRequired
  };

  render() {
    const { isLoaded, product } = this.props.product;
    if (!isLoaded) {
      return null;
    }
    return (
      <Product
        product={product}
        onAddToCart={() => (true)}
      />
    );
  }
}

export default ProductWrapper;
