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
    const messages = [];
    const isError = false;
    return (
      <Home
        gridItems={gridItems}
        addToCart={() => (true)}
        setMessage={() => (true)}
        messages={messages}
        isError={isError}
        cartItems={[]}
      />
    );
  }
}

export default HomeWrapper;
