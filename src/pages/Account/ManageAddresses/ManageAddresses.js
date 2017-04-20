import React, { PropTypes, Component } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { browserHistory } from 'react-router';
import s from './ManageAddresses.css';
// Components
import Subnav from '../../../components/Subnav';
import ContentWrapper from '../../../components/ContentWrapper';
import ManageAddressesForm from '../../../components/Forms/ManageAddressesForm';
import AddressForm from '../../../components/Forms/AddressForm';
import ErrorDisplay from '../../../components/ErrorDisplay';

class ManageAddresses extends Component {
  static propTypes = {
    loggedIn: PropTypes.bool.isRequired,
    onLogout: PropTypes.func.isRequired,
    addresses: PropTypes.object.isRequired,
    shipping: PropTypes.object.isRequired,
    billing: PropTypes.object.isRequired,
    deleteAddress: PropTypes.func.isRequired,
    setDefaultShipping: PropTypes.func.isRequired,
    setDefaultBilling: PropTypes.func.isRequired,
    editAddress: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
    display: PropTypes.string.isRequired,
    handleDisplay: PropTypes.func.isRequired,
    messages: PropTypes.array.isRequired,
    isError: PropTypes.bool.isRequired,
    resetMessages: PropTypes.func.isRequired,
    breadcrumbs: PropTypes.array
  };

  constructor(props) {
    super(props);
    this.state = {
      editId: 0
    };
  }

  setContent = () => {
    const showEmailPhone = true;
    if (this.props.display === 'list') {
      return (
        <ManageAddressesForm
          addresses={this.props.addresses}
          billing={this.props.billing}
          shipping={this.props.shipping}
          deleteAddress={this.props.deleteAddress}
          setDefaultShipping={this.props.setDefaultShipping}
          setDefaultBilling={this.props.setDefaultBilling}
          handleDisplayState={this.handledisplayState}
          showEmailPhone={showEmailPhone}
        />
      );
    } else if (this.props.display === 'edit') {
      return (
        <div> { this.getAddressToEdit(this.state.editId) }</div>
      );
    }
  };

  getAddressToEdit = (id) => {
    const tolist = this.props.addresses.addresses.find((address) => (address.id === id));
    return (
      <AddressForm
        formTitle={'Edit Address'}
        formSubtitle={'Fulfill your details'}
        address={tolist}
        buttonText={'save address'}
        selectClass={'checkoutselect'}
        onSubmit={this.props.onSubmit}
        onCancel={() => { browserHistory.push('/my-account/dashboard'); }}
      />
    );
  };

  handledisplayState = (content, id) => {
    this.setState({ editId: id });
    this.props.handleDisplay(content);
    this.props.resetMessages();
  };


  render() {
    if (this.props.addresses.addresses.length === 0) {
      return (
        <section className={s.page}>
          <Subnav
            isLogged={this.props.loggedIn}
            onLogout={this.props.onLogout}
            breadcrumbs={this.props.breadcrumbs}
          />
          <ContentWrapper>
            <div className={s.warning}>
              No available addresses to show.
            </div>
          </ContentWrapper>
        </section>
      );
    }
    return (
      <section className={s.page}>
        <Subnav
          isLogged={this.props.loggedIn}
          onLogout={this.props.onLogout}
          breadcrumbs={this.props.breadcrumbs}
        />
        <ErrorDisplay messages={this.props.messages} isError={this.props.isError} />
        <ContentWrapper>
          {this.setContent()}
        </ContentWrapper>
      </section>
    );
  }
}

export default withStyles(s)(ManageAddresses);
