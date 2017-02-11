import React, { PropTypes } from 'react';
import Category from './Category';

class CategoryWrapper extends React.Component {

  static propTypes = {
    categoryItems: PropTypes.object.isRequired,
    addToCart: PropTypes.func.isRequired,
  }

  static defaultProps = {
    addToCart: () => (true),
    categoryItems: {},
  }

  render() {
    console.log('server');
    return (
      <Category gridItems={this.props.categoryItems} addToCart={this.props.addToCart} />
    );
  }
}

export default CategoryWrapper;
