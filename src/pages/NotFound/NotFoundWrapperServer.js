import React, { PropTypes } from 'react';
import NotFound from './NotFound';

class NotFoundWrapper extends React.Component {

  static propTypes = {
    setHeaderProps: PropTypes.func.isRequired,
  }

  static defaultProps = {
    setHeaderProps: () => (true),
  }

  render() {
    console.log('server');
    return (
      <NotFound />
    );
  }
}

export default NotFoundWrapper;

