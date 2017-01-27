import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Checkout.css';
// Components
import Subnav from '../../components/Subnav';
import CtaInfo from '../../components/CartCta/CtaInfo';
import ErrorDisplay from '../../components/ErrorDisplay';
import ContentWrapper from '../../components/ContentWrapper';
import GiftCardInput from '../../components/GiftCardInput/GiftCardInput';
import LoginInput from '../../components/LoginInput/LoginInput';
// Forms and inputs
import BillingForm from '../../components/Forms/BillingForm';
import ShippingAddress from '../../components/Forms/CheckoutSteps/ShippingAddress';
import PromoCode from '../../components/Forms/CheckoutSteps/PromoCode';
import ReviewOrder from '../../components/Forms/CheckoutSteps/ReviewOrder';


class Checkout extends React.Component {

  static propTypes = {
    cartItems: PropTypes.object.isRequired,
    loggedIn: PropTypes.bool.isRequired,
    onLogin: PropTypes.func.isRequired,
    onLogout: PropTypes.func.isRequired,
    handleGiftcard: PropTypes.func.isRequired,
    couponClass: PropTypes.string.isRequired,
    handleLogin: PropTypes.func.isRequired,
    loginClass: PropTypes.string.isRequired,
    clickTab: PropTypes.func.isRequired,
    content: PropTypes.string.isRequired,
    message: PropTypes.string.isRequired,
    isError: PropTypes.bool.isRequired,
  }

  getChildren = () => {
    const content = this.props.content;
    if (content === 'shipping') {
      return <ShippingAddress />;
    } else if (content === 'promocode') {
      return <PromoCode />;
    } else if (content === 'review') {
      return <ReviewOrder cartItems={this.props.cartItems.cart} />;
    }
    return (
      <BillingForm
        loggedIn={this.props.loggedIn}
        formTitle={'billing address'}
        formSubtitle={'Fill in your details'}
        buttonText={'proceed'}
        selectClass={'checkoutselect'}
      />
    );
  }

  handleError = (flag, data) => {
    if (flag === true) {
      return data;
    }
    return '';
  }

  render() {
    const contentTabs = [
      {
        name: 'Billing Address',
        title: 'Billing Address',
        cname: 'billing',
        id: 'billing',
      },
      {
        name: 'Shipping Address',
        title: 'Shipping Address',
        cname: 'shipping',
        id: 'shipping',
      },
      {
        name: 'Apply Promotional Code',
        title: 'Apply Promotional Code',
        cname: 'promocode',
        id: 'promocode',
      },
      {
        name: 'Review Order',
        title: 'Review Order',
        cname: 'review',
        id: 'review',
      },
    ];
    return (
      <section className={s.page}>
        <Subnav isLogged={this.props.loggedIn} onLogout={this.props.onLogout} />
        <ErrorDisplay
          message={this.props.message}
          isError={this.props.isError}
          loggedIn={this.props.loggedIn}
        />
        <CtaInfo
          loggedIn={this.props.loggedIn}
          toggleGiftcard={this.props.handleGiftcard}
          toggleLogin={this.props.handleLogin}
          infoClass={'infocheckout'}
        />
        <section>
          <div className={s.giftCardwrpr}>
            <GiftCardInput
              toggleGiftcard={this.props.handleGiftcard}
              infoClass={this.props.couponClass}
            />
          </div>
          {!this.props.loggedIn &&
            <div className={s.loginwrpr}>
              <LoginInput
                onLogin={this.props.onLogin}
                toggleLogin={this.props.handleLogin}
                infoClass={this.props.loginClass}
                handleError={this.handleError}
              />
            </div>
          }
          <ContentWrapper
            tabs={contentTabs}
            tabsClass={'show'}
            clickTab={this.props.clickTab}
            isActive={this.props.content}
            noPaddingClass={'wrprNoPadding'}
          >
            {this.getChildren()}
          </ContentWrapper>
        </section>
      </section>
    );
  }
}

export default withStyles(s)(Checkout);
