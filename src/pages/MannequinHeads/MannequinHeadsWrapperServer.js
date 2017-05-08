import React from 'react';
import MannequinHeads from './MannequinHeads';

class MannequinHeadsWrapper extends React.Component {

  render() {
    const isError = false;
    const products = {
      isLoaded: true,
      isEmpty: true,
      products: []
    };
    const cartItems = {
      isLoaded: true,
      isEmpty: true,
      cart: {
        line_items: []
      }
    };
    return (
      <MannequinHeads
        products={products}
        cartItems={cartItems}
        toggleLoader={() => (true)}
        messages={[]}
        isError={isError}
        setMessage={() => (true)}
        addToCart={() => (true)}
        getProduct={() => (true)}
      />
    );
  }
}

export default MannequinHeadsWrapper;

