import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

import BasePageComponent from '../BasePageComponent';
import MannequinHeads from './MannequinHeads';

// Actions
import { toggleLoader } from '../../actions/page';
import { getMannequinHeads } from '../../actions/catalog';
import { addToCart } from '../../actions/order';

const mapStateToProps = ((state) => (
  {
    products: state.catalog.mannequinHeads
  }
));

const mapDispatchToProps = ((dispatch) => (
  {
    toggleLoader: (toggle) => dispatch(toggleLoader(toggle)),
    getMannequinHeads: () => dispatch(getMannequinHeads()),
    addToCart: (item) => dispatch(addToCart(item))
  }
));

class MannequinHeadsWrapper extends BasePageComponent {

  static propTypes = {
    toggleLoader: PropTypes.func.isRequired,
    products: PropTypes.object.isRequired,
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
      <MannequinHeads products={this.props.products} addToCart={this.props.addToCart} />
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MannequinHeadsWrapper);

