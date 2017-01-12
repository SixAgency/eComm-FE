import React, { PropTypes } from 'react';
import Contact from './Contact';

class ContactWrapper extends React.Component {

  static propTypes = {
    setHeaderProps: PropTypes.func.isRequired,
  }

  static defaultProps = {
    setHeaderProps: () => (true),
  }

  render() {
    console.log('server');
    return (
      <Contact />
    );
  }
}

export default ContactWrapper;

