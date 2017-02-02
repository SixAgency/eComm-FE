import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import MannequinHeads from './MannequinHeads';
// Actions
import { toggleLoader } from '../../actions/page';
import getProducts from '../../actions/mannequinHeads';
import { addToCart } from '../../actions/order';

const mapStateToProps = ((state) => (
  {
    products: state.mannequinHeads.products,
  }
));

const mapDispatchToProps = ((dispatch) => (
  {
    toggleLoader: (toggle) => dispatch(toggleLoader(toggle)),
    getProducts: () => dispatch(getProducts()),
    addToCart: (item) => dispatch(addToCart(item)),
  }
));

class MannequinHeadsWrapper extends Component {

  static propTypes = {
    toggleLoader: PropTypes.func.isRequired,
    products: PropTypes.array.isRequired,
    getProducts: PropTypes.func.isRequired,
    addToCart: PropTypes.func.isRequired,
  }

  componentWillMount = () => {
    if (this.props.products.length === 0) {
      this.props.getProducts();
    }
  }

  componentDidMount = () => {
    setTimeout(() => {
      this.props.toggleLoader(false);
    }, 500);
  }

  componentWillUnmount = () => {
    console.log('remove');
    this.props.toggleLoader(true);
  }

  render() {
    console.log('client');
    return (
      <MannequinHeads products={this.props.products} addToCart={this.props.addToCart} />
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MannequinHeadsWrapper);

