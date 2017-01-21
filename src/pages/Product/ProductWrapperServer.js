import React, { PropTypes, Component} from 'react';
import Product from './Product';

class ProductWrapper extends Component {

  static propTypes = {
    addToCart: PropTypes.func.isRequired,
    getProduct: PropTypes.func.isRequired,
    product: PropTypes.object.isRequired,
    params: PropTypes.object.isRequired,
  }

  static defaultProps = {
    addToCart: () => (true),
    getProduct: () => (true),
  }

  render() {
    const { isLoaded, product } = this.props.product;
    if (!isLoaded) {
      return null;
    }
    return (
      <Product
        product={product}
        onAddToCart={this.props.addToCart}
      />
    );
  }
}

export default ProductWrapper;
