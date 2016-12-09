import React from "react";
import "./cta_info.scss";

class CtaInfo extends React.Component {
    static propTypes = {
        toggleGiftcard: React.PropTypes.func.isRequired
    }

    render() {
        return(
            <div className="cta-info-wrapper">
                Do you have a gift card? &nbsp;
                <a
                  href="#"
                  onClick={this.props.toggleGiftcard}
                  className="show-giftcard"
                  >
                    Click here to enter your code
                </a>
            </div>
        );
    }
}

export default CtaInfo;