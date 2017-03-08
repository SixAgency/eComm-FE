import React, { PropTypes, Component } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './ManageAddresses.css';
// Components
import Subnav from '../../../components/Subnav';
import ContentWrapper from '../../../components/ContentWrapper';
import ManageAddressesForm from '../../../components/Forms/ManageAddressesForm';

class ManageAddresses extends Component {
  static propTypes = {
    loggedIn: PropTypes.bool.isRequired,
    onLogout: PropTypes.func.isRequired,
    addresses: PropTypes.object.isRequired,
    shipping: PropTypes.object.isRequired,
    billing: PropTypes.object.isRequired
  }

  render() {
    return (
      <section className={s.page}>
        <Subnav
          isLogged={this.props.loggedIn}
          onLogout={this.props.onLogout}
        />
        <ContentWrapper>
          <ManageAddressesForm
            addresses={this.props.addresses}
            billing={this.props.billing}
            shipping={this.props.shipping}
          />
        </ContentWrapper>
      </section>
    );
  }
}

export default withStyles(s)(ManageAddresses);
