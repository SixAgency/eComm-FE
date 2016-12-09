import React from "react";
import { connect } from "react-redux";
import { toggleLoader } from "../actions/commonActions";
import PageHeader from "../components/page_header/PageHeader";
import CartCta from "../components/cart_cta/CartCta";
import ProductsTable from "../components/products_table/ProductsTable";
import PromoCodeInput from "../components/promo_code_input/PromoCodeInput";
import CartForm from "../components/cart_form/CartForm";

const mapDispatchToProps = ((dispatch) => {
    return {
        toggleLoader: (toggle) => dispatch(toggleLoader(toggle))
    };
});

class Cart extends React.Component {
    static propTypes = {
        toggleLoader: React.PropTypes.func.isRequired
    }

    constructor(props){
        super(props);
        this.state = {
            loggedIn: true,
            showCouponFields: false,
            className: 'hide'
        };
    }

    // TODO - Remove the timeout - once we are connected to the API
    componentDidMount() {
        setTimeout(function(){
            this.props.toggleLoader(false);
        }.bind(this), 1000);
    }

    componentWillUnmount() {
        this.props.toggleLoader(true);
    }

    // doesn't work on first click
    handleGiftcard = (e) => {
        e.preventDefault();
        this.setState({
            showCouponFields: !this.state.showCouponFields,
            className: this.state.showCouponFields ? 'show' : 'hide'
        });
    }


    render() {
        return (
            <div className="cart-page">
                <PageHeader {...this.state} />
                <CartCta toggleGiftcard={this.handleGiftcard} />
                <div className="cart-content-wrapper">
                    <article className="cart-body">
                        <div>
                            <form
                              className={'giftcard-form '
                                + this.state.className}
                              method="post">
                                <p className="giftcard-row">
                                    <input type="text"
                                      name="coupon-code"
                                      className="coupon-input"
                                      placeholder="Gift card code"
                                      id="giftcard-code"
                                    />
                                    <input type="submit"
                                      className="coupon-submit"
                                      value="Apply gift card"
                                    />
                                </p>
                            </form>
                            <h1 className="cart-title">
                              Your Cart
                            </h1>
                            <h3 className="cart-subtitle">
                              number of products in your cart (dynamic)
                            </h3>
                            <ProductsTable />
                            <PromoCodeInput />
                            <CartForm />
                        </div>
                    </article>
                </div>
            </div>
        );
    }
}

export default connect(null, mapDispatchToProps)(Cart);