import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

import BasePageComponent from '../BasePageComponent';
import ErrorPage from './ErrorPage';

// Actions
import { setHeaderProps, toggleLoader } from '../../actions/page';

const mapDispatchToProps = ((dispatch) => (
  {
    setHeaderProps: (props) => dispatch(setHeaderProps(props)),
    toggleLoader: (toggle) => dispatch(toggleLoader(toggle)),
  }
));

class ErrorPageWrapper extends BasePageComponent {
  static propTypes = {
    setHeaderProps: PropTypes.func.isRequired,
    toggleLoader: PropTypes.func.isRequired,
  }

  componentWillMount = () => {
    const props = {
      headerClass: 'black',
      activeSlug: '/',
    };
    this.props.setHeaderProps(props);
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

// export default (ErrrorPageWrapper);
export default connect(null, mapDispatchToProps)(ErrorPageWrapper);
