import "./mobile_nav.scss";
import React from "react";
import { Link } from "react-router";
import { toggleMobileNav } from "../../actions/commonActions";
import { getHeaderProps } from "../../utils";
import { socialMedia } from "../../site_const";
import { connect } from "react-redux";
import cx from "classnames";

const mapStateToProps = ((state) => {
    return { navOpened: state.navOpened };
});

const mapDispatchToProps = ((dispatch) => {
    return {
        toggleMobileNav: (toggle) => dispatch(toggleMobileNav(toggle))
    };
});

class MobileNav extends React.Component {
    static propTypes = {
        location: React.PropTypes.object.isRequired,
        navOpened: React.PropTypes.bool.isRequired,
        toggleMobileNav: React.PropTypes.func.isRequired
    }

    mobileNavClose = () => {
        this.props.toggleMobileNav(false);
    }

    render() {
        const headerProps = getHeaderProps(this.props.location);
        return (
            <div className={cx("mobile-nav", {"opened": this.props.navOpened})}>
                <ul>
                    {headerProps.navItems.map((item) => {
                        return (
                            <li
                              key={item.id}
                              className={cx({'active': item.isActive})}
                            >
                                <Link to={item.slug}>{item.title}</Link>
                            </li>
                        );
                    })}
                </ul>
                <span className="c-close-btn" onClick={this.mobileNavClose} >
                    <span className="hr" />
                    <span className="vr" />
                </span>
                <div className="social-area-nav">
                    <ul>
                        {socialMedia.map((item) => {
                            return (
                                <li key={item.id}>
                                    <a
                                      target="_self"
                                      href={item.url}
                                      title={item.title}
                                      className={cx(`shr-btn-${item.c_name}`)}
                                    >
                                        <i
                                          className={cx(`icon-${item.c_name}`)}
                                        />
                                    </a>
                                </li>
                            );
                        })}
                    </ul>
                </div>
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MobileNav);