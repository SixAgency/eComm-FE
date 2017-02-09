import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Contact.css';
import ContactForm from '../../components/ContactForm';
import ErrorDisplay from '../../components/ErrorDisplay';

class Contact extends React.Component {
  static propTypes = {
    sendContact: PropTypes.func.isRequired,
    messages: PropTypes.array.isRequired,
    isError: PropTypes.bool.isRequired,
  };

  render() {
    return (
      <div className={s.contactpage}>
        <ErrorDisplay
          messages={this.props.messages}
          isError={this.props.isError}
        />
        <div className={s.pagewrapper}>
          <div className={s.formwrapper}>
            <ContactForm
              sendContact={this.props.sendContact}
              messages={this.props.messages}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default withStyles(s)(Contact);
