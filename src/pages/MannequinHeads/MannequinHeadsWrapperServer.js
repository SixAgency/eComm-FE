import React from 'react';
import MannequinHeads from './MannequinHeads';

class MannequinHeadsWrapper extends React.Component {

  render() {
    const products = {
      isLoaded: true,
      isEmpty: true,
      products: []
    };
    return (
      <MannequinHeads
        products={products}
        addToCart={() => (true)}
      />
    );
  }
}

export default MannequinHeadsWrapper;

