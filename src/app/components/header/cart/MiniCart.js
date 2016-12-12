import React from "react";
import { Link } from "react-router";
import { connect } from "react-redux";
import { getCart } from "../../../actions/commonActions";

const mapStateToProps = ((state) => {
    return {
        cart: state.cart
    };
});
const mapDispatchToProps = ((dispatch) => {
    return {
        getCart: () => dispatch(getCart())
    };
});

class MiniCart extends React.Component {
    static propTypes = {
        cart: React.PropTypes.object,
        getCart: React.PropTypes.func.isRequired
    };

    constructor(props) {
        super(props);
        this.state = {
            cartStyle: { 'display': 'none' }
        };
    }

    componentWillMount = () => {
        this.props.getCart();
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
        const cart = this.props.cart;
        if (cart == null) {
            return null;
        }
        return (
            <div className="mini-cart-holder">
                <div
                  className="mini-cart"
                  onMouseEnter={this.cartHover}
                  onMouseLeave={this.cartHover}
                >
                    <Link class="cart-contents" to="/cart">
                        <span>{cart.total_quantity}</span>
                    </Link>
                    <div className="shopping-cart" style={this.state.cartStyle}>
                        <div className="cart-content">
                            <p className="cart-title">
                                {cart.total_quantity} items in your cart
                            </p>
                            <div>
                                <ul className="cart-list">
                                    { cart.line_items.map( (item) => {
                                        return(
                                            <li key={item.id}>
                                                <Link className="inner-link">
                                                    <img
                                                      src={item.
                                                        variant.
                                                        images[0].
                                                        small_url}
                                                    />
                                                    <span
                                                      className="p-name"
                                                    >
                                                        {item.variant.name}
                                                    </span>
                                                    <span
                                                      className="p-price"
                                                    >
                                                        Price:
                                                        <span
                                                          className="amount"
                                                        >
                                                            {item.
                                                                display_amount}
                                                        </span>
                                                    </span>
                                                    <span
                                                      className="p-quantity"
                                                    >
                                                        Quantity:
                                                        {item.quantity}
                                                    </span>
                                                </Link>
                                            </li>
                                        );
                                    })}
                                </ul>
                                <p
                                  className="total">
                                    <strong>Subtotal:</strong>
                                    <span className="amount">
                                        {cart.display_item_total}
                                    </span>
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

export default connect(mapStateToProps, mapDispatchToProps)(MiniCart);