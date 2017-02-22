import React, { PropTypes } from 'react';
import Biography from './Biography';

class BiographyWrapper extends React.Component {

  static propTypes = {
    setHeaderProps: PropTypes.func.isRequired
  }

  static defaultProps = {
    setHeaderProps: () => (true)
  }

  render() {
    console.log('server');
    return (
      <Biography />
    );
  }
}

export default BiographyWrapper;

