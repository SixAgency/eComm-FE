import React from 'react';
import MannequinHeads from './MannequinHeads';

class MannequinHeadsWrapper extends React.Component {

  static defaultProps = {
    products: [],
    addToCart: (item) => (item),
  }

  render() {
    console.log('server');
    return (
      <MannequinHeads {...this.props} />
    );
  }
}

export default MannequinHeadsWrapper;

