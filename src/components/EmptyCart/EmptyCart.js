import React from 'react';
import { Link } from 'react-router';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import cx from 'classnames';
import s from './EmptyCart.css';
import Subnav from '../../components/Subnav';
import ContentWrapper from '../../components/ContentWrapper';

class EmptyCart extends React.Component {
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
        <Subnav isLogged={this.state.logged} onLogout={this.onLogout} />
        <div className={cx(s.messagecontainer, s[this.state.showmessageclass])}>
          product removed.
          <a href=""> Undo?</a>
        </div>
        <ContentWrapper contentClass={'emptycartwrpr'}>
          <p className={s.eparagraph}>Your cart is currently empty</p>
          <p className={cx(s.eparagraph, s.actioncontainer)}>
            <Link
              to="/"
              className={s.gotoshop}
            >
              Return to shop
            </Link>
          </p>
        </ContentWrapper>
      </section>
    );
  }
}

export default withStyles(s)(EmptyCart);
