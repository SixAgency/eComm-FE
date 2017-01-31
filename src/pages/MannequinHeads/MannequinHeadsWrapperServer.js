import React, { PropTypes } from 'react';
import MannequinHeads from './MannequinHeads';

class MannequinHeadsWrapper extends React.Component {

  static propTypes = {
    // setHeaderProps: PropTypes.func.isRequired,
  }

  static defaultProps = {
    setHeaderProps: () => (true),
    sendksMannequinHeads: () => (true),
    isSent: false,
    message: '',
  }

  render() {
    console.log('server');
    return (
      <MannequinHeads {...this.props} />
    );
  }
}

export default MannequinHeadsWrapper;

