import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import cx from 'classnames';
import s from './CtaInfo.css';

class CtaInfo extends React.Component {
  static propTypes = {
    loggedIn: PropTypes.bool.isRequired,
    toggleGiftcard: PropTypes.func.isRequired,
    toggleLogin: PropTypes.func.isRequired,
    infoClass: PropTypes.string,
  }

  render() {
    let login = (
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
    );
    if (this.props.loggedIn) {
      login = '';
    }
    return (
      <div>
        {login}
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
