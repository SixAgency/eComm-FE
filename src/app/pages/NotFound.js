import React from "react";
import { connect } from "react-redux";
import { toggleLoader } from "../actions/commonActions";
import { notFoundText } from "../site_const";
import Title from "../components/text/Title";
import Subtitle from "../components/text/Subtitle";

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
                                <Title
                                  classname={notFoundText.titleClass}
                                  text={notFoundText.title}
                                />
                                <div>
                                    <Subtitle
                                      classname={notFoundText.subtitleClass}
                                      text={notFoundText.subtitle}
                                    />
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