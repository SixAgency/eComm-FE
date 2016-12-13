import React from "react";
import Text from "../text/Text";
import { testimonialText } from "../../site_const";

class Testimonial extends React.Component {
    render() {
        const pProps = {
            classname: 'text',
            text: testimonialText
        };
        return(
            <div className="testimonial-container">
                <div className="testimonial-wrapper">
                    <Text {...pProps} />
                </div>
            </div>
        );
    }
}

export default Testimonial;