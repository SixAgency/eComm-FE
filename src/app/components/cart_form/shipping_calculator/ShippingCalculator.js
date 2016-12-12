import React from "react";

class ShippingCalculator extends React.Component {
    static propTypes = {
        visibility: React.PropTypes.string.isRequired
    }
    render() {
        return (
            <section
              className={'calculator-form ' + this.props.visibility}
            >
                <p className="calculator-row">
                    <select className="calc-shipping-country"
                      id="calc-shipping-country"
                      rel="calc_shipping_state"
                    >
                        <option value className="shipping-options">
                            Select a country...
                        </option>
                        <option value="US" className="shipping-options">
                            United States (US)
                        </option>
                    </select>
                </p>
                <p className="calculator-row">
                    <input type="text"
                      className="input-text"
                      placeholder="State / county"
                      name="calc_shipping_state"
                      id="calc_shipping_state"
                    />
                </p>
                <p className="calculator-row">
                    <input type="text"
                      className="input-text"
                      placeholder="Postcode / Zip"
                      name="calc_shipping_postcode"
                      id="calc_shipping_postcode"
                    />
                </p>
                <p className="submit-container">
                    <button type="submit"
                      name="calc_shipping"
                      value="1"
                      className="calculator-button"
                    >
                        Update Totals
                    </button>
                </p>
            </section>
        );
    }
}

export default ShippingCalculator;