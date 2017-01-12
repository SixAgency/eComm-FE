import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import ErrorPage from './ErrorPage';
// Actions
import setHeaderProps from '../../actions/page';

const mapDispatchToProps = ((dispatch) => (
  {
    setHeaderProps: (props) => dispatch(setHeaderProps(props)),
  }
));
class ErrorWrapper extends React.Component {

  static propTypes = {
    setHeaderProps: PropTypes.func.isRequired,
    error: PropTypes.object.isRequired,
  }

  componentWillMount = () => {
    const props = {
      headerClass: 'colored',
      activeSlug: '/',
    };
    this.props.setHeaderProps(props);
  }

  render() {
    console.log('client');
    return (
      <ErrorPage error={this.props.error} />
    );
  }
}

export default connect(null, mapDispatchToProps)(ErrorWrapper);

