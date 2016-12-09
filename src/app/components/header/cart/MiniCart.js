import React from "react";
import { Link } from "react-router";
import "./mini_cart.scss";

class MiniCart extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            cartStyle: { 'display': 'none' }
        };
    }

    cartHover = (event) => {

        let cartStyle = { 'display': 'none' };
        if (event.type === "mouseenter") {
            cartStyle = { 'display': 'block' };
        }
        this.setState({
            cartStyle: cartStyle
        });
    }

    render() {
        return (
            <div className="mini-cart-holder">
                <div
                  className="mini-cart"
                  onMouseEnter={this.cartHover}
                  onMouseLeave={this.cartHover}
                >
                    <Link class="cart-contents" to="/cart">
                        <span>2</span>
                    </Link>
                    <div className="shopping-cart" style={this.state.cartStyle}>
                        <div className="cart-content">
                            <p className="cart-title">2 items in your cart</p>
                            <div>
                                <ul className="cart-list">
                                    <li>
                                        <Link className="inner-link">
                                            <img />
                                            <span
                                              className="p-name"
                                            >
                                                ks Color Head
                                            </span>
                                            <span
                                              className="p-price"
                                            >
                                                Price:
                                                <span
                                                  className="amount"
                                                >
                                                    $79.00
                                                </span>
                                            </span>
                                            <span
                                              className="p-quantity"
                                            >
                                                Quantity: 2
                                            </span>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link className="inner-link">
                                            <img />
                                            <span
                                              className="p-name"
                                            >
                                                ks Color Head
                                            </span>
                                            <span
                                              className="p-price"
                                            >
                                                Price:
                                                <span
                                                  className="amount"
                                                >
                                                    $79.00
                                                </span>
                                            </span>
                                            <span
                                              className="p-quantity"
                                            >
                                                Quantity: 2
                                            </span>
                                        </Link>
                                    </li>
                                </ul>
                                <p
                                  className="total">
                                    <strong>Subtotal:</strong>
                                    <span className="amount">$176.00</span>
                                </p>
                                <p className="buttons">
                                    <Link
                                      to="/cart"
                                      className="button view-button"
                                    >
                                        View Cart
                                    </Link>
                                    <Link
                                      to="/checkout"
                                      className="button checkout-button"
                                    >
                                        Checkout
                                    </Link>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                <span className="cart-divider">|</span>
            </div>
        );
    }
}

export default MiniCart;