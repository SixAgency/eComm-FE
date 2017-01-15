import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import Home from './Home';
// Actions
import setHeaderProps from '../../actions/page';
import { getProducts } from '../../actions/catalog';
import { addToCart } from '../../actions/order';

const mapStateToProps = ((state) => (
  {
    gridItems: state.catalog.gridItems,
  }
));
const mapDispatchToProps = ((dispatch) => (
  {
    setHeaderProps: (props) => dispatch(setHeaderProps(props)),
    getProducts: () => dispatch(getProducts()),
    addToCart: (item) => dispatch(addToCart(item)),
  }
));
class HomeWrapper extends React.Component {

  static propTypes = {
    gridItems: PropTypes.object.isRequired,
    getProducts: PropTypes.func.isRequired,
    setHeaderProps: PropTypes.func.isRequired,
    addToCart: PropTypes.func.isRequired,
  }

  static defaultProps = {
    gridItems: { isLoaded: false, products: [] },
  }

  componentWillMount = () => {
    const props = {
      headerClass: 'default',
      activeSlug: '/',
    };
    this.props.setHeaderProps(props);
    if (this.props.gridItems.isLoaded) {
      console.log(this.props.gridItems);
    } else {
      this.props.getProducts();
    }
  }

  render() {
    console.log('client');
    return (
      <Home gridItems={this.props.gridItems} addToCart={this.props.addToCart} />
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeWrapper);
