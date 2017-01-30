import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import cx from 'classnames';
import s from './ContactForm.css';
import { validateContactForm } from '../../helpers/validators';

class ContactForm extends React.Component {

  static propTypes = {
    sendContact: PropTypes.func.isRequired,
    isSent: PropTypes.bool.isRequired,
    message: PropTypes.string.isRequired,
  }

  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      subject: '',
      message: '',
      nameError: 'hide',
      emailError: 'hide',
      showErrorMessage: 'hide',
      hasErrors: false,
      borderColor: '',
      errorMessage: '',
    };
  }

  onSubmit = (e) => {
    e.preventDefault();
    this.errorHandling(() => {
      if (this.state.hasErrors === true) {
        console.log('Form has errors');
      } else {
        const data = {
          name: this.state.name,
          email: this.state.email,
          subject: this.state.subject,
          message: this.state.message,
        };
        console.log(data);
        const valid = validateContactForm(data);
        if (valid.isError) {
          console.log(valid);
        } else {
          this.props.sendContact();
        }
      }
    });
  }

  errorHandling = (err) => {
    if (this.state.name === '' && this.state.email === '') {
      this.setState({
        nameError: 'show',
        emailError: 'show',
        showErrorMessage: 'show',
        hasErrors: true,
        borderColor: 'borderYellow',
        errorMessage: 'One or more fields have an error. Please check and try again.',
      }, err);
    } else if (this.state.name === '') {
      this.setState({
        nameError: 'show',
        hasErrors: true,
        borderColor: 'borderYellow',
        errorMessage: 'One or more fields have an error. Please check and try again.',
      }, err);
    } else if (this.state.email === '') {
      this.setState({
        emailError: 'show',
        hasErrors: true,
        borderColor: 'borderYellow',
        errorMessage: 'One or more fields have an error. Please check and try again.',
      }, err);
    } else {
      this.setState({
        nameError: 'hide',
        emailError: 'hide',
        showErrorMessage: 'hide',
        hasErrors: false,
      }, err);
    }
  }

  handleFields = (e) => {
    switch (e.target.id) {
      case 'name': this.setState({ name: e.target.value }); break;
      case 'email': this.setState({ email: e.target.value }); break;
      case 'subject': this.setState({ subject: e.target.value }); break;
      case 'message': this.setState({ message: e.target.value }); break;
      default: // do nothing
    }
  }

  render() {
    const showErrorMessage =
      this.state.hasErrors || this.props.message !== '' ? 'show' : 'hide';
    let backendMessageClass;
    if (this.props.isSent) {
      backendMessageClass = this.props.message !== '' ? 'borderGreen' : '';
    } else {
      backendMessageClass = this.props.message !== '' ? 'borderYellow' : '';
    }
    return (
      <div>
        <form className={s.cform} onSubmit={this.onSubmit}>
          <div className={s.inputwrapper}>
            <label
              className={s.fieldnames}
              htmlFor="name"
            >
              Name
            </label>
            <input
              className={s.inputfields}
              type="text"
              name="your-name"
              id="name"
              onChange={this.handleFields}
            />
            <span
              className={cx(s.errorContainer, s[this.state.nameError])}
            >
              The field is required.
            </span>
          </div>
          <div className={s.inputwrapper}>
            <label
              className={s.fieldnames}
              htmlFor="email"
            >
              Email
            </label>
            <input
              className={s.inputfields}
              type="text"
              name="your-email"
              id="email"
              onChange={this.handleFields}
            />
            <span
              className={cx(s.errorContainer, s[this.state.emailError])}
            >
              The field is required.
            </span>
          </div>
          <div className={s.inputwrapper}>
            <label
              className={s.fieldnames}
              htmlFor="subject"
            >
              Subject
            </label>
            <input
              className={s.inputfields}
              type="text"
              name="your-subject"
              id="subject"
              onChange={this.handleFields}
            />
          </div>
          <div className={s.textareawrapper}>
            <label
              className={s.fieldnames}
              htmlFor="message"
            >
              Message
            </label>
            <textarea
              rows="10"
              cols="40"
              className={s.inputfields}
              type="text"
              name="your-message"
              id="message"
              onChange={this.handleFields}
            />
          </div>
          <div className={s.inputwrapper}>
            <input
              className={s.submitbutton}
              value="Send"
              type="submit"
            />
          </div>
        </form>
        <div
          className={cx(
            s.errorMessage,
            s[showErrorMessage],
            s[this.state.borderColor || backendMessageClass],
          )}
        >
          {this.state.errorMessage + this.props.message }
        </div>
      </div>
    );
  }
}

export default withStyles(s)(ContactForm);
