import React, { PropTypes } from 'react';
import ErrorPage from './ErrorPage';

class ErrorPageWrapper extends React.Component {

  static propTypes = {
    setHeaderProps: PropTypes.func.isRequired,
  }

  static defaultProps = {
    setHeaderProps: () => (true),
  }

  render() {
    return (
      <ErrorPage />
    );
  }
}

export default ErrorPageWrapper;
