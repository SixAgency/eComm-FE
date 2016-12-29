import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import cx from 'classnames';
import s from './CtaInfo.css';

class CtaInfo extends React.Component {
  static propTypes = {
    toggleGiftcard: PropTypes.func.isRequired,
    infoClass: PropTypes.string,
  }

  render() {
    return (
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
    );
  }
}

export default withStyles(s)(CtaInfo);
