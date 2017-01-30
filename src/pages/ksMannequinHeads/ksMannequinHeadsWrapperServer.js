import React, { PropTypes } from 'react';
import ksMannequinHeads from './ksMannequinHeads';

class ksMannequinHeadsWrapper extends React.Component {

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
      <ksMannequinHeads {...this.props} />
    );
  }
}

export default ksMannequinHeadsWrapper;

