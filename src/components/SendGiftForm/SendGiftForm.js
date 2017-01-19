import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import cx from 'classnames';
import s from './SendGiftForm.css';

class SendGiftForm extends React.Component {
  render() {
    return (
      <div className={s.sendgiftwrpr}>
        <h3 className={s.sgtext}>
          Your gift card will be sent to the recipient on the same day of purchase.
        </h3>
        <h3 className={s.sgtext}>
          Gift card details
        </h3>
        <div className={s.fieldswrpr}>
          <label
            className={s.sgtext}
            htmlFor="recipient"
          >
            Recipient&#39;s email
          </label>
          <input
            className={s.inputfields}
            type="email"
            id="recipient"
            name="recipient"
          />
        </div>
        <div className={s.fieldswrpr}>
          <label
            className={s.sgtext}
            htmlFor="sender"
          >
            Your name
          </label>
          <input
            className={s.inputfields}
            type="email"
            id="sender"
            name="sender"
          />
        </div>
        <div className={s.textareawrpr}>
          <label
            className={s.sgtext}
            htmlFor="message"
          >
            Message
          </label>
          <textarea
            id="message"
            name="message"
            className={s.message}
            rows="5"
            placeholder="Your message..."
          />
        </div>
        <button
          type="submit"
          className={cx(s.btn, s.addbtn)}
        >
            Add to cart
        </button>
        <button
          className={cx(s.btn, s.cancelbtn)}
        >
          Cancel
        </button>
      </div>
    );
  }
}

export default withStyles(s)(SendGiftForm);
