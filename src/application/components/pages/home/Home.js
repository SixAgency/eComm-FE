import React from "react";
import { connect } from "react-redux";
import { toggleLoader } from "../../../actions/generalActions";

const mapDispatchToProps = ((dispatch) => {
    return {
        toggleLoader: (toggle) => dispatch(toggleLoader(toggle))
    };
});

class Home extends React.Component {
    static propTypes = {
        toggleLoader: React.PropTypes.func.isRequired
    }

    componentDidMount() {
        this.props.toggleLoader(false);
    }

    componentWillUnmount() {
        this.props.toggleLoader(true);
    }

    render() {
        return (
            <h1>HOME PAGE</h1>
        );
    }
}

export default connect(null, mapDispatchToProps)(Home);