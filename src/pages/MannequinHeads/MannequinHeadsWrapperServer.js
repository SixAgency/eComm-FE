import React from 'react';
import MannequinHeads from './MannequinHeads';

class MannequinHeadsWrapper extends React.Component {

  static defaultProps = {
    products: {
      isLoaded: true,
      isEmpty: true,
      products: [],
    },
    addToCart: (item) => (item),
  }

  render() {
    return (
      <MannequinHeads {...this.props} />
    );
  }
}

export default MannequinHeadsWrapper;

