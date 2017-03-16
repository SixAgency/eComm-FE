import React, { PropTypes, Component } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { browserHistory } from 'react-router';
import s from './ManageAddresses.css';
// Components
import Subnav from '../../../components/Subnav';
import ContentWrapper from '../../../components/ContentWrapper';
import ManageAddressesForm from '../../../components/Forms/ManageAddressesForm';
import AddressForm from '../../../components/Forms/AddressForm';

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
    onSubmit: PropTypes.func.isRequired
  }

  constructor(props) {
    super(props);
    this.state = {
      display: 'list',
      editId: 0
    };
  }

  setContent = () => {
    const showEmailPhone = true;
    if (this.state.display === 'list') {
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
    }
    return (
      <div> { this.getAddressToEdit(this.state.editId) }</div>
    );
  }

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
  }

  handledisplayState = (content, id) => {
    this.setState({
      display: `${content}`,
      editId: id
    });
  }


  render() {
    if (this.props.addresses.addresses.length === 0) {
      return (
        <section className={s.page}>
          <Subnav
            isLogged={this.props.loggedIn}
            onLogout={this.props.onLogout}
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
        />
        <ContentWrapper>
          {this.setContent()}
        </ContentWrapper>
      </section>
    );
  }
}

export default withStyles(s)(ManageAddresses);
