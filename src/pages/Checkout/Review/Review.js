import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Review.css';
// Components
import Subnav from '../../../components/Subnav';
import CtaInfo from '../../../components/CartCta/CtaInfo';
import ErrorDisplay from '../../../components/ErrorDisplay';
import ContentWrapper from '../../../components/ContentWrapper';
// Forms and inputs
import ReviewOrder from '../../../components/Forms/Checkout/ReviewOrder';


class Review extends React.Component {

  static propTypes = {
    cartItems: PropTypes.object.isRequired,
    loggedIn: PropTypes.bool.isRequired,
    onLogin: PropTypes.func.isRequired,
    onLogout: PropTypes.func.isRequired,
    handleGiftcard: PropTypes.func.isRequired,
    clickTab: PropTypes.func.isRequired,
    content: PropTypes.string.isRequired,
    messages: PropTypes.array.isRequired,
    isError: PropTypes.bool.isRequired,
    applyPromoCode: PropTypes.func.isRequired,
    contentTabs: PropTypes.array.isRequired,
    isPayPal: PropTypes.bool.isRequired,
    checkoutPayPal: PropTypes.func.isRequired,
    breadcrumbs: PropTypes.array
  };

  render() {
    return (
      <section className={s.page}>
        <Subnav
          isLogged={this.props.loggedIn}
          onLogout={this.props.onLogout}
          breadcrumbs={this.props.breadcrumbs}
        />
        <ErrorDisplay
          messages={this.props.messages}
          isError={this.props.isError}
        />
        <CtaInfo
          loggedIn={this.props.loggedIn}
          toggleGiftcard={this.props.handleGiftcard}
          infoClass={'infocheckout'}
        />
        <ContentWrapper
          tabs={this.props.contentTabs}
          tabsClass={'show'}
          clickTab={this.props.clickTab}
          isActive={this.props.content}
        >
          <ReviewOrder
            cartItems={this.props.cartItems}
            isPaypal={this.props.isPayPal}
            checkoutPayPal={this.props.checkoutPayPal}
          />
        </ContentWrapper>
      </section>
    );
  }
}

export default withStyles(s)(Review);
