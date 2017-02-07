import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

import BasePageComponent from '../BasePageComponent';
import Contact from './Contact';

// Actions
import { setHeaderProps, resetMessages, toggleLoader } from '../../actions/page';
import sendContact from '../../actions/contact';

const mapStateToProps = ((state) => (
  {
    isSent: state.contact.isSent,
    message: state.contact.message,
    messages: state.page.messages,
  }
));

const mapDispatchToProps = ((dispatch) => (
  {
    setHeaderProps: (props) => dispatch(setHeaderProps(props)),
    toggleLoader: (toggle) => dispatch(toggleLoader(toggle)),
    resetMessages: () => dispatch(resetMessages()),
    sendContact: (data) => dispatch(sendContact(data)),
  }
));

class ContactWrapper extends BasePageComponent {

  static propTypes = {
    setHeaderProps: PropTypes.func.isRequired,
    toggleLoader: PropTypes.func.isRequired,
    sendContact: PropTypes.func.isRequired,
    isSent: PropTypes.bool.isRequired,
    messages: PropTypes.array.isRequired,
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
    return (
      <Contact
        sendContact={this.props.sendContact}
        isSent={this.props.isSent}
        message={this.props.message}
        messages={this.props.messages}
      />
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ContactWrapper);

