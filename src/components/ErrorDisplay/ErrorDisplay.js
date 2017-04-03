import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { Link } from 'react-router';
import cx from 'classnames';
import s from './ErrorDisplay.css';

let showContinueShopping = false;

class ErrorDisplay extends React.Component {
  static propTypes = {
    messages: PropTypes.array.isRequired,
    isError: PropTypes.bool.isRequired
  };

  componentWillMount = () => {
    const message = this.props.messages[0] ? this.props.messages[0] : '';
    if (message.indexOf('has been added to your cart.') > -1 && !this.props.isError) {
      showContinueShopping = true;
    } else {
      showContinueShopping = false;
    }
  }

  componentDidUpdate = (nextProps) => {
    const message = nextProps.messages[0] ? nextProps.messages[0] : '';
    if (message.indexOf('has been added to your cart.') > -1 && !nextProps.isError) {
      showContinueShopping = true;
    } else {
      showContinueShopping = false;
    }
  }

  handleContinueButton = () => {
    if (showContinueShopping) {
      return (
        <Link
          to="/"
          className={s.btnforward}
        >
          Continue Shopping
        </Link>
      );
    }
    return null;
  }

  render() {
    const { isError, messages } = this.props;
    if (!messages || (messages.length < 1)) {
      return null;
    }
    const bg = isError ? 'wrprpink' : 'wrprgreen';
    return (
      <ul className={cx(s.errorwrpr, s[bg])}>
        {messages.map((v, k) => (
          <li className={s.message} key={k}>
            {this.handleContinueButton()}
            {v}
          </li>
        ))}
      </ul>
    );
  }
}

export default withStyles(s)(ErrorDisplay);

