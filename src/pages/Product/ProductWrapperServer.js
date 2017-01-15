import React, { PropTypes } from 'react';
import Product from './Product';

class ProductWrapper extends React.Component {

  static propTypes = {
    setHeaderProps: PropTypes.func.isRequired,
    addToCart: PropTypes.func.isRequired,
    getProductRecs: PropTypes.func.isRequired,
    getProduct: PropTypes.func.isRequired,
    product: PropTypes.object.isRequired,
    gridRecs: PropTypes.object.isRequired,
    params: PropTypes.object.isRequired,
  }

  static defaultProps = {
    setHeaderProps: () => (true),
    addToCart: () => (true),
    getProductRecs: () => (true),
    getProduct: () => (true),
    gridRecs: {
      isLoaded: false,
      products: [],
    },
  }

  render() {
    const { isLoaded, product } = this.props.product;
    if (!isLoaded) {
      return null;
    }
    return (
      <Product
        product={product}
        gridRecs={this.props.gridRecs}
        addToCart={this.props.addToCart}
      />
    );
  }
}

export default ProductWrapper;
