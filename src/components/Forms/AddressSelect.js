import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Forms.css';

class AddressSelect extends React.Component {

  static propTypes = {
    addresses: PropTypes.array.isRequired,
    onSelect: PropTypes.func.isRequired,
    onCreate: PropTypes.func.isRequired,
    addressId: PropTypes.number.isRequired
  };

  getActive = (id) => (this.props.addressId === id);

  render() {
    return (
      <div>
        { this.props.addresses.map((value, key) => (
          <div className={s.radiowrapper} key={key}>
            <input
              id={value.id}
              value={value.id}
              type="radio"
              name="addresses"
              className={s.radio}
              checked={this.getActive(value.id)}
              onChange={this.props.onSelect}
            />
            <label htmlFor={value.id} className={s.labelradio}>
              {value.firstname} {value.lastname}<br />
              {value.address1} {value.address2}<br />
              {value.city}, {value.state_id}, {value.zipcode}<br />
              {value.phone}
            </label>
          </div>
        ))}
        <div className={s.buttonwrapper}>
          <input
            className={s.submitadd}
            type="button"
            value="Add another address"
            onClick={this.props.onCreate}
          />
        </div>
      </div>
    );
  }
}

export default withStyles(s)(AddressSelect);
