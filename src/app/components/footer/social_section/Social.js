import React from "react";
import "./social.scss";

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
                                <i class="icon-facebook"></i>
                        </a>
                    </li>
                    <li>
                        <a 
                            target="_self" 
                            href="https://www.instagram.com/krissorbie/"
                            title="Joins us on Instagram">
                                <span>Instagram</span>
                                <i class="icon-instagram"></i>
                        </a>
                    </li>
                    <li>
                        <a
                            target="_self"
                            href="https://twitter.com/krissorbie?ref_src=twsrc%5Egoogle%7Ctwcamp%5Eserp%7Ctwgr%5Eauthor"
                            title="Join us on Twitter">
                                <span>Twitter</span>
                                <i class="icon-twitter"></i>
                        </a>
                    </li>
                    <li>
                        <a
                            target="_self"
                            href="https://in.pinterest.com/krissorbie/"
                            title="Join us on Pinterest">
                                <span>Pinterest</span>
                                <i class="icon-pinterest"></i>
                        </a>
                    </li>
                    <li>
                        <a
                            target="_self"
                            href="https://www.linkedin.com/in/kris-sorbie-26718b7"
                            title="Join us on Linkedin">
                                <span>Linkedin</span>
                                <i class="icon-linkedin"></i>
                        </a>
                    </li>
                </ul>
            </div>
        );
    }
}

export default Social;