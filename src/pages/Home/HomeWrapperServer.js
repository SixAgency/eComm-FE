import React, { PropTypes } from 'react';
import Home from './Home';

class HomeWrapper extends React.Component {

  static propTypes = {
    gridItems: PropTypes.object.isRequired
  };

  render() {
    const {
      gridItems
    } = this.props;
    return (
      <Home
        gridItems={gridItems}
        cartItems={[]}
        setMessage={() => (true)}
        messages={[]}
        isError={false}
        addToCart={() => (true)}
        toggleLoader={() => (true)}
        getProduct={() => (true)}
      />
    );
  }
}

export default HomeWrapper;
