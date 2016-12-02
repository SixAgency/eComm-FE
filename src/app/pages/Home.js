import React from "react";
import { connect } from "react-redux";
import { toggleLoader } from "../actions/commonActions";
import heroImg from "../components/sticky_section/home_main_banner.jpg";

import StickySection from "../components/sticky_section/StickySection";

const mapDispatchToProps = ((dispatch) => {
    return {
        toggleLoader: (toggle) => dispatch(toggleLoader(toggle))
    };
});

class Home extends React.Component {
    static propTypes = {
        toggleLoader: React.PropTypes.func.isRequired
    }
    // TODO - Remove the timeout - once we are connected to the API
    componentDidMount() {
        setTimeout(function(){
            this.props.toggleLoader(false);
        }.bind(this), 250);
    }

    componentWillUnmount() {
        this.props.toggleLoader(true);
    }

    render() {
        const sticky_top_copy = {
            title: "Now available the NEW",
            subtitle: "ks mannequin heads",
            subtitle_url: "https://krissorbie.com/ks-mannequin-heads/"
        };
        const sticky_bottom_copy = {
            title: "Shop Now"
        };
        return (
            <div className="homepage">
                <StickySection
                  main_banner={heroImg}
                  main_copy={sticky_top_copy}
                  bottom_copy={sticky_bottom_copy}
                />
                <div className="blank-space" />
            </div>
        );
    }
}

export default connect(null, mapDispatchToProps)(Home);