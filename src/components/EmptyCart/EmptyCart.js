import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import cx from 'classnames';
import s from './EmptyCart.css';
import Subnav from '../../components/Subnav';
import ContentWrapper from '../../components/ContentWrapper';
import ErrorDisplay from '../../components/ErrorDisplay';

class EmptyCart extends React.Component {

  static propTypes = {
    messages: PropTypes.array.isRequired,
    isError: PropTypes.bool.isRequired,
  }

  constructor(props) {
    super(props);
    this.state = {
      showmessageclass: 'hidemessage',
      logged: true,
    };
  }

  onLogout = () => {
    fetch('/api/logout', {
      headers: { 'Content-Type': 'application/json' },
      credentials: 'same-origin',
    })
    .then((resp) => (resp.json()))
    .then((json) => this.handleLogout(json));
  }

  render() {
    return (
      <section className={s.page}>
        <ErrorDisplay messages={this.props.messages} isError={this.props.isError} />
        <Subnav isLogged={this.state.logged} onLogout={this.onLogout} />
        <div className={cx(s.messagecontainer, s[this.state.showmessageclass])}>
          product removed.
          <a href=""> Undo?</a>
        </div>
        <ContentWrapper contentClass={'emptycartwrpr'}>
          <div>
            <p className={s.eparagraph}>Your cart is currently empty</p>
            <p className={cx(s.eparagraph, s.actioncontainer)}>
              <Link
                to="/"
                className={s.gotoshop}
              >
                Return to shop
              </Link>
            </p>
          </div>
        </ContentWrapper>
      </section>
    );
  }
}

export default withStyles(s)(EmptyCart);
