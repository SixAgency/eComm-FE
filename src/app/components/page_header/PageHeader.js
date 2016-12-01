import React from "react";
import { Link } from "react-router";
import "./page-header.scss";


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
        var defaultLinks = [
            {
                id: 1,
                name: 'Login / Register',
                link: '#',
                title: 'Login / Register'
            }
        ];
        var loggedInLinks = [
            {
                id: 1,
                name: 'My Account',
                link: '/my-account/',
                title: 'My Account'
            },
            {
                id: 2,
                name: 'Edit Account',
                link: '/my-account/edit-account',
                title: 'Edit Account'
            },
            {
                id: 3,
                name: 'Logout',
                link: '#',
                title: 'Logout'
            }
        ];
        if ( this.props.loggedIn ){
            return [...loggedInLinks];
        }
        return [...defaultLinks];
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