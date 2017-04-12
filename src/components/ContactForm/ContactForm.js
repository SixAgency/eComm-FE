import React, { PropTypes, Component } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import cx from 'classnames';
import s from './ContactForm.css';

class ContactForm extends Component {

  static propTypes = {
    sendContact: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      subject: '',
      message: '',
      nameError: 'hide',
      emailError: 'hide',
      hasErrors: false
    };
  }

  onSubmit = (e) => {
    e.preventDefault();
    this.errorHandling(() => {
      if (this.state.hasErrors === true) {
        console.log('Form has errors');
      } else {
        const data = {
          contact: {
            name: this.state.name,
            email: this.state.email,
            subject: this.state.subject,
            message: this.state.message
          }
        };
        this.props.sendContact(data, () => {
          this.setState({
            name: '',
            email: '',
            subject: '',
            message: ''
          });
        });
      }
    });
  };

  errorHandling = (err) => {
    if (this.state.name === '' && this.state.email === '') {
      this.setState({
        nameError: 'show',
        emailError: 'show',
        hasErrors: true
      }, err);
    } else if (this.state.name === '') {
      this.setState({
        nameError: 'show',
        hasErrors: true
      }, err);
    } else if (this.state.email === '') {
      this.setState({
        emailError: 'show',
        hasErrors: true
      }, err);
    } else {
      this.setState({
        nameError: 'hide',
        emailError: 'hide',
        hasErrors: false
      }, err);
    }
  };

  handleFields = (e) => {
    switch (e.target.id) {
      case 'name': this.setState({ name: e.target.value, nameError: 'hide' }); break;
      case 'email': this.setState({ email: e.target.value, emailError: 'hide' }); break;
      case 'subject': this.setState({ subject: e.target.value }); break;
      case 'message': this.setState({ message: e.target.value }); break;
      default: // do nothing
    }
  };

  render() {
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
              value={this.state.name}
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
              value={this.state.email}
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
              value={this.state.subject}
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
              value={this.state.message}
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
      </div>
    );
  }
}

export default withStyles(s)(ContactForm);
