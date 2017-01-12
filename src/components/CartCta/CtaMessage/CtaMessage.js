import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import cx from 'classnames';
import s from './CtaMessage.css';

class CtaMessage extends React.Component {
  static propTypes = {
    message: PropTypes.string.isRequired,
    isError: PropTypes.bool.isRequired,
  }

  getWrapperClass = () => {
    let className = 'green';
    if (this.props.isError) {
      className = 'red';
    }
    return className;
  }

  render() {
    if (this.props.message === '') {
      return null;
    }
    const wrapperClass = this.getWrapperClass();
    return (
      <div className={cx(s.messagewrpr, s[wrapperClass])}>
        <Link
          to="/"
          className={s.btnforward}
        >
          Continue Shopping
        </Link>
        <span>
          &nbsp;
          {this.props.message}
        </span>
      </div>
    );
  }
}

export default withStyles(s)(CtaMessage);
