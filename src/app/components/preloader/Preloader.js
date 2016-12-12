import React from "react";
import { connect } from "react-redux";

const mapStateToProps = ((state) => {
    return { loading: state.loading };
});

class Preloader extends React.Component {
    static propTypes = {
        loading: React.PropTypes.bool.isRequired
    }

    render() {
        const { loading } = this.props;
        if (loading) {
            return (
                <div id="preloader">
                    <div className="preloader-image" />
                    <div id="spinner" />
                </div>
            );
        }
        return null;
    }
}

export default connect(mapStateToProps)(Preloader);