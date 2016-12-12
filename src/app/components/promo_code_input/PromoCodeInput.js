import React from "react";

class PromoCodeInput extends React.Component{
    render() {
        return (
            <div className="promo-code-container">
                <div className="promo-code-body clearfix">
                    <input name="coupon-code"
                      className="input-text"
                      id="coupon-code"
                      placeholder="Promotional Code"
                    />
                    <input type="submit"
                      className="coupon-button"
                      name="apply-coupon"
                      value="Promotional Code"
                    />
                    <input type="submit"
                      className="coupon-button"
                      id="update-button"
                      name="update-cart"
                      value="Update Cart"
                    />
                </div>
            </div>
        );
    }
}

export default PromoCodeInput;