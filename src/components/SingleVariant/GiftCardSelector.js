import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import cx from 'classnames';

import SingleVariant from './SingleVariant';
import s from './GiftCardSelector.css';

class GiftCardSelector extends SingleVariant {
  constructor(props) {
    super(props);
    this.state = {
      showForm: false,
      selectedVariant: 0
    };
  };

  handleChange = (event) => {
    const variant = parseInt(event.target.value, 10);
    // this.props.action(variant);
    this.setState({
      selectedVariant: variant,
      showForm: variant !== 0
    });
  }

  closeForm = () => {
    this.setState({
      showForm: false,
      selectedVariant: 0
    });
  }

  render() {
    const {variants} = this.props;
    const {selectedVariant, showForm} = this.state;
    return (
      <div className={s.variants}>
        <h3 className={s.vname}>Choose Amount</h3>
        <select className={s.vselect} name="sizes" onChange={this.handleChange} value={selectedVariant}>
          <option value={0} key="">Choose an amount</option>
          { variants.map((item) => (
            <option value={item.id} key={item.id}>
              {item.option_values[0].presentation}
            </option>)
          )}
        </select>
        <div className={cx(s.giftcardform, showForm ? s.visible : '')}>
          <p className={s.giftcardform_title}>
            Your gift card will be sent to the recipient on the same day of purchase.
          </p>
          <div className={s.giftcardform_details}>
            <p className={s.giftcardform_details_title}>Gift card details</p>
            <label htmlFor="recipient_email">Recipient's email</label>
            <input type="email" id="recipient_email" />
            <label htmlFor="sender_name">Your name</label>
            <input type="text" id="sender_name" />
            <label htmlFor="message">Message</label>
            <textarea id="message" rows="5" placeholder="Your message..." />
            <button className={s.giftcardform_details_addtocart}>ADD TO CART</button>
            <button onClick={this.closeForm}>Cancel</button>
          </div>
        </div>
      </div>
    );
  }
}

export default withStyles(s)(GiftCardSelector);
