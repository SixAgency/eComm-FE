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
    addresses: PropTypes.object.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      selected: 0
    };
  }

  onCreate = (e) => {
    e.preventDefault();
    forwardTo('my-account/address/create/billing');
  };

  onSelect = (e) => {
    this.setState({
      selected: parseInt(e.target.value, 10)
    });
    console.log(this.state.selected);
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
            onSelect={this.onSelect}
            shipping={this.props.shipping}
            billing={this.props.billing}
            onCreate={this.onCreate}
          />
        </ContentWrapper>
      </section>
    );
  }
}

export default withStyles(s)(EditAddresses);
