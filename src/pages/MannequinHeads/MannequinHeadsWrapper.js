import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

import BasePageComponent from '../BasePageComponent';
import MannequinHeads from './MannequinHeads';

// Actions
import { toggleLoader, setMessage } from '../../actions/page';
import { getMannequinHeads } from '../../actions/catalog';
import { addToCart } from '../../actions/order';

const mapStateToProps = ((state) => (
  {
    products: state.catalog.mannequinHeads,
    messages: state.page.messages,
    isError: state.page.isError,
    cartItems: state.cart.cartItems
  }
));

const mapDispatchToProps = ((dispatch) => (
  {
    toggleLoader: (toggle) => dispatch(toggleLoader(toggle)),
    getMannequinHeads: () => dispatch(getMannequinHeads()),
    addToCart: (item) => dispatch(addToCart(item)),
    setMessage: (message) => dispatch(setMessage(message))
  }
));

class MannequinHeadsWrapper extends BasePageComponent {

  static propTypes = {
    toggleLoader: PropTypes.func.isRequired,
    products: PropTypes.object.isRequired,
    cartItems: PropTypes.object.isRequired,
    getMannequinHeads: PropTypes.func.isRequired,
    addToCart: PropTypes.func.isRequired
  };

  componentWillMount = () => {
    if (!this.props.products.isLoaded) {
      this.props.getMannequinHeads();
    }
  };

  componentDidMount = () => {
    setTimeout(() => {
      this.props.toggleLoader(false);
    }, 500);
  };

  componentWillUnmount = () => {
    this.props.toggleLoader(true);
  };

  render() {
    return (
      <MannequinHeads
        products={this.props.products}
        addToCart={this.props.addToCart}
        cartItems={this.props.cartItems}
        setMessage={this.props.setMessage}
        messages={this.props.messages}
        isError={this.props.isError}
      />
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MannequinHeadsWrapper);

