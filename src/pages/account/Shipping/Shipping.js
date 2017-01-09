import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Shipping.css';
// Components
import Subnav from '../../../components/Subnav';
import ContentWrapper from '../../../components/ContentWrapper';
import AddressForm from '../../../components/Forms/AddressForm';

class Shipping extends React.Component {

  static propTypes = {
    loggedIn: PropTypes.bool.isRequired,
    onLogout: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
    shippingAddress: PropTypes.object,
  }

  render() {
    const showEmailPhone = false;
    return (
      <section className={s.page}>
        <Subnav isLogged={this.props.loggedIn} onLogout={this.onLogout} />
        <ContentWrapper tabsClass={'hide'}>
          <AddressForm
            formTitle={'shipping address'}
            formSubtitle={'Change your details'}
            showEmailPhone={showEmailPhone}
            buttonText={'save address'}
            selectClass={'checkoutselect'}
            onSubmit={this.props.onSubmit}
          />
        </ContentWrapper>
      </section>
    );
  }
}

export default withStyles(s)(Shipping);
