import React, { PropTypes, Component } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './ManageAddresses.css';
import { browserHistory } from 'react-router';
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
    editAddress: PropTypes.func.isRequired
  }

  constructor(props) {
    super(props);
    this.state = {
      display: 'list',
      editId: 0
    };
  }

  setContent = () => {
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
        onSubmit={this.props.editAddress}
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
