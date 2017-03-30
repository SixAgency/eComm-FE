import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

import BasePageComponent from '../BasePageComponent';
import Contact from './Contact';

// Actions
import { setHeaderProps, resetMessages, toggleLoader } from '../../actions/page';
import sendContact from '../../actions/contact';

const mapStateToProps = ((state) => (
  {
    messages: state.page.messages,
    isError: state.page.isError
  }
));

const mapDispatchToProps = ((dispatch) => (
  {
    setHeaderProps: (props) => dispatch(setHeaderProps(props)),
    toggleLoader: (toggle) => dispatch(toggleLoader(toggle)),
    resetMessages: () => dispatch(resetMessages()),
    sendContact: (data, callback) => dispatch(sendContact(data, callback))
  }
));

class ContactWrapper extends BasePageComponent {

  static propTypes = {
    setHeaderProps: PropTypes.func.isRequired,
    toggleLoader: PropTypes.func.isRequired,
    sendContact: PropTypes.func.isRequired,
    isError: PropTypes.bool.isRequired,
    messages: PropTypes.array.isRequired
  }

  componentWillMount = () => {
    const props = {
      headerClass: 'colored',
      activeSlug: '/contact'
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
        isError={this.props.isError}
        message={this.props.message}
        messages={this.props.messages}
      />
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ContactWrapper);

