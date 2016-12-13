import React from "react";
import { Link } from "react-router";
import { pageHeaderLinks } from "../../site_const";

class PageHeader extends React.Component {
    static propTypes = {
        loggedIn: React.PropTypes.bool.isRequired
    }

    constructor(props){
        super(props);
        this.state = {
            location: 'login-page'
        };
    }

    setLinks = () => {
        if ( this.props.loggedIn ){
            return [...pageHeaderLinks.loggedInLinks];
        }
        return [...pageHeaderLinks.defaultLinks];
    }

    render(){
        const myLinks = this.setLinks();
        return(
            <div className="header-wrapper">
                { myLinks.map( (item) => {
                    return (
                        <Link
                          className="inner-link"
                          key={item.id}
                          to={item.link}
                          title={item.title}
                        >
                            {item.name}
                        </Link>
                    );
                })}
                {/* TODO - Update this with page path */}
                <nav className="header-breadcrumb">
                    <a href="/"
                      className="breadcrumb-link">
                        SHOP
                    </a>
                    <span> / MY ACCOUNT</span>
                </nav>
            </div>
        );
    }
}

export default PageHeader;