import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import cx from 'classnames';
import s from './Forms.css';

class AddressSelect extends React.Component {

  static propTypes = {
    addresses: PropTypes.array.isRequired,
    onSelect: PropTypes.func.isRequired,
    addAddress: PropTypes.func.isRequired,
    activeID: PropTypes.number.isRequired,
  }

  constructor(props) {
    super(props);
    this.state = {
      checkedID: this.props.activeID,
    };
  }

  onSelect = (address) => {
    this.setState({ checkedID: address.id });
    this.props.onSelect(address);
  }

  getActive = (id) => {
    if (this.state.checkedID === id) {
      return true;
    }
    return false;
  }

  render() {
    if (!this.props.addresses) {
      return null;
    }
    return (
      <div>
        { this.props.addresses.map((address) => {
          const id = address.id;
          return (
            <div className={s.radiowrapper}>
              <input
                id={id}
                value={id}
                type="radio"
                name="addresses"
                className={s.radio}
                checked={this.getActive(id)}
                onChange={() => this.onSelect(address)}
              />
              <label htmlFor={address.id} className={s.labelradio}>
                {address.firstname} {address.lastname}<br />
                {address.address1} {address.address2}<br />
                {address.city}, {address.state_id}, {address.zipcode}<br />
                {address.phone}
              </label>
            </div>
          );
        })}
        <div className={s.buttonwrapper}>
          <input
            className={s.submitadd}
            type="button"
            value="Add another address"
            onClick={this.props.addAddress}
          />
        </div>
      </div>
    );
  }

}

export default withStyles(s)(AddressSelect);
