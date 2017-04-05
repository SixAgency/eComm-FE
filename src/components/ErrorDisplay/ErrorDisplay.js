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
    showContinueShopping = this.showContinueShoppingFunc(this.props);
  }

  componentDidUpdate = (nextProps) => {
    showContinueShopping = this.showContinueShoppingFunc(nextProps);
  }

  // helper - show continue shopping button
  showContinueShoppingFunc = (props) => {
    const messages = props.messages[0] ? props.messages[0] : [];
    if (messages.indexOf('has been added to your cart.') > -1 && !props.isError) {
      return true;
    }
    return false;
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
            {showContinueShopping &&
              <Link
                to="/"
                className={s.btnforward}
              >
                Continue Shopping
              </Link>
            }
            {v}
          </li>
        ))}
      </ul>
    );
  }
}

export default withStyles(s)(ErrorDisplay);

