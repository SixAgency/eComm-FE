import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import cx from 'classnames';
import s from './CtaInfo.css';

class CtaInfo extends React.Component {
  static propTypes = {
    loggedIn: PropTypes.bool,
    toggleGiftcard: PropTypes.func,
    toggleLogin: PropTypes.func,
    infoClass: PropTypes.string
  }

  render() {
    return (
      <div>
        {!this.props.loggedIn &&
          <div className={cx(s.infowrpr, s[this.props.infoClass])}>
            Returning customer? &nbsp;
            <a
              href=""
              className={s.showlogin}
              onClick={this.props.toggleLogin}
            >
              Click here to login
            </a>
          </div>
        }
        <div className={cx(s.infowrpr, s[this.props.infoClass])}>
          Do you have a gift card? &nbsp;
          <a
            href=""
            className={s.showgiftcard}
            onClick={this.props.toggleGiftcard}
          >
            Click here to enter your code
          </a>
        </div>
      </div>
    );
  }
}

export default withStyles(s)(CtaInfo);
