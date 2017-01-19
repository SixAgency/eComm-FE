import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import Category from './Category';
// Actions
import { setHeaderProps, resetMessages, toggleLoader } from '../../actions/page';
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
    toggleLoader: (toggle) => dispatch(toggleLoader(toggle)),
    getProducts: () => dispatch(getProducts()),
    addToCart: (item) => dispatch(addToCart(item)),
    resetMessages: () => dispatch(resetMessages()),
  }
));
class CategoryWrapper extends React.Component {

  static propTypes = {
    gridItems: PropTypes.object.isRequired,
    toggleLoader: PropTypes.func.isRequired,
    getProducts: PropTypes.func.isRequired,
    setHeaderProps: PropTypes.func.isRequired,
    addToCart: PropTypes.func.isRequired,
    params: PropTypes.object.isRequired,
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

  componentDidMount = () => {
    const { isLoaded } = this.props.gridItems;
    if (isLoaded) {
      setTimeout(() => {
        this.props.toggleLoader(false);
      }, 500);
    }
  }

  componentWillReceiveProps = (nextProps) => {
    console.log('next');
    console.log(nextProps);
    if (this.props.params.slug !== nextProps.params.slug) {
      this.props.toggleLoader(true);
      this.props.getProducts();
    } else {
      const { isLoaded } = nextProps.gridItems;
      if (isLoaded) {
        setTimeout(() => {
          this.props.toggleLoader(false);
        }, 250);
      }
    }
  }

  componentWillUnmount = () => {
    this.props.toggleLoader(true);
  }

  render() {
    console.log('client');
    return (
      <Category gridItems={this.props.gridItems} addToCart={this.props.addToCart} />
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CategoryWrapper);
