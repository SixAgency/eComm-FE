import React, { PropTypes } from 'react';
import Category from './Category';

class CategoryWrapper extends React.Component {

  static propTypes = {
    categoryItems: PropTypes.object.isRequired
  };

  render() {
    const isError = false;
    const cartItems = {
      cart: {
        line_items: []
      }
    };
    return (
      <Category
        gridItems={this.props.categoryItems}
        addToCart={() => (true)}
        setMessage={() => (true)}
        isError={isError}
        messages={[]}
        cartItems={cartItems}
      />
    );
  }
}

export default CategoryWrapper;
