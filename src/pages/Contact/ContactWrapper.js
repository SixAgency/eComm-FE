import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import Contact from './Contact';
// Actions
import { setHeaderProps, resetMessages } from '../../actions/page';

const mapDispatchToProps = ((dispatch) => (
  {
    setHeaderProps: (props) => dispatch(setHeaderProps(props)),
    resetMessages: () => dispatch(resetMessages()),
  }
));
class ContactWrapper extends React.Component {

  static propTypes = {
    setHeaderProps: PropTypes.func.isRequired,
  }

  componentWillMount = () => {
    const props = {
      headerClass: 'colored',
      activeSlug: '/contact',
    };
    this.props.setHeaderProps(props);
  }

  render() {
    console.log('client');
    return (
      <Contact />
    );
  }
}

export default connect(null, mapDispatchToProps)(ContactWrapper);

