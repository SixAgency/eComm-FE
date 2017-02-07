import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Contact.css';
import ContactForm from '../../components/ContactForm';

class Contact extends React.Component {
  static propTypes = {
    sendContact: PropTypes.func.isRequired,
    isSent: PropTypes.bool.isRequired,
    messages: PropTypes.array.isRequired,
  }
  render() {
    return (
      <div className={s.contactpage}>
        <div className={s.pagewrapper}>
          <div className={s.formwrapper}>
            <ContactForm
              sendContact={this.props.sendContact}
              isSent={this.props.isSent}
              messages={this.props.messages}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default withStyles(s)(Contact);
