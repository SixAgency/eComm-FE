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
            Enter your E-Gift card number from the email you received into the box below:
          </h2>
          :
          <h2 className={s.subtitle}>
            To redeem your E-Gift card and have the amount credited to your Krissorbie account
            just log in or sign up below:
          </h2>
        }
        {this.props.loggedIn ?
          <div>
            <div className={cx(s.form, s.giftcardform)}>
              <input
                type="text"
                placeholder="Enter E-Gift card code"
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
              E-Gift card amounts are stored in your account for use at checkout.<br />
              E-Gift cards do not expire, are non-transferable, are not, unless required by law,
              redeemable for cash and may not be used to purchase other E-Gift cards.
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
              E-Gift cards do not expire, are non-transferable, are not, unless required by law,
              redeemable for cash and may not be used to purchase other E-Gift cards.
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
