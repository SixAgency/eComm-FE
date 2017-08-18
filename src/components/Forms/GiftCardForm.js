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
    this.props.onRedeemGiftCard(this.state.giftCard, () => {
      this.setState({ giftCard: '' });
    });
  }

  render() {
    const { activeForm } = this.state;
    const FormComponent = activeFormComponent[activeForm];
    return (
      <div className={s.formcontent}>
        <h1 className={s.title}>Redeem your E-Gift card</h1>
        {this.props.loggedIn ?
          <h2 className={s.subtitle}>
            Redeeming your E-Gift card is easy. Simply enter your E-Gift card number from the email
            you have received into the box below:
          </h2>
          :
          <h2 className={s.subtitle}>
            Redeeming your E-Gift card is easy. You need to have a Krissorbie.com account.<br />
            Login or sign-up below.
          </h2>
        }
        {this.props.loggedIn ?
          <div>
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
                Your total E-Gift card amount:
                <em> { accounting.formatMoney(this.props.creditInfo.totalAmount) }</em>
              </div>
            </div>
            <div className={s.giftcardform_details}>
              Once redeemed, the entire E-gift card amount will be stored in your account's E-gift
              card balance, which doesn't expire. Your e-gift card balance can't be transferred to
              other accounts or used to buy E-gift cards.
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
            <div className={s.giftcardform_details}>
              Once redeemed, the entire E-gift card amount will be stored in your account's E-gift
              card balance, which doesn't expire. Your E-gift card balance can't be transferred to
              other accounts or used to buy E-gift cards.
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
