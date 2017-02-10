import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Billing.css';
// Components
import Subnav from '../../../components/Subnav';
import CtaInfo from '../../../components/CartCta/CtaInfo';
import ErrorDisplay from '../../../components/ErrorDisplay';
import ContentWrapper from '../../../components/ContentWrapper';
import GiftCardInput from '../../../components/GiftCardInput/GiftCardInput';
import LoginInput from '../../../components/LoginInput/LoginInput';
// Forms and inputs
import BillingForm from '../../../components/Forms/Checkout/BillingForm';
import ShippingAddress from '../../../components/Forms/CheckoutSteps/ShippingAddress';
import PromoCode from '../../../components/Forms/CheckoutSteps/PromoCode';
import ReviewOrder from '../../../components/Forms/CheckoutSteps/ReviewOrder';


class Billing extends React.Component {

  static propTypes = {
    loggedIn: PropTypes.bool.isRequired,
    onLogin: PropTypes.func.isRequired,
    onLogout: PropTypes.func.isRequired,
    handleGiftcard: PropTypes.func.isRequired,
    couponClass: PropTypes.string.isRequired,
    handleLogin: PropTypes.func.isRequired,
    loginClass: PropTypes.string.isRequired,
    clickTab: PropTypes.func.isRequired,
    content: PropTypes.string.isRequired,
    messages: PropTypes.array.isRequired,
    isError: PropTypes.bool.isRequired,
    applyPromoCode: PropTypes.func.isRequired,
    contentTabs: PropTypes.array.isRequired,
    billingAddress: PropTypes.object.isRequired,
    emailAddress: PropTypes.string.isRequired,
    onSubmit: PropTypes.func.isRequired,
  };

  render() {
    const showEmailPhone = true;
    const address = this.props.billingAddress || {
      id: 0,
      firstname: '',
      lastname: '',
      company: '',
      phone: '',
      address1: '',
      address2: '',
      city: '',
      state_id: 0,
      zipcode: '',
    };
    return (
      <section className={s.page}>
        <Subnav isLogged={this.props.loggedIn} onLogout={this.props.onLogout} />
        <ErrorDisplay
          messages={this.props.messages}
          isError={this.props.isError}
        />
        <CtaInfo
          loggedIn={this.props.loggedIn}
          toggleGiftcard={this.props.handleGiftcard}
          toggleLogin={this.props.handleLogin}
          infoClass={'infocheckout'}
        />
        <ContentWrapper
          tabs={this.props.contentTabs}
          tabsClass={'show'}
          clickTab={this.props.clickTab}
          isActive={this.props.content}
        >
          <BillingForm
            formTitle={'billing address'}
            formSubtitle={'Change your details'}
            showEmailPhone={showEmailPhone}
            buttonText={'save address'}
            selectClass={'checkoutselect'}
            emailAddress={this.props.emailAddress}
            address={address}
            onSubmit={this.props.onSubmit}
          />
        </ContentWrapper>
      </section>
    );
  }
}

export default withStyles(s)(Billing);
