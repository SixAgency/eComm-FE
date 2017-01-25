import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Contact.css';
import ContactForm from '../../components/ContactForm';

class Contact extends React.Component {
  static propTypes = {
    sendContact: PropTypes.func.isRequired,
    isSent: PropTypes.bool.isRequired,
    message: PropTypes.string.isRequired,
  }
  render() {
    return (
      <div className={s.contactpage}>
        <div className={s.pagewrapper}>
          <div className={s.formwrapper}>
            <ContactForm
              sendContact={this.props.sendContact}
              isSent={this.props.isSent}
              message={this.props.message}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default withStyles(s)(Contact);
