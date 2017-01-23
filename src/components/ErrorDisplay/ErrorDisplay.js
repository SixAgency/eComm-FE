import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import cx from 'classnames';
import s from './ErrorDisplay.css';

class ErrorDisplay extends React.Component {
  static propTypes = {
    messages: PropTypes.array.isRequired,
    isError: PropTypes.bool.isRequired,
  }

  render() {
    const { isError, messages } = this.props;
    if (!messages || (messages.length < 1)) {
      return null;
    }
    const bg = isError ? 'wrprpink' : 'wrprgreen';
    return (
      <ul className={cx(s.errorwrpr, s[bg])}>
        {this.props.messages.map((v, k) => (<li className={s.message} key={k}>{v}</li>))}
      </ul>
    );
  }
}

export default withStyles(s)(ErrorDisplay);

