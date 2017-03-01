import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './EditAddresses.css';
// Components
import Subnav from '../../../components/Subnav';
import ContentWrapper from '../../../components/ContentWrapper';
import EditAddressesForm from '../../../components/Forms/EditAddressesForm';
// Actions
import { forwardTo } from '../../../actions/handler';

class EditAddresses extends React.Component {
  static propTypes = {
    loggedIn: PropTypes.bool.isRequired,
    onLogout: PropTypes.func.isRequired,
    billing: PropTypes.object.isRequired,
    shipping: PropTypes.object.isRequired,
    addresses: PropTypes.object.isRequired,
    setAddresses: PropTypes.func.isRequired,
    deleteAddress: PropTypes.func.isRequired
  };

  onCreate = (e) => {
    e.preventDefault();
    forwardTo('my-account/address/create/billing');
  };

  render() {
    return (
      <section className={s.page}>
        <Subnav
          isLogged={this.props.loggedIn}
          onLogout={this.props.onLogout}
        />
        <ContentWrapper>
          <EditAddressesForm
            addresses={this.props.addresses}
            shipping={this.props.shipping}
            billing={this.props.billing}
            onCreate={this.onCreate}
            setAddresses={this.props.setAddresses}
            deleteAddress={this.props.deleteAddress}
          />
        </ContentWrapper>
      </section>
    );
  }
}

export default withStyles(s)(EditAddresses);
