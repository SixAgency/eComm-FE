import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './ContactForm.css';

class ContactForm extends React.Component {
  render() {
    return (
      <form className={s.cform}>
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
          />
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
          />
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
    );
  }
}

export default withStyles(s)(ContactForm);
