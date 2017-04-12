import React, { PropTypes } from 'react';
import Category from './Category';

class CategoryWrapper extends React.Component {

  static propTypes = {
    categoryItems: PropTypes.object.isRequired
  };

  render() {
    return (
      <Category
        gridItems={this.props.categoryItems}
        addToCart={() => (true)}
      />
    );
  }
}

export default CategoryWrapper;
