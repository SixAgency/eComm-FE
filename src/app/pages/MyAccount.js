import React from "react";
import { connect } from "react-redux";
import { toggleLoader } from "../actions/commonActions";

const mapDispatchToProps = ((dispatch) => {
    return {
        toggleLoader: (toggle) => dispatch(toggleLoader(toggle))
    };
});

class MyAccount extends React.Component {
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
            <h1>Account Page</h1>
        );
    }
}

export default connect(null, mapDispatchToProps)(MyAccount);