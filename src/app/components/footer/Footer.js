import React from "react";
import Social from "./social_section/Social";
import Text from "../text/Text";
import { footerCredits } from "../../site_const";


class Footer extends React.Component {
    render() {
        const pProps = {
            classname: 'text',
            text: footerCredits
        };
        return (
            <footer className="footer">
                <Social />
                <div className="credits">
                    <Text {...pProps} />
                </div>
            </footer>
        );
    }
}

export default Footer;