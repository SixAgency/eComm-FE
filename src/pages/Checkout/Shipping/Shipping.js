import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Shipping.css';
// Components
import Subnav from '../../../components/Subnav';
import CtaInfo from '../../../components/CartCta/CtaInfo';
import ErrorDisplay from '../../../components/ErrorDisplay';
import ContentWrapper from '../../../components/ContentWrapper';
// Forms and inputs
import ShippingForm from '../../../components/Forms/Checkout/BillingForm';


class Shipping extends React.Component {

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
    shippingAddress: PropTypes.object.isRequired,
    emailAddress: PropTypes.string.isRequired,
    onSubmit: PropTypes.func.isRequired,
    breadcrumbs: PropTypes.array
  };

  render() {
    const showEmailPhone = true;
    const address = this.props.shippingAddress || {
      id: 0,
      firstname: '',
      lastname: '',
      company: '',
      phone: '',
      address1: '',
      address2: '',
      city: '',
      state_id: 0,
      zipcode: ''
    };
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
          toggleLogin={this.props.handleLogin}
          infoClass={'infocheckout'}
        />
        <ContentWrapper
          tabs={this.props.contentTabs}
          tabsClass={'show'}
          clickTab={this.props.clickTab}
          isActive={this.props.content}
        >
          <ShippingForm
            formTitle={'Shipping address'}
            formSubtitle={'Change your details'}
            showEmailPhone={showEmailPhone}
            buttonText={'proceed'}
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

export default withStyles(s)(Shipping);
