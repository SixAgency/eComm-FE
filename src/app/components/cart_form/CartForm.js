import React from "react";
import ShippingCalculator from "./shipping_calculator/ShippingCalculator";

class CartForm extends React.Component {

    static propTypes = {
        cart: React.PropTypes.object.isRequired
    }

    constructor(props){
        super(props);
        this.state = {
            showCalculator: false,
            className: 'hide'
        };
    }

     // doesn't work on first click
    toggleCalculator = (e) => {
        e.preventDefault();
        this.setState({
            showCalculator: !this.state.showCalculator,
            className: this.state.showCalculator ? 'show' : 'hide'
        });
    }

    render() {
        const cart = this.props.cart;
        return (
            <div className="cart-form-wrapper">
                <div className="cart-form-contents">
                    <div className="cart-totals">
                        <h2 className="cart-title">
                            Cart Totals
                        </h2>
                        <h3 className="cart-subtitles">
                            You are ordering {cart.total_quantity} items
                        </h3>
                        <table className="cart-totals-contents">
                            <tbody>
                                <tr className="cart-subtotal">
                                    <th className="table-heads">Subtotal</th>
                                    <td className="ammount data">
                                        ${cart.total}
                                    </td>
                                </tr>
                                <tr className="cart-subtotal">
                                    <th className="table-heads" />
                                    <td className="ammount data">
                                        <small>
                                            Note: Products may ship from various
                                            locations
                                        </small>
                                    </td>
                                </tr>
                                <tr className="shipping">
                                    <th className="table-heads">Shipping</th>
                                    <td className="data">
                                        <p>
                                            Shipping costs will be calculated
                                            once you have provided your address.
                                        </p>
                                        <h2 className="calc-title">
                                            <a href="#"
                                              className="shipping-calc-btn"
                                              onClick={this.toggleCalculator}
                                            >
                                                Calculate Shipping
                                            </a>
                                        </h2>
                                        <h3 className="cart-subtitles">
                                            Based on your location
                                        </h3>
                                        <ShippingCalculator
                                          visibility={this.state.className}
                                        />
                                    </td>
                                </tr>
                                <tr className="order-total">
                                    <th className="table-heads">Total</th>
                                    <td className="total-price data">
                                        <strong>
                                            <span className="amount">
                                                ${cart.total}
                                            </span>
                                        </strong>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div className="paypal-container">
                        &nbsp;
                    </div>
                    <p className="go-to-checkout-container">
                        <input
                          type="submit"
                          className="checkout-button"
                          name="proceed"
                          value="Proceed to Checkout"
                        />
                    </p>
                </div>
            </div>
        );
    }
}

export default CartForm;