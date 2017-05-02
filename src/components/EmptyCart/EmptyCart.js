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
    loggedIn: PropTypes.bool.isRequired,
    breadcrumbs: PropTypes.array,
    onLogout: PropTypes.func.isRequired
  };

  render() {
    return (
      <section className={s.page}>
        <ErrorDisplay messages={this.props.messages} isError={this.props.isError} />
        <Subnav
          isLogged={this.props.loggedIn}
          onLogout={this.props.onLogout}
          breadcrumbs={this.props.breadcrumbs}
        />
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
