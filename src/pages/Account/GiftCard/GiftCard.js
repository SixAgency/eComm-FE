import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './GiftCard.css';
// Components
import Subnav from '../../../components/Subnav';
import ContentWrapper from '../../../components/ContentWrapper';
import ErrorDisplay from '../../../components/ErrorDisplay';
import GiftCardForm from '../../../components/Forms/GiftCardForm';

class GiftCard extends React.Component {

  static propTypes = {
    loggedIn: PropTypes.bool.isRequired,
    creditInfo: PropTypes.object.isRequired,
    onLogout: PropTypes.func.isRequired,
    onLogin: PropTypes.func.isRequired,
    onRegister: PropTypes.func.isRequired,
    redeemGiftCard: PropTypes.func.isRequired,
    messages: PropTypes.array.isRequired,
    isError: PropTypes.bool.isRequired,
    forwardTo: PropTypes.func.isRequired,
    breadcrumbs: PropTypes.array
  };

  render() {
    const { loggedIn, creditInfo } = this.props;
    return (
      <section className={s.page}>
        <Subnav
          isLogged={this.props.loggedIn}
          onLogout={this.props.onLogout}
          breadcrumbs={this.props.breadcrumbs}
          forwardTo={this.props.forwardTo}
        />
        <ErrorDisplay
          messages={this.props.messages}
          isError={this.props.isError}
        />
        <ContentWrapper tabsClass={loggedIn ? '' : 'hide'}>
          <GiftCardForm
            loggedIn={loggedIn}
            creditInfo={creditInfo}
            onLogin={this.props.onLogin}
            onRegister={this.props.onRegister}
            onRedeemGiftCard={this.props.redeemGiftCard}
          />
        </ContentWrapper>
      </section>
    );
  }
}

export default withStyles(s)(GiftCard);
