import React, { PropTypes } from 'react';
import ErrorPage from './ErrorPage';

class ErrorWrapper extends React.Component {

  static propTypes = {
    setHeaderProps: PropTypes.func.isRequired,
    error: PropTypes.object.isRequired,
  }

  static defaultProps = {
    setHeaderProps: () => (true),
  }

  render() {
    console.log('server');
    return (
      <ErrorPage error={this.props.error} />
    );
  }
}

export default ErrorWrapper;

