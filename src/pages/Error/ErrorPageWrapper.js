import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import ErrorPage from './ErrorPage';
// Actions
import { toggleLoader } from '../../actions/page';

const mapDispatchToProps = ((dispatch) => (
  {
    toggleLoader: (toggle) => dispatch(toggleLoader(toggle)),
  }
));

class ErrorPageWrapper extends React.Component {
  static propTypes = {
    toggleLoader: PropTypes.func.isRequired,
  }

  componentDidMount = () => {
    setTimeout(() => {
      this.props.toggleLoader(false);
    }, 500);
  }

  componentWillUnmount = () => {
    this.props.toggleLoader(true);
  }

  render() {
    return (
      <ErrorPage />
    );
  }
}

export default connect(null, mapDispatchToProps)(ErrorPageWrapper);
