import React from "react";
import { connect } from "react-redux";
import Header from "./Header";
import { getHeaderProps } from "../../utils";

const mapStateToProps = ((state) => {
    return { heroHeight: state.heroHeight };
});

class HeaderWrapper extends React.Component {
    static propTypes = {
        heroHeight: React.PropTypes.number.isRequired,
        location: React.PropTypes.object.isRequired
    };

    constructor(props) {
        super(props);
        this.state = {
            stickyCls: null,
            enabled: null
        };
        this.posWas = 0;
    }

    componentWillUnmount = () => {
        window.removeEventListener('scroll', this.headerScroll);
    }

    componentDidMount = () => {
        window.addEventListener('scroll', this.headerScroll);
    }

    headerScroll = (event) => {
        if (window.outerWidth > 960) {
            let stickyCls = null,
                posCur = event.srcElement.body.scrollTop;
            const heroSpacerH = this.props.heroHeight;
            // scroll down
            if ((posCur < this.posWas) && (posCur >= heroSpacerH)) {
                stickyCls = "sticky";
            } else {
                if (posCur < heroSpacerH) {
                    stickyCls = "hide-header";
                }
                if (posCur < 300) {
                    stickyCls = null;
                }
            }

            this.posWas = posCur;
            this.setState({
                stickyCls: stickyCls
            });
        }
    }

    onHoverStart = () => {
        clearTimeout(this.timeOut);
        this.setState({
            enabled: 'enabled'
        });
    }

    onHoverEnd = () => {
        this.timeOut = setTimeout(function(){
            this.setState({
                enabled: null
            });
        }.bind(this), 555);
    }

    render() {
        return (
            <Header
              {...getHeaderProps(this.props.location)}
              onHoverStart={this.onHoverStart}
              onHoverEnd={this.onHoverEnd}
              hoverClass={this.state.enabled}
              stickyClass={this.state.stickyCls}
            />
        );
    }
}

export default connect(mapStateToProps)(HeaderWrapper);