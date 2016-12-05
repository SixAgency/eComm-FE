import React from "react";
import { connect } from "react-redux";
import Header from "./Header";
import { toggleMobileNav } from "../../actions/commonActions";
import { getHeaderProps } from "../../utils";

const mapStateToProps = ((state) => {
    return {
        heroHeight: state.heroHeight,
        navOpened: state.navOpened
    };
});
const mapDispatchToProps = ((dispatch) => {
    return {
        toggleMobileNav: (toggle) => dispatch(toggleMobileNav(toggle))
    };
});

class HeaderWrapper extends React.Component {
    static propTypes = {
        heroHeight: React.PropTypes.number.isRequired,
        location: React.PropTypes.object.isRequired,
        toggleMobileNav: React.PropTypes.func.isRequired,
        navOpened: React.PropTypes.bool.isRequired
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
        if (window.outerWidth > 960 ) {
            clearTimeout(this.timeOut);
            this.setState({
                enabled: 'enabled'
            });
        }
    }

    onHoverEnd = () => {
        if (window.outerWidth > 960 ) {
            this.timeOut = setTimeout(function(){
                this.setState({
                    enabled: null
                });
            }.bind(this), 555);
        }
    }

    mobileNavOpen = () => {
        this.props.toggleMobileNav(true);
    }

    render() {
        return (
            <Header
              {...getHeaderProps(this.props.location)}
              onHoverStart={this.onHoverStart}
              onHoverEnd={this.onHoverEnd}
              hoverClass={this.state.enabled}
              stickyClass={this.state.stickyCls}
              mobileNavOpen={this.mobileNavOpen}
              navOpened={this.props.navOpened}
            />
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(HeaderWrapper);