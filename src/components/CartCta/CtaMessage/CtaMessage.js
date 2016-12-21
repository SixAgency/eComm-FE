import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './CtaMessage.css';

class CtaMessage extends React.Component {
  render() {
    return (
      <div className={s.messagewrpr}>
        <a
          href="/"
          className={s.btnforward}
        >
          Continue Shopping
        </a>
        <span>
          &nbsp;
          “prod name”
          has been added to your cart.
        </span>
      </div>
    );
  }
}

export default withStyles(s)(CtaMessage);
