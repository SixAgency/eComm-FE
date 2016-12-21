import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './CtaInfo.css';

class CtaInfo extends React.Component {
  static propTypes = {
    toggleGiftcard: React.PropTypes.func.isRequired,
  }

  render() {
    return (
      <div className={s.infowrpr}>
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
