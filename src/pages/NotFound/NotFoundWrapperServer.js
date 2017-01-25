import React from 'react';
import NotFound from './NotFound';

class NotFoundWrapper extends React.Component {
  render() {
    console.log('server');
    return (
      <NotFound />
    );
  }
}

export default NotFoundWrapper;

