import React from 'react';
import Contact from './Contact';

class ContactWrapper extends React.Component {
  render() {
    const isError = false;
    const isSent = false;
    const messages = [];
    return (
      <Contact
        sendContact={() => (true)}
        isError={isError}
        isSent={isSent}
        messages={messages}
      />
    );
  }
}

export default ContactWrapper;

