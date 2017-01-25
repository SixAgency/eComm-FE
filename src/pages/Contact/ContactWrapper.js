import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import Contact from './Contact';
// Actions
import { setHeaderProps, resetMessages, toggleLoader } from '../../actions/page';
import sendContact from '../../actions/contact';

const mapStateToProps = ((state) => (
  {
    isSent: state.contact.isSent,
    message: state.contact.message,
  }
));

const mapDispatchToProps = ((dispatch) => (
  {
    setHeaderProps: (props) => dispatch(setHeaderProps(props)),
    toggleLoader: (toggle) => dispatch(toggleLoader(toggle)),
    resetMessages: () => dispatch(resetMessages()),
    sendContact: () => dispatch(sendContact()),
  }
));
class ContactWrapper extends React.Component {

  static propTypes = {
    setHeaderProps: PropTypes.func.isRequired,
    toggleLoader: PropTypes.func.isRequired,
    sendContact: PropTypes.func.isRequired,
    isSent: PropTypes.bool.isRequired,
    message: PropTypes.string.isRequired,
  }

  componentWillMount = () => {
    const props = {
      headerClass: 'colored',
      activeSlug: '/contact',
    };
    this.props.setHeaderProps(props);
  }

  componentDidMount = () => {
    setTimeout(() => {
      this.props.toggleLoader(false);
    }, 500);
  }

  componentWillUnmount = () => {
    console.log('remove');
    this.props.toggleLoader(true);
  }

  render() {
    console.log('client');
    return (
      <Contact
        sendContact={this.props.sendContact}
        isSent={this.props.isSent}
        message={this.props.message}
      />
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ContactWrapper);

