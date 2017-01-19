import React, { PropTypes } from 'react';
import Home from './Home';

class HomeWrapper extends React.Component {

  static propTypes = {
    gridItems: PropTypes.object.isRequired,
    addToCart: PropTypes.func.isRequired,
  }

  static defaultProps = {
    gridItems: { isLoaded: false, products: [] },
    addToCart: (item) => (item),
  }

  render() {
    console.log('server');
    return (
      <Home gridItems={this.props.gridItems} addToCart={this.props.addToCart} />
    );
  }
}

export default HomeWrapper;
