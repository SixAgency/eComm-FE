import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './EditShippingAddress.css';
// Components
import Subnav from '../../components/Subnav';
import ContentWrapper from '../../components/ContentWrapper';
import BillingForm from '../../components/Forms/BillingForm';

class EditShippingAddress extends React.Component {

  static propTypes = {
    logged: PropTypes.bool.isRequired,
    username: PropTypes.string,
    selectClass: PropTypes.string,
  }

  constructor(props) {
    super(props);
    this.state = {
      logged: this.props.logged,
      username: this.props.username,
    };
  }

  onLogout = () => {
    fetch('/api/logout', {
      headers: { 'Content-Type': 'application/json' },
      credentials: 'same-origin',
    })
    .then((resp) => (resp.json()))
    .then((json) => this.handleLogout(json));
  }

  render() {
    return (
      <section className={s.page}>
        <Subnav isLogged={this.state.logged} onLogout={this.onLogout} />
        <ContentWrapper tabsClass={'hide'} isActive={this.state.content}>
          <BillingForm
            formTitle={'shipping address'}
            formSubtitle={'Change your details'}
            showEmailPhone={'hide'}
            buttonText={'save address'}
            selectClass={'checkoutselect'}
          />
        </ContentWrapper>
      </section>
    );
  }
}

export default withStyles(s)(EditShippingAddress);
