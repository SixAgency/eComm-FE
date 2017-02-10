import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Create.css';
// Components
import Subnav from '../../../../components/Subnav';
import ContentWrapper from '../../../../components/ContentWrapper';
import AddressForm from '../../../../components/Forms/AddressForm';
import ErrorDisplay from '../../../../components/ErrorDisplay';

class CreateAddress extends React.Component {

  static propTypes = {
    loggedIn: PropTypes.bool.isRequired,
    onLogout: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
    emailAddress: PropTypes.string.isRequired,
    address: PropTypes.object.isRequired,
    messages: PropTypes.array.isRequired,
    isError: PropTypes.bool.isRequired,
  };

  render() {
    const showEmailPhone = true;
    return (
      <section className={s.page}>
        <Subnav isLogged={this.props.loggedIn} onLogout={this.props.onLogout} />
        <ErrorDisplay messages={this.props.messages} isError={this.props.isError} />
        <ContentWrapper tabsClass={'hide'}>
          <AddressForm
            formTitle={'Create Address'}
            formSubtitle={'Fulfill your details'}
            showEmailPhone={showEmailPhone}
            buttonText={'save address'}
            selectClass={'checkoutselect'}
            emailAddress={this.props.emailAddress}
            address={this.props.address}
            onSubmit={this.props.onSubmit}
            onCancel={this.props.onCancel}
          />
        </ContentWrapper>
      </section>
    );
  }
}

export default withStyles(s)(CreateAddress);
