import React from "react";
import { connect } from "react-redux";
import { toggleLoader } from "../actions/commonActions";
import Testimonial from "../components/testimonial/Testimonial"

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
        return (
            <div className="biography-page">
                <h1>Biography</h1>
                <Testimonial />
            </div>
        );
    }
}

export default connect(null, mapDispatchToProps)(Biography);