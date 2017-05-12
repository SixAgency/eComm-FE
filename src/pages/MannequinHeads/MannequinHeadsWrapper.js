import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

import BasePageComponent from '../BasePageComponent';
import MannequinHeads from './MannequinHeads';

// Actions
import { toggleLoader, setMessage } from '../../actions/page';
import { getMannequinHeads, getProduct } from '../../actions/catalog';
import { addToCart } from '../../actions/order';

const mapStateToProps = ((state) => (
  {
    products: state.catalog.mannequinHeads,
    messages: state.page.messages,
    isError: state.page.isError,
    showLoader: state.page.showLoader,
    cartItems: state.cart.cartItems,
    isPending: state.page.isPending
  }
));

const mapDispatchToProps = ((dispatch) => (
  {
    toggleLoader: (toggle, image) => dispatch(toggleLoader(toggle, image)),
    getMannequinHeads: () => dispatch(getMannequinHeads()),
    addToCart: (item) => dispatch(addToCart(item)),
    setMessage: (message) => dispatch(setMessage(message)),
    getProduct: (slug) => dispatch(getProduct(slug))
  }
));

class MannequinHeadsWrapper extends BasePageComponent {

  static propTypes = {
    toggleLoader: PropTypes.func.isRequired,
    products: PropTypes.object.isRequired,
    cartItems: PropTypes.object.isRequired,
    getMannequinHeads: PropTypes.func.isRequired,
    showLoader: PropTypes.object.isRequired,
    addToCart: PropTypes.func.isRequired,
    isPending: PropTypes.bool.isRequired,
    getProduct: PropTypes.func.isRequired
  };

  componentWillMount = () => {
    if (!this.props.products.isLoaded) {
      this.props.getMannequinHeads();
    }
  };

  componentDidMount = () => {
    if (this.props.products.isLoaded && !this.props.isPending) {
      setTimeout(() => {
        this.props.toggleLoader(false);
      }, 500);
    }
  };

  componentWillReceiveProps = (nextProps) => {
    const { isLoaded } = nextProps.products;
    if (isLoaded && nextProps.showLoader.toggle && !nextProps.isPending) {
      setTimeout(() => {
        this.props.toggleLoader(false);
      }, 250);
    }
  };

  componentWillUnmount = () => {
    if (!this.props.showLoader.toggle) {
      this.props.toggleLoader(true);
    }
  };

  render() {
    return (
      <MannequinHeads
        products={this.props.products}
        addToCart={this.props.addToCart}
        cartItems={this.props.cartItems}
        setMessage={this.props.setMessage}
        messages={this.props.messages}
        toggleLoader={this.props.toggleLoader}
        isError={this.props.isError}
        getProduct={this.props.getProduct}
      />
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MannequinHeadsWrapper);

