import React, { PropTypes, Component } from 'react';
import Product from './Product';

class ProductWrapper extends Component {

  static propTypes = {
    product: PropTypes.object.isRequired,
    messages: PropTypes.array.isRequired,
    isError: PropTypes.bool.isRequired
  };

  static defaultProps = {
    addToCart: () => (true),
    getProduct: () => (true),
    isError: false,
    messages: []
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
        messages={this.props.messages}
        isError={this.props.isError}
        getProduct={() => (true)}
      />
    );
  }
}

export default ProductWrapper;
