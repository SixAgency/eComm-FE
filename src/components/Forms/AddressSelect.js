import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Forms.css';

class AddressSelect extends React.Component {

  static propTypes = {
    addresses: PropTypes.array.isRequired,
    onSelect: PropTypes.func.isRequired,
    onCreate: PropTypes.func.isRequired,
    address: PropTypes.number.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      address: this.props.address,
    };
  }

  onSelect = (e) => {
    const address = parseInt(e.currentTarget.value, 10);
    this.setState({
      address,
    });
    this.props.onSelect(address);
  };

  getActive = (id) => (this.state.address === id);

  render() {
    return (
      <div>
        { this.props.addresses.map((address, key) => {
          const id = address.id;
          return (
            <div className={s.radiowrapper} key={key}>
              <input
                id={id}
                value={id}
                type="radio"
                name="addresses"
                className={s.radio}
                checked={() => this.getActive(id)}
                onChange={this.onSelect}
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
            onClick={this.props.onCreate}
          />
        </div>
      </div>
    );
  }
}

export default withStyles(s)(AddressSelect);
