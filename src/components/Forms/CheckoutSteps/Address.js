import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import cx from 'classnames';
import s from './../Forms.css';
import AddressSelect from '../AddressSelect';

class Address extends React.Component {
  static propTypes = {
    loggedIn: PropTypes.bool,
    formTitle: PropTypes.string,
    formSubtitle: PropTypes.string,
    notes: PropTypes.bool,
    address: PropTypes.object.isRequired,
    addresses: PropTypes.array.isRequired,
    nextTab: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      selectedAddress: this.props.address,
    };
  }

  onSubmit = (e) => {
    e.preventDefault();
    this.props.nextTab();
  };

  onRadioUpdate = (address) => {
    this.setState({ selectedAddress: address });
  };

  addAddress = () => {
    console.log('add address');
  };

  render() {
    if (!this.props.addresses) {
      return null;
    }
    return (
      <div className={s.cformcontent}>
        <h1 className={s.title}>{this.props.formTitle}</h1>
        <h2 className={s.subtitle}>{this.props.formSubtitle}</h2>
        <form className={cx(s.form, s.addresses)} onSubmit={this.onSubmit}>
          <AddressSelect
            addresses={this.props.addresses}
            onSelect={this.onRadioUpdate}
            addAddress={this.addAddress}
            activeID={this.props.address.id}
          />
          { this.props.notes &&
            <div className={s.textwrapper}>
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
          }
          <div className={s.buttonwrapper}>
            <input className={s.submit} type="submit" value="Proceed" />
          </div>
        </form>
      </div>
    );
  }
}

export default withStyles(s)(Address);
