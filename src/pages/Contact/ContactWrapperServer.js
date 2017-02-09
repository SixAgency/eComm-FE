import React, { PropTypes } from 'react';
import Contact from './Contact';

class ContactWrapper extends React.Component {

  static propTypes = {
    setHeaderProps: PropTypes.func.isRequired,
  }

  static defaultProps = {
    setHeaderProps: () => (true),
    sendContact: () => (true),
    isError: false,
    isSent: false,
    messages: [],
  }

  render() {
    console.log('server');
    return (
      <Contact {...this.props} />
    );
  }
}

export default ContactWrapper;

