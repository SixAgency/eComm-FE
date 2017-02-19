import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Billing.css';
// Components
import Subnav from '../../../components/Subnav';
import ContentWrapper from '../../../components/ContentWrapper';
import AddressList from '../../../components/Forms/AddressList';
import ErrorDisplay from '../../../components/ErrorDisplay';

class Billing extends React.Component {

  static propTypes = {
    loggedIn: PropTypes.bool.isRequired,
    onLogout: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
    onCreate: PropTypes.func.isRequired,
    address: PropTypes.number.isRequired,
    addresses: PropTypes.array.isRequired,
    messages: PropTypes.array.isRequired,
    isError: PropTypes.bool.isRequired,
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
        <ErrorDisplay messages={this.props.messages} isError={this.props.isError} />
        <ContentWrapper tabsClass={'hide'}>
          <AddressList
            addresses={this.props.addresses}
            address={this.props.address}
            buttonText="Set Billing Address"
            formTitle="Update Billing Address"
            formSubtitle="Select one of the addresses"
            onSubmit={this.props.onSubmit}
            onCancel={this.props.onCancel}
            onCreate={this.props.onCreate}
          />
        </ContentWrapper>
      </section>
    );
  }
}

export default withStyles(s)(Billing);
