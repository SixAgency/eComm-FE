/* eslint-disable no-trailing-spaces */
import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

import BasePageComponent from '../BasePageComponent';
import Home from './Home';

// Actions
import {
  setHeaderProps,
  resetMessages,
  toggleLoader,
  setMessage
} from '../../actions/page';
import { getProducts } from '../../actions/catalog';
import { addToCart } from '../../actions/order';

const mapStateToProps = ((state) => (
  {
    gridItems: state.catalog.gridItems,
    cartItems: state.cart.cartItems,
    messages: state.page.messages,
    showLoader: state.page.showLoader,
    isCartPending: state.cart.isCartPending
  }
));

const mapDispatchToProps = ((dispatch) => (
  {
    setHeaderProps: (props) => dispatch(setHeaderProps(props)),
    toggleLoader: (toggle, image) => dispatch(toggleLoader(toggle, image)),
    getProducts: () => dispatch(getProducts()),
    addToCart: (item) => dispatch(addToCart(item)),
    resetMessages: () => dispatch(resetMessages()),
    setMessage: (message) => dispatch(setMessage(message))
  }
));

class HomeWrapper extends BasePageComponent {

  static propTypes = {
    gridItems: PropTypes.object.isRequired,
    getProducts: PropTypes.func.isRequired,
    setHeaderProps: PropTypes.func.isRequired,
    toggleLoader: PropTypes.func.isRequired,
    addToCart: PropTypes.func.isRequired,
    cartItems: PropTypes.object.isRequired,
    setMessage: PropTypes.func.isRequired,
    messages: PropTypes.array.isRequired,
    showLoader: PropTypes.object.isRequired,
    isCartPending: PropTypes.bool.isRequired
  };

  static defaultProps = {
    gridItems: { isLoaded: false, products: [] }
  };

  componentWillMount = () => {
    const props = {
      headerClass: 'default',
      activeSlug: '/'
    };
    this.props.setHeaderProps(props);
    if (this.props.gridItems.isLoaded) {
      console.log(this.props.gridItems);
    } else {
      this.props.getProducts();
    }
    this.props.resetMessages();
  };

  componentDidMount = () => {
    const { isLoaded } = this.props.gridItems;
    if (isLoaded) {
      setTimeout(() => {
        this.props.toggleLoader(false);
      }, 500);
    }
  };

  componentWillReceiveProps = (nextProps) => {
    const { isLoaded } = nextProps.gridItems;
    const { isCartPending } = nextProps;
    if (isLoaded && !isCartPending && this.props.showLoader.toggle) {
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
    if (this.props.cartItems.isLoaded) {
      return (
        <Home
          gridItems={this.props.gridItems}
          addToCart={this.props.addToCart}
          cartItems={this.props.cartItems.cart.line_items}
          messages={this.props.messages}
          setMessage={this.props.setMessage}
          toggleLoader={this.props.toggleLoader}
        />
      );
    }
    return null;
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeWrapper);
