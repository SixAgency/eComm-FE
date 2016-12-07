import React from "react";
import { connect } from "react-redux";
import { toggleLoader } from "../actions/commonActions";

const mapDispatchToProps = ((dispatch) => {
    return {
        toggleLoader: (toggle) => dispatch(toggleLoader(toggle))
    };
});

class NotFound extends React.Component {
    static propTypes = {
        toggleLoader: React.PropTypes.func.isRequired
    }

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
            <section className="content-container">
                <section className="content-wrapper">
                    <div className="content">
                        <article>
                            <div className="content-body">
                                <h2 className="error-title">
                                    Uh oh! (404 Error)
                                </h2>
                                <div>
                                    <h4 className="error-content">
                                        We are really sorry but the page you
                                        requested is missing :(
                                    </h4>
                                </div>
                                {/* TODO: Update link */}
                                <a href="#" className="go-back-btn" >
                                    ← Go Back
                                </a>
                            </div>
                        </article>
                    </div>
                </section>
            </section>
        );
    }
}

export default connect(null, mapDispatchToProps)(NotFound);