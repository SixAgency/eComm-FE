import React from "react";
import Social from "./social_section/Social";
import Credits from "./credits/Credits";

class Footer extends React.Component {
    render() {
        return (
            <footer className="footer">
                <Social />
                <Credits />
            </footer>
        );
    }
}

export default Footer;