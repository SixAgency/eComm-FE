import React, { Component, PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './ShippingCalculator.css';
import { STATES } from '../../../constants/AppConsts';

class ShippingCalculator extends Component {
  static propTypes = {
    calculateShipping: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      previewState: '',
      previewZip: ''
    };
  }

  onCalculateShipping = () => {
    this.props.calculateShipping({
      shipments_attributes: {
        zipcode: this.state.previewZip,
        state_id: this.state.previewState,
        country_id: '232'
      }
    });
  };

  updatePreviewState = (e) => {
    this.setState({
      previewState: e.target.value
    });
  };

  updatePreviewZip = (e) => {
    this.setState({
      previewZip: e.target.value
    });
  };


  render() {
    const { previewState, previewZip } = this.state;
    return (
      <section
        className={s.calcform}
      >
        <p className={s.calcrow}>United States (US)</p>
        <p className={s.calcrow}>
          <select
            value={previewState}
            className={s.shipstate}
            onChange={this.updatePreviewState}
          >
            <option value="">Select an option...</option>
            {STATES.map((state) => (
              <option value={state.id} key={state.id}>
                {state.name}
              </option>
              )
            )}
          </select>
        </p>
        <p className={s.calcrow}>
          <input
            type="text"
            className={s.inputtext}
            placeholder="Postcode / Zip"
            value={previewZip}
            onChange={this.updatePreviewZip}
          />
        </p>
        <p className={s.submitcontainer}>
          <button
            className={s.calcbtn}
            onClick={this.onCalculateShipping}
          >
            Update Totals
          </button>
        </p>
      </section>
    );
  }
}

export default withStyles(s)(ShippingCalculator);
