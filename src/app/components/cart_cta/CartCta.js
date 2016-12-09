import React from "react";
import CtaInfo from "./cta_info/CtaInfo";
import CtaMessage from "./cta_message/CtaMessage";

class CartCta extends React.Component {

    static propTypes = {
        toggleGiftcard: React.PropTypes.func.isRequired
    }

    render() {
        return(
            <div>
                <CtaMessage />
                <CtaInfo
                  toggleGiftcard={this.props.toggleGiftcard.bind(this)}
                />
            </div>
        );
    }
}

export default CartCta;