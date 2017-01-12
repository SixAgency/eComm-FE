import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import NotFound from './NotFound';
// Actions
import setHeaderProps from '../../actions/page';

const mapDispatchToProps = ((dispatch) => (
  {
    setHeaderProps: (props) => dispatch(setHeaderProps(props)),
  }
));
class NotFoundWrapper extends React.Component {

  static propTypes = {
    setHeaderProps: PropTypes.func.isRequired,
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
      <NotFound />
    );
  }
}

export default connect(null, mapDispatchToProps)(NotFoundWrapper);

