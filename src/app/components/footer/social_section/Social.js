import React from "react";

class Social extends React.Component {
    render() {
        return(
            <div className="social-area">
                <ul>
                    <li>
                        <a
                          target="_self"
                          href="https://www.facebook.com/krissorbieLLC/"
                          title="Join us on Facebook">
                            <span>Facebook</span>
                            <i className="icon-facebook" />
                        </a>
                    </li>
                    <li>
                        <a
                          target="_self"
                          href="https://www.instagram.com/krissorbie/"
                          title="Joins us on Instagram">
                            <span>Instagram</span>
                            <i className="icon-instagram" />
                        </a>
                    </li>
                    <li>
                        <a
                          target="_self"
                          href="https://twitter.com/krissorbie"
                          title="Join us on Twitter">
                            <span>Twitter</span>
                            <i className="icon-twitter" />
                        </a>
                    </li>
                    <li>
                        <a
                          target="_self"
                          href="https://in.pinterest.com/krissorbie/"
                          title="Join us on Pinterest">
                            <span>Pinterest</span>
                            <i className="icon-pinterest" />
                        </a>
                    </li>
                    <li>
                        <a
                          target="_self"
                          href="https://www.linkedin.com/in/kris-sorbie-26718b7"
                          title="Join us on Linkedin">
                            <span>Linkedin</span>
                            <i className="icon-linkedin" />
                        </a>
                    </li>
                </ul>
            </div>
        );
    }
}

export default Social;