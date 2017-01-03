import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import cx from 'classnames';
import ShippingInputs from '../../../components/Forms/ShippingInputs';
import s from './../Forms.css';

class ShippingAddress extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      formClass: 'hideForm',
      notes: '',
    };
  }

  onToggleChange = (e) => {
    this.setState({
      formClass: e.target.checked ? 'showForm' : 'hideForm',
    });
  }

  handleNotes = (e) => {
    this.setState({
      notes: e.target.value,
    });
  }

  render() {
    return (
      <div>
        <h1 className={s.title}>Shipping Address</h1>
        <h2 className={s.subtitle}>Special Shipping Requests</h2>
        <form className={cx(s.form)} onSubmit={this.onSubmit}>
          <div className={s.inputwrapper}>
            <label className={s.label} htmlFor="changeaddress">
              &nbsp;Ship to a different address?&nbsp;&nbsp;&nbsp;
              <input id="changeaddress" className={s.checkbox} name="changeaddress" type="checkbox" onChange={this.onToggleChange} />
            </label>
          </div>
          <div className={s[this.state.formClass]}>
            <ShippingInputs />
          </div>
          <div className={s.inputwrapper}>
            <label className={s.label} htmlFor="notes">Order Notes</label>
            <textarea
              id="notes"
              rows="2"
              cols="5"
              className={s.textarea}
              placeholder="Notes about your order, e.g. special notes for delivery."
              onChange={this.handleNotes}
            />
          </div>
          <div className={s.buttonwrapper}>
            <input className={s.submit} type="submit" value="Proceed" />
          </div>
        </form>
      </div>
    );
  }
}

export default withStyles(s)(ShippingAddress);
