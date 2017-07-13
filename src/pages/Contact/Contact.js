import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import cx from 'classnames';
import s from './Contact.css';

// Components
import ContactForm from '../../components/ContactForm';
import ErrorDisplay from '../../components/ErrorDisplay';

class Contact extends React.Component {
  static propTypes = {
    sendContact: PropTypes.func.isRequired,
    messages: PropTypes.array.isRequired,
    isError: PropTypes.bool.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      showValidationError: false,
      errorBorder: 'borderRed'
    };
  }

  handleValidationError = (flag, type) => {
    this.setState({
      showValidationError: flag,
      errorBorder: type
    });
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
              handleValidationError={this.handleValidationError}
            />
            <div
              className={cx(
                s.validationError,
                this.state.showValidationError ? s.show : s.hide,
                s[this.state.errorBorder]
              )}
            >
              There was an error trying to send your message. Please try again later.
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withStyles(s)(Contact);
