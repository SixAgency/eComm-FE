import React from "react";
import { connect } from "react-redux";
import { toggleLoader } from "../actions/commonActions";
import PageHeader from "../components/page_header/PageHeader";
import AccountForm from "../components/account_form/AccountForm";
import MyAccountInner from "../components/my_account_inner/MyAccountInner";
import EditAccountForm from "../components/edit_account_form/EditAccountForm";
import FormError from "../components/form_error/FormError";
import cx from "classnames";
import axios from "axios";

const mapDispatchToProps = ((dispatch) => {
    return {
        toggleLoader: (toggle) => dispatch(toggleLoader(toggle))
    };
});

class MyAccount extends React.Component {
    static propTypes = {
        toggleLoader: React.PropTypes.func.isRequired
    }

    constructor(props){
        super(props);
        this.state = {
            selected: 'login',
            loggedIn: false,
            className: 'contents',
            formHasErrors: false,
            formErrorText: [],
            username: '',
            password: ''
        };
    }

    // handleErrors = (err) => {
    //     // error handlig here
    // }

    handleUsername = (e) => {
        this.setState({username: e.target.value});
    }

    handlePassword = (e) => {
        this.setState({password: e.target.value});
    }

    handleLogin = (e) => {
        e.preventDefault();
        const username = 'username';
        const password = 'password';
        if( (this.state.username === username) &&
            (this.state.password === password) ){
            this.setState({
                loggedIn: true
            });
            // window.sessionStorage.setItem('username', username);
        } else {
            this.setState({
                loggedIn: false
            });
        }
        // const data = {
        //     spree_user: {
        //         email: this.state.username,
        //         password: this.state.password,
        //         remember_me: "0"
        //     }
        // };
        //  let config = {
        //     method: 'post',
        //     baseURL: 'http://staging.ecomm.com',
        //     url: '/login',
        //     data: data,
        //     headers: {'Content-Type': 'application/json'}
        // };
        // axios({config}).then( (resp) => {
        //     console.log(resp);
        // }).catch( (err) => {
        //     console.log(err);
        // });

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

    handleChange(handledEvent){
        clearTimeout(this.timeOut);
        this.setState({
            selected: handledEvent.target.textContent,
            className: "hide"
        });
        this.timeOut = setTimeout(() => {
            this.setState({
                className: "contents show"
            });
        }, 300);
    }

    render() {
        return (
            <div className="account-page">
                <PageHeader {...this.state} />
                { this.state.formHasErrors ?
                    <FormError {...this.state} /> :
                    ''
                }
                <section className="content-wrapper">
                    <div className="account-content">
                        { this.state.loggedIn ? '' :
                        <ul className="titles">
                            <li
                              onClick={this.handleChange.bind(this)}
                              className={this.state.selected === 'login' ?
                              'opened' :
                              ''}
                            >
                              login
                            </li>
                            <li
                              onClick={this.handleChange.bind(this)}
                              className={this.state.selected === 'register'
                              ?
                              'opened' :
                              ''}
                            >
                              register
                            </li>
                        </ul> }
                        <div className={cx(this.state.className)}
                          ref="content">
                            { this.state.loggedIn ?
                                <MyAccountInner /> :
                                // <EditAccountForm /> :
                                <AccountForm {...this.state}
                                  handleLogin={this.handleLogin.bind(this)}
                                  handleUsername={
                                        this.handleUsername.bind(this)
                                    }
                                  handlePassword={
                                        this.handlePassword.bind(this)
                                    }
                                />
                            }
                        </div>
                    </div>
                </section>
            </div>
        );
    }
}

export default connect(null, mapDispatchToProps)(MyAccount);