import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import cx from 'classnames';
import accounting from 'accounting';

import s from './Forms.css';

import LoginForm from './LoginForm';
import RegForm from './RegForm';

const activeFormComponent = {
  login: LoginForm,
  register: RegForm
};

class GiftCardForm extends React.Component {

  static propTypes = {
    loggedIn: PropTypes.bool,
    creditInfo: PropTypes.object.isRequired,
    onLogin: PropTypes.func.isRequired,
    onRegister: PropTypes.func.isRequired,
    onRedeemGiftCard: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      activeForm: '',
      giftCard: ''
    };
  }

  showForm = (formName) => {
    this.setState({ activeForm: formName });
  }

  updateGiftCard = (e) => {
    this.setState({ giftCard: e.target.value });
  }

  redeemGiftCard = () => {
    this.props.onRedeemGiftCard(this.state.giftCard);
  }

  render() {
    const subtitle = this.props.loggedIn ?
      'Enter your E-Gift card number here:'
      : 'New user or existing user?';
    const { activeForm } = this.state;
    const FormComponent = activeFormComponent[activeForm];
    return (
      <div className={s.formcontent}>
        <h1 className={s.title}>Gift Card</h1>
        <h2 className={s.subtitle}>{subtitle}</h2>
        {this.props.loggedIn ?
          <div className={cx(s.form, s.giftcardform)}>
            <input
              type="text"
              placeholder="Enter gift card code"
              className={s.giftcardform_input}
              value={this.state.giftCard}
              onChange={this.updateGiftCard}
            />
            <button
              className={s.giftcardform_submit}
              onClick={this.redeemGiftCard}
            >
              Redeem
            </button>
            <div className={s.giftcardform_balance}>
              MY E-GIFT CARD BALANCE
            </div>
            <div className={s.giftcardform_amount}>
              Your E-Gift amount:
              <em> { accounting.formatMoney(this.props.creditInfo.totalAmount) }</em>
            </div>
          </div>
        :
          <div>
            <div className={s.buttonwrapper4}>
              <input
                id="register"
                className={s.submit}
                type="submit"
                value="New User"
                onClick={() => this.showForm('register')}
              />
              <input
                id="login"
                className={s.submit}
                type="submit"
                value="Existing User"
                onClick={() => this.showForm('login')}
              />
            </div>
            {activeForm !== '' &&
              <FormComponent
                onLogin={this.props.onLogin}
                onRegister={this.props.onRegister}
                hideTitle
              />
            }
          </div>
        }
      </div>
    );
  }
}

export default withStyles(s)(GiftCardForm);
