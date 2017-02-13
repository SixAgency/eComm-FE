import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import capitalize from 'lodash.capitalize';

import Category from './Category';
// Actions
import { setHeaderProps, resetMessages, toggleLoader } from '../../actions/page';
import { getProductsInCategory } from '../../actions/catalog';
import { addToCart } from '../../actions/order';

const mapStateToProps = ((state) => (
  {
    categoryItems: state.catalog.categoryItems,
  }
));

const mapDispatchToProps = ((dispatch) => (
  {
    setHeaderProps: (props) => dispatch(setHeaderProps(props)),
    toggleLoader: (toggle) => dispatch(toggleLoader(toggle)),
    getProductsInCategory: (slug) => dispatch(getProductsInCategory(slug)),
    addToCart: (item) => dispatch(addToCart(item)),
    resetMessages: () => dispatch(resetMessages()),
  }
));

class CategoryWrapper extends React.Component {

  static propTypes = {
    categoryItems: PropTypes.object.isRequired,
    toggleLoader: PropTypes.func.isRequired,
    getProductsInCategory: PropTypes.func.isRequired,
    setHeaderProps: PropTypes.func.isRequired,
    addToCart: PropTypes.func.isRequired,
    params: PropTypes.object.isRequired,
    route: PropTypes.object.isRequired,
  }

  componentWillMount = () => {
    const props = {
      headerClass: 'default',
      activeSlug: '/',
    };
    this.props.setHeaderProps(props);
    if (this.props.categoryItems.isLoaded) {
      console.log(this.props.categoryItems);
    } else {
      this.props.getProductsInCategory(this.props.params.slug);
    }
    if (this.props.categoryItems.slug !== this.props.params.slug) {
      this.props.getProductsInCategory(this.props.params.slug);
    }
  }

  componentDidMount = () => {
    const { isLoaded } = this.props.categoryItems;
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
      this.props.getProductsInCategory(this.props.params.slug);
    } else {
      const { isLoaded } = nextProps.categoryItems;
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
    document.title = `${capitalize(this.props.params.slug)} Archives - krissorbie`;
    return (
      <Category gridItems={this.props.categoryItems} addToCart={this.props.addToCart} />
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CategoryWrapper);
