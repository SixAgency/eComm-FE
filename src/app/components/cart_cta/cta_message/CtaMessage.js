import React from "react";

class CtaMessage extends React.Component {
    render() {
        return(
            <div className="cta-message-wrapper">
                <a href="/" className="button-forward">
                    Continue Shopping
                </a>
                <span>
                    &nbsp;
                    “prod name”
                    has been added to your cart.
                </span>

            </div>
        );
    }
}

export default CtaMessage;