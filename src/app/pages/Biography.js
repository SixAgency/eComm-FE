import React from "react";
import { connect } from "react-redux";
import { toggleLoader } from "../actions/commonActions";
import Testimonial from "../components/testimonial/Testimonial";
import StickySection from "../components/sticky_section/StickySection";
import heroImg from "../components/sticky_section/biography_main_banner.jpg";

const mapDispatchToProps = ((dispatch) => {
    return {
        toggleLoader: (toggle) => dispatch(toggleLoader(toggle))
    };
});

class Biography extends React.Component {
    static propTypes = {
        toggleLoader: React.PropTypes.func.isRequired
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

    render() {
        const sticky_bottom_copy = {
            title: "About Kris Sorbie",
            subtitle: "AWARD WINNING ARTISTIC DIRECTOR"
        };
        return (
            <div className="biography-page">
                <StickySection 
                  main_banner={heroImg}
                  bottom_copy={sticky_bottom_copy} 
                />
                <Testimonial />
            </div>
        );
    }
}

export default connect(null, mapDispatchToProps)(Biography);