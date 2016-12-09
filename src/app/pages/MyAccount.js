import React from "react";
import { connect } from "react-redux";
import { toggleLoader } from "../actions/commonActions";
import PageHeader from "../components/page_header/PageHeader";
import AccountForm from "../components/account_form/AccountForm";
import MyAccountInner from "../components/my_account_inner/MyAccountInner";
import EditAccountForm from "../components/edit_account_form/EditAccountForm";
import FormError from "../components/form_error/FormError";
import cx from "classnames";

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
            formErrorText: []
        };
    }

    onLogIn(e){
        e.preventDefault();
        this.setState({
            loggedIn: true
        });

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
                                // <MyAccountInner /> :
                                <EditAccountForm /> :
                                <AccountForm {...this.state}
                                  onLogIn={this.onLogIn.bind(this)}
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